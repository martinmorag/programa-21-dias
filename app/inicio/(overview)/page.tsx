"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Tema } from "@/lib/utils";

const Page: React.FC = () => {
    const { data: session, status } = useSession();
    const userFirstName = session?.user?.name?.split(' ')[0] || 'Invitado';

    const [temas, setTemas] = useState<Tema[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === "authenticated") {
            const fetchTemas = async () => {
                try {
                    const res = await fetch('/api/temas');
                    if (!res.ok) {
                        throw new Error("Failed to fetch themes.");
                    }
                    const data = await res.json();
                    setTemas(data);
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError("An unexpected error occurred.");
                    }
                } finally {
                    setLoading(false);
                }
            };
            fetchTemas();
        }
    }, [status]);

    if (status === "loading" || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
    }

    const temasEmprendedor = temas.filter(t => t.tipo === 'EMPRENDEDOR');
    const temasPersonal = temas.filter(t => t.tipo === 'PERSONAL');

    return (
        <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
            {/* Sección de Bienvenida (Hero) */}
            <div className="relative w-full h-96 flex items-center justify-center text-white">
                <Image
                    src="/background.jpg"
                    alt="Imagen de fondo"
                    fill
                    className="object-cover opacity-70"
                />
                <div className="relative z-10 text-center p-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 leading-tight">
                        ¡Bienvenido, {userFirstName}!
                    </h1>
                    <p className="text-lg sm:text-xl max-w-3xl mx-auto mt-4 font-light">
                        Aquí comienza tu camino hacia el éxito: juntos impulsaremos tu negocio, alcanzaremos nuevas metas y lograremos resultados en tan solo 21 días. ¡Es hora de crecer!
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Sección de Clases */}
                <section className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Tu Plan de Acción: Las 11 Clases
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Haga clic en cada día para aprender más sobre las herramientas que te harán crecer.
                    </p>

                    {/* Render Emprendedor themes */}
                    {temasEmprendedor.length > 0 && (
                        <>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-6">
                                Emprendedor
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {temasEmprendedor.map((tema) => (
                                    <Link key={tema.id} href={`/temas/${tema.id}`} className="group">
                                        <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col h-full">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {tema.orden}
                                            </h3>
                                            <p className="mt-2 text-gray-600 dark:text-gray-400 transition-colors flex-grow">
                                                {tema.nombre}
                                            </p>
                                            <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                <div
                                                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                                                    style={{ width: `${tema.progresoGeneral}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm mt-2 block text-gray-500 dark:text-gray-400">
                                                {Math.round(tema.progresoGeneral)}% completado
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Render Personal themes */}
                    {temasPersonal.length > 0 && (
                        <>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-6">
                                Personal
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {temasPersonal.map((tema) => (
                                    <Link key={tema.id} href={`/temas/${tema.id}`} className="group">
                                        <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300 transform group-hover:-translate-y-2 flex flex-col h-full">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {tema.orden}
                                            </h3>
                                            <p className="mt-2 text-gray-600 dark:text-gray-400 transition-colors flex-grow">
                                                {tema.nombre}
                                            </p>
                                            <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                                <div
                                                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                                                    style={{ width: `${tema.progresoGeneral}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm mt-2 block text-gray-500 dark:text-gray-400">
                                                {Math.round(tema.progresoGeneral)}% completado
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </section>

                <hr className="my-16 border-gray-200 dark:border-gray-700" />
            </main>
        </div>
    );
};

export default Page;