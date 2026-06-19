import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// --- Interfaces ---

interface AdminUser {
  id: string;
  name: string;
  email?: string;
  role: string;
}

interface AdminDataPayload {
  token: string;
  user: AdminUser;
}

export interface AuthState {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
}

// --- Helper Functions ---

/**
 * Loads admin data from localStorage safely.
 * Returns initial state if running on server or data is incomplete.
 */
const loadAdminFromLocalStorage = (): AuthState => {
  // Server-side rendering check
  if (typeof window === "undefined") {
    return {
      token: null,
      user: null,
      isAuthenticated: false,
    };
  }

  try {
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    // Validate essential fields
    if (!id || !name || !token || !role) {
      return {
        token: null,
        user: null,
        isAuthenticated: false,
      };
    }

    return {
      token: token,
      user: {
        id,
        name,
        email: email || undefined,
        role,
      },
      isAuthenticated: true,
    };
  } catch (error) {
    console.error("Error loading auth from localStorage:", error);
    return {
      token: null,
      user: null,
      isAuthenticated: false,
    };
  }
};

// --- Initial State ---

const initialState: AuthState = loadAdminFromLocalStorage();

// --- Slice Definition ---

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets admin credentials and persists them to localStorage
     */
    setAdmin: (state, action: PayloadAction<AdminDataPayload>) => {
      const { token, user } = action.payload;

      // Update state
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      // Persist to localStorage (Client-side only check is implicit in reducer usage usually, 
      // but good to be safe if called during SSR hydration issues, though Redux usually runs on client for actions)
      if (typeof window !== "undefined") {
        localStorage.setItem("id", user.id);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email || "");
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
      }
    },

    /**
     * Clears admin credentials and removes from localStorage
     */
    logout: (state) => {
      // Reset state
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    },
  },
});

// --- Exports ---

export const { setAdmin, logout } = authSlice.actions;

// Selectors (Following the 2nd code's pattern for easy access)
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role ?? null;

export default authSlice.reducer;