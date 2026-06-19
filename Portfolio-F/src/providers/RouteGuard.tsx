'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hook/CustomHook';
import { selectIsAuthenticated, selectUserRole } from '@/store/features/authSlice';
import Loader from '@/components/ui/animation/Loader';

export default function RouteGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const userRole = useAppSelector(selectUserRole);
    
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        // ১. যদি লগইন না থাকে
        if (!isAuthenticated) {
            setIsAuthorized(false);
            router.replace('/'); 
            return;
        }

        // ২. যদি রোল অ্যাডমিন না হয়
        if (userRole !== 'admin') {
            setIsAuthorized(false);
            router.replace('/unauthorized'); 
            return;
        }

        setIsAuthorized(true);
    }, [isAuthenticated, userRole, isMounted, router]);

    if (!isMounted || !isAuthorized) {
       return <Loader/>
    }

    return <>{children}</>;
}