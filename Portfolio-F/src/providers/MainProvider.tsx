
"use client";

import Loader from "@/components/ui/animation/Loader";
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
      <Loader>{children}</Loader>
      <Toaster position="top-right" />
    </Provider>
  );
};