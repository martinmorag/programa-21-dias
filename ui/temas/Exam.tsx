"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ExamenData } from "@/lib/utils";

const Examen: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [examen, setExamen] = useState<ExamenData | null>(null);
    const [respuestas, setRespuestas] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    const resetExam = () => {
        setExamen(null);
        setRespuestas({});
        setLoading(true);
        setError(null);
        setIsSubmitted(false);
        setScore(null);
        fetchExamen(); 
    };

    const fetchExamen = async () => {
        try {
            const res = await fetch('/api/temas/examen');
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to fetch exam questions.");
            }
            const data: ExamenData = await res.json();
            setExamen(data);
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

    useEffect(() => {
        if (status === "authenticated") {
            fetchExamen();
        }
    }, [status]); // Use status in the dependency array

    const handleOptionChange = (preguntaId: string, opcionId: string) => {
        setRespuestas(prev => ({
            ...prev,
            [preguntaId]: opcionId,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        try {
            const res = await fetch('/api/temas/examen/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ respuestas }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to submit exam.");
            }

            const result = await res.json();
            setScore(result.score);
            setIsSubmitted(true);
            
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred during submission.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
    }
    
    if (isSubmitted && score !== null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg">
                    {score >= 80 ? (
                        <>
                            <h2 className="text-4xl font-extrabold text-green-600 dark:text-green-400 mb-4">¡Felicidades, Aprobaste! 🎉</h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                Tu puntaje final es de <strong className="font-bold">{score}%</strong>. ¡Has superado el examen con éxito!
                            </p>
                            <button
                                onClick={() => router.push('/inicio')}
                                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                            >
                                Regresar al Inicio
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-4xl font-extrabold text-red-600 dark:text-red-400 mb-4">No Aprobado 😔</h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                Tu puntaje final es de <strong className="font-bold">{score}%</strong>. Necesitas un 80% para aprobar.
                            </p>
                            <div className="space-y-4">
                                <button
                                    onClick={resetExam}
                                    className="w-full px-6 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-700 transition"
                                >
                                    Intentar de Nuevo
                                </button>
                                <button
                                    onClick={() => router.push('/inicio')}
                                    className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                                >
                                    Regresar a los Módulos
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
    
    if (!examen) {
        return <div className="text-center mt-20 text-gray-500">No hay examen disponible para tu plan de suscripción.</div>;
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen p-8 sm:p-16">
            <main className="container mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
                    Examen Final: Plan {examen.planCode === 'emprendedor' ? 'Emprendedor' : 'Emprendedor Personal'}
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                    Completa este examen para obtener tu certificado. Debes responder correctamente al 80% de las preguntas.
                </p>
                <form onSubmit={handleSubmit}>
                    <ol className="list-decimal list-inside space-y-8">
                        {examen.preguntas.map((pregunta) => (
                            <li key={pregunta.id} className="text-lg text-gray-900 dark:text-gray-100 font-medium">
                                <p className="mb-4">{pregunta.pregunta}</p>
                                <ul className="space-y-3 pl-4">
                                    {pregunta.opciones.map(opcion => (
                                        <li key={opcion.id}>
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={pregunta.id}
                                                    value={opcion.id}
                                                    checked={respuestas[pregunta.id] === opcion.id}
                                                    onChange={() => handleOptionChange(pregunta.id, opcion.id)}
                                                    className="form-radio h-5 w-5 text-indigo-600 dark:text-indigo-400"
                                                />
                                                <span className="text-gray-700 dark:text-gray-300">
                                                    {opcion.texto}
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                    <div className="flex justify-center mt-12">
                        <button
                            type="submit"
                            className="px-8 py-4 bg-indigo-600 text-white font-semibold cursor-pointer rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={Object.keys(respuestas).length !== examen.preguntas.length || isSubmitting}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Enviando...
                                </div>
                            ) : (
                                "Enviar Respuestas"
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Examen;