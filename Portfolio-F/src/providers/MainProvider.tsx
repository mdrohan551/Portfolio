
"use client";

import Loader from "@/components/ui/animation/Loader";
import ThemeColorMeta from "@/components/ui/Theme/ThemeColorMeta";
import ThemeInitializer from "@/components/ui/Theme/ThemeInitializer";
import { store } from "@/store/app/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

interface MainProviderProps {
  children: React.ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <Provider store={store}>
      <ThemeInitializer />
      <ThemeColorMeta />
      <Loader>{children}</Loader>
      <Toaster position="top-right" />
    </Provider>
  );
};