// src/constants/Data/categoryIcons.ts
import { FiServer, FiPackage, FiShoppingBag, FiPenTool } from "react-icons/fi";
import type { JSX } from "react";

export const categoryIcons: Record<string, JSX.Element> = {
    design: <FiPenTool className="inline-block mr-2 text-lg transform rotate-270" />,
    api: <FiServer className="inline-block mr-2 text-lg" />,
    inventory: <FiPackage className="inline-block mr-2 text-lg" />,
    ecommerce: <FiShoppingBag className="inline-block mr-2 text-lg" />,
};
