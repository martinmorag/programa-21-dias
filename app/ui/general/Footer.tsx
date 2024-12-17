import React from "react";
import Link from "next/link";

const Footer : React.FC = () => {
    return (
        <footer className="flex justify-center items-center h-[3.5rem]">
            <Link href="/inicio">
                Volver al inicio
            </Link>
        </footer>
    )
}

export default Footer;