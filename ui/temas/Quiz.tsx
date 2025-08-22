'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { PropsQuiz } from '@/lib/utils'

export const Quiz: React.FC<PropsQuiz> = ({ recursoId, preguntas, isCompleted }) => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectOption = (optionText: string) => {
    if (!isCompleted && !feedback) {
      setSelectedOption(optionText);
    }
  };

  const handleSubmit = async () => {
    if (selectedOption === null || isCompleted) return;

    setIsSubmitting(true);
    const pregunta = preguntas[0]; // Assuming there's only one question per resource

    if (selectedOption === pregunta.respuesta) {
      setFeedback('success');
      try {
        const res = await fetch('/api/recursos/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recursoId }),
        });

        if (res.ok) {
          // Re-fetch the page data to show the updated completion status
          router.refresh(); 
        }
      } catch (e) {
        console.error('Failed to complete resource:', e);
      }
    } else {
      setFeedback('error');
    }
    setIsSubmitting(false);
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setFeedback(null);
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner">
      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Preguntas y Desafíos
      </h4>
      {isCompleted ? (
        <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
          <FaCheckCircle className="text-2xl" />
          <span className="text-xl font-semibold">¡Este recurso está completado!</span>
        </div>
      ) : (
        <div className="space-y-8">
          {preguntas.map((pregunta, preguntaIndex) => (
            <div key={pregunta.id} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {preguntaIndex + 1}. {pregunta.texto}
              </p>
              <div className="space-y-3">
                {Array.isArray(pregunta.opciones) &&
                  (pregunta.opciones as Array<{ id: string; texto: string }>).map((opcion) => (
                    <button
                      key={opcion.id}
                      onClick={() => handleSelectOption(opcion.texto)}
                      disabled={isCompleted || isSubmitting}
                      className={`w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700
                                 transition-colors duration-200 ease-in-out
                                 ${selectedOption === opcion.texto
                                    ? 'bg-indigo-600 dark:bg-indigo-700 text-white shadow-md'
                                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900 text-gray-800 dark:text-gray-200'
                                 }
                      `}
                    >
                      {opcion.texto}
                    </button>
                  ))}
              </div>

              {feedback && (
                <div className={`mt-4 text-center font-bold ${feedback === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                  {feedback === 'success'
                    ? '¡Respuesta correcta!'
                    : 'Respuesta incorrecta. Intenta de nuevo.'}
                </div>
              )}

              {feedback === 'error' && (
                <button
                  onClick={handleTryAgain}
                  className="mt-4 w-full py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Volver a intentar
                </button>
              )}
            </div>
          ))}
          {!feedback && (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null || isSubmitting}
              className={`w-full py-3 font-bold rounded-lg transition
                         ${selectedOption === null || isSubmitting
                           ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                           : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
              {isSubmitting ? 'Verificando...' : 'Verificar Respuesta'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};