import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from '../features/authSlice';
import themeReducer from '@/store/features/Theme/Theme'; // ✅ add this

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        theme: themeReducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;