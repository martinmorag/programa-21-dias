'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function SuscripcionClient() {
  const searchParams = useSearchParams();
  const estado = searchParams.get('estado'); 

  const getStatusContent = () => {
    switch (estado) { 
      case 'exito': 
        return {
          icon: <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />,
          title: '¡Pago Exitoso!',
          message: 'Tu suscripción ha sido confirmada. Ya puedes acceder a todo nuestro contenido.',
          buttonText: 'Ir a mi Panel',
          buttonLink: '/inicio',
          buttonClass: 'bg-green-600 hover:bg-green-700',
        };
      case 'pendiente':
        return {
          icon: <ClockIcon className="w-20 h-20 text-yellow-500 mx-auto mb-4" />,
          title: 'Pago Pendiente',
          message: 'Estamos esperando la confirmación de tu pago. Te notificaremos cuando esté listo.',
          buttonText: 'Ir a la Página de Planes',
          buttonLink: '/inicio/planes',
          buttonClass: 'bg-yellow-600 hover:bg-yellow-700',
        };
      case 'fallido':
        return {
          icon: <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-4" />,
          title: 'Pago Fallido',
          message: 'Ocurrió un problema con tu pago. Por favor, intenta de nuevo o contacta a soporte.',
          buttonText: 'Intentar de Nuevo',
          buttonLink: '/inicio/planes',
          buttonClass: 'bg-red-600 hover:bg-red-700',
        };
      default:
        return {
          icon: null,
          title: 'Estado de Suscripción',
          message: 'No se pudo determinar el estado de tu pago.',
          buttonText: 'Ir al Inicio',
          buttonLink: '/',
          buttonClass: 'bg-gray-600 hover:bg-gray-700',
        };
    }
  };

  const content = getStatusContent();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-300 text-center">
        {content.icon}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {content.title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          {content.message}
        </p>
        {content.buttonLink && (
          <Link href={content.buttonLink}>
            <button
              className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition transform hover:scale-105 duration-200 ${content.buttonClass}`}
            >
              {content.buttonText}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}