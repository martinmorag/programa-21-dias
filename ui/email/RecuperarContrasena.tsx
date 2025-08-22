'use client';

import React, { useState, useEffect } from 'react';

const RecuperarContrasena: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const [cooldownSeconds, setCooldownSeconds] = useState(60);

    // Effecto para manejar el temporizador
    useEffect(() => {
        if (cooldown) {
            const timer = setInterval(() => {
                setCooldownSeconds((prevSeconds) => {
                    if (prevSeconds <= 1) {
                        clearInterval(timer);
                        setCooldown(false);
                        setMessage(''); // Limpiar mensaje cuando el temporizador termina
                        return 60;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cooldown]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setCooldown(true); // Iniciar el temporizador inmediatamente después de enviar

        try {
            const response = await fetch('/api/email/recuperar-contrasena', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setEmail('');
            } else {
                setMessage(data.error || 'Algo salió mal. Por favor, inténtalo de nuevo.');
                setCooldown(false); // Reiniciar el temporizador si hay un error
                setCooldownSeconds(60);
            }
        } catch (error) {
            setMessage('No se pudo conectar con el servidor. Por favor, inténtalo más tarde. ' + error);
            setCooldown(false); // Reiniciar el temporizador si hay un error
            setCooldownSeconds(60);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-colors duration-300">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
                    Recuperar contraseña
                </h2>
                <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                    Ingresa tu correo electrónico para recibir un enlace para restablecer tu contraseña.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Correo electrónico
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={cooldown || loading}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white sm:text-sm disabled:opacity-50"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading || cooldown}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-300 ${
                                loading || cooldown
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            }`}
                        >
                            {loading
                                ? 'Enviando...'
                                : cooldown
                                ? `Enviar enlace (${cooldownSeconds}s)`
                                : 'Enviar enlace'}
                        </button>
                    </div>
                    {message && <p className="mt-2 text-center text-sm text-green-500">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default RecuperarContrasena;