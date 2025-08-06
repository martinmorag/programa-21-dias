'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftStartOnRectangleIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

const Header: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // This useEffect ensures the component only renders after mounting,
    // preventing hydration errors with next-themes.
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    const handleSignIn = () => {
        router.push('/ingreso');
    };

    if (!mounted) {
        return null;
    }

    const inicioHref = session ? '/inicio' : '/';

    return (
        <header className="top-0 left-0 right-0 z-50 flex items-center justify-between p-4 sm:px-8 h-16 bg-white dark:bg-gray-900 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <Link href={inicioHref} className="flex items-center gap-2">
                    <Image
                        src="/logo_21.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="h-8 w-auto transition-transform hover:scale-110"
                    />
                    <span className="font-bold text-lg text-gray-900 dark:text-white hidden sm:block">
                        Programa 21 Días
                    </span>
                </Link>
                {session && (
                    <Link href="/inicio" className="text-gray-600 dark:text-gray-400 font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        Inicio
                    </Link>
                )}
            </div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                    {theme === 'dark' ? (
                        <SunIcon className="h-5 w-5" style={{ color: '#FCD34D' }} /> // Amarillo suave (yellow-300)
                    ) : (
                        <MoonIcon className="h-5 w-5" style={{ color: '#1E40AF' }} /> // Azul oscuro (blue-800)
                    )}
                </button>

                {status === 'loading' ? (
                    <span className="text-gray-500 dark:text-gray-400">Cargando...</span>
                ) : session ? (
                    <button
                        onClick={handleSignOut}
                        className="flex items-center justify-center p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                    >
                        <ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-white" />
                    </button>
                ) : (
                    <button
                        onClick={handleSignIn}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors"
                    >
                        Iniciar sesión
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;