'use client';

import { 
    selectAuthToken, 
    selectCurrentUser, 
    selectIsAuthenticated, 
    selectUserRole, 
    setAdmin, 
    logout as logoutAction 
} from '@/store/features/authSlice';
import { useAppDispatch, useAppSelector } from './CustomHook';
interface AdminUser {
    id: string;
    name: string;
    email?: string;
    role: string;
}

interface LoginPayload {
    token: string;
    user: AdminUser;
}

export function useAuth() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const user = useAppSelector(selectCurrentUser);
    const role = useAppSelector(selectUserRole);   
    const token = useAppSelector(selectAuthToken); 

    const login = (data: LoginPayload) => {
        dispatch(setAdmin(data));
    };
    const handleLogout = () => {
        dispatch(logoutAction());
    };

    return {
        user,       
        role,      
        token,     
        isAuthenticated,
        login,
        logout: handleLogout
    };
}