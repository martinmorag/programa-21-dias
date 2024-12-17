import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header : React.FC = () => {
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
            </div>
        </header>
    )
}

export default Header;