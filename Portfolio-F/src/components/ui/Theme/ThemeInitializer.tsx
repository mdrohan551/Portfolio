'use client'
import { useEffect } from 'react';
import { initTheme } from '@/store/features/Theme/Theme';
import { useAppDispatch } from '@/hook/CustomHook';
export default function ThemeInitializer() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    dispatch(initTheme(isDark ? 'dark' : 'light'));
  }, [dispatch]);

  return null;
}