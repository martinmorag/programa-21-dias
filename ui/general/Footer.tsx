"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useSession } from "next-auth/react";

const Footer: React.FC = () => {
    const { data: session, status } = useSession();

    const inicioHref = session ? '/inicio' : '/';

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 text-gray-400 py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                {/* Center container for logo and social links */}
                <div className="flex-1 md:flex">
                    <div>
                        <p className="text-lg font-semibold">Programa 21 Dias</p>
                        <p className="text-sm">© {new Date().getFullYear()} Todos los derechos reservados.</p>
                    </div>
                </div>

                {/* Navigation Links (Centered) */}
                <nav className="flex-none flex flex-col justify-center my-[3rem] md:my-0">
                    <Link href={inicioHref} className="hover:text-indigo-600 text-center dark:hover:text-white transition-colors">
                        Inicio
                    </Link>
                    <Link href="/contacto" className="hover:text-indigo-600 text-center dark:hover:text-white transition-colors">
                        Contacto
                    </Link>
                </nav>

                {/* Social Media Links (Right-aligned) */}
                <div className="flex-1 flex justify-end">
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook className="w-6 h-6 hover:text-indigo-600 dark:hover:text-white transition-colors" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram className="w-6 h-6 hover:text-indigo-600 dark:hover:text-white transition-colors" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin className="w-6 h-6 hover:text-indigo-600 dark:hover:text-white transition-colors" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;