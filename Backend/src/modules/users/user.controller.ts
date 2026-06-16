import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../config/db";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { token } from "morgan";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;

    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const result = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    const { password, ...userWithoutPassword } = result;

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Error("Invalid password");
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = jwt.sign(jwtPayload, env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: "admin",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      token: accessToken,
      data: userData,
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // User is already attached to req by authMiddleware
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  registerUser,
  loginUser,
  getProfile,
};
