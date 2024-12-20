import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";

const Header : React.FC = () => {
    const router = useRouter(); // Use the Next.js router

    const handleSignOut = async () => {
        await signOut({ redirect: false }); // Set redirect to false to handle redirection manually
        router.push('/'); // Redirect to the home page or any other page after sign-out
    };

    return (
        <header className="flex justify-between px-10 py-6 absolute z-10 w-full">
            <div className="flex items-center">
                <Link href="/inicio">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="h-[3rem] w-[auto]"
                    />
                </Link>
                <h3 className="ml-4 text-white text-xl">Programa 21 Días</h3>
            </div>
            <div className="flex items-center">
                <Link href="/inicio">
                    <h3 className="ml-4 text-white text-xl">Inicio</h3>
                </Link>
                <button onClick={handleSignOut} className="bg-[#cbb26a] rounded-full w-[3rem] h-[3rem] p-2 ml-3 relative group">
                    <ArrowLeftStartOnRectangleIcon className="text-white"/>
                    <span className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">Cerrar sesión</span>
                </button>
            </div>
        </header>
    )
}

export default Header;