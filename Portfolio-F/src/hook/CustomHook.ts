// src/app/hooks.ts
import { AppDispatch, RootState } from '@/store/app/store';
import { useDispatch, useSelector } from 'react-redux';


/**
 * @file hooks.ts
 * @description
 * Custom typed hooks for Redux. These hooks are necessary to provide
 * correct type inference throughout the application when accessing the store.
 * * We use 'useAppDispatch' instead of 'useDispatch' and 'useAppSelector' 
 * instead of 'useSelector' in all components to prevent the need for
 * repeating type definitions (RootState and AppDispatch) every time.
 */

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();