'use client'

import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('');

    try {
      const res = await fetch('/api/email/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setStatusMessage(data.message);

      if (res.ok) {
        setFormData({
          name: '',
          email: '',
          message: '',
        });

        setTimeout(() => {
          setStatusMessage('');
        }, 10000);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setStatusMessage('Ocurrió un error al enviar el mensaje.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full max-w-lg text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contacto
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            ¡Estamos aquí para ayudarte! Por favor, llena el formulario a continuación.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Tu Nombre"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Tu Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="message"
              placeholder="Tu Mensaje"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
          {statusMessage && (
            <p className={`mt-4 text-center text-sm font-medium ${statusMessage.includes('exitosamente') ? 'text-green-600' : 'text-red-600'}`}>
              {statusMessage}
            </p>
          )}
        </div>
      </main>
    </>
  );
};

export default Contacto;