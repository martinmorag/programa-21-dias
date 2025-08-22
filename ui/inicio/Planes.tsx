'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plan } from '@/lib/utils'; // Assuming Plan type is defined in your utils
import { FaCheckCircle, FaSpinner } from 'react-icons/fa'; // Assuming you have react-icons installed

const Planes: React.FC = () => {
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const res = await fetch('/api/planes');
        if (!res.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data = await res.json();
        setPlanes(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlanes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-900 dark:text-gray-100" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center p-4">
      <div className="text-center my-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Elige el Plan Perfecto para Ti
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Comienza a impulsar tu negocio con acceso a todo nuestro contenido premium y herramientas exclusivas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {planes.map(plan => (
          <div
            key={plan.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{plan.name}</h2>
              <p className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6">
                ${plan.price}
                <span className="text-lg text-gray-500 dark:text-gray-400 font-normal">/año</span>
              </p>
              
              <ul className="text-gray-700 dark:text-gray-300 space-y-3 mb-8">
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Acceso a todas las clases del plan {plan.name}
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Comunidad exclusiva
                </li>
                <li className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Soporte personalizado
                </li>
                {/* You can add more dynamic features based on plan.code or other data */}
              </ul>
            </div>

            <button
              onClick={() => router.push(`/checkout/${plan.code}`)}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition"
            >
              Suscribirse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planes;