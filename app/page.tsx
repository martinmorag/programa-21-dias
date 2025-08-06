'use client';

export default function Home() {
  const scrollToSuscripcion = () => {
    const suscripcionSection = document.getElementById('suscripcion');
    if (suscripcionSection) {
      suscripcionSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-950 dark:text-gray-100 min-h-screen font-[family-name:var(--font-geist-sans)] transition-colors duration-300">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left mb-20 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
              Soy Daniel, tu mentor en emprendimiento.
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Bienvenido al Programa 21 Días. Con las herramientas y mi guía, transformarás tu idea en un negocio exitoso.
            </p>
            <button
              onClick={scrollToSuscripcion}
              className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
            > Empieza ahora
            </button>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            {/* Placeholder for an image or illustration */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Imagen de Daniel</span>
            </div>
          </div>
        </div>

        {/* Features/Content Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Herramientas Únicas</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Accede a recursos exclusivos para planificar, ejecutar y escalar tu negocio.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Acompañamiento Personalizado</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Recibe feedback directo y soporte de expertos para superar cualquier obstáculo.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-4 text-pink-600 dark:text-pink-400">Comunidad de Apoyo</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Conecta con otros emprendedores y comparte experiencias en un entorno colaborativo.
            </p>
          </div>
        </section>

        <section className="mt-24" id="suscripcion">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Elige el plan que te llevará al éxito
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Invierte en tu futuro con planes diseñados para cada etapa de tu emprendimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Plan Emprendedor */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl border-2 border-indigo-100 dark:border-gray-700 flex flex-col">
              <h3 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">Emprendedor</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Ideal para quienes dan sus primeros pasos.
              </p>
              <div className="flex items-end mt-6">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">$99</span>
                <span className="text-2xl font-medium text-gray-500 dark:text-gray-400">/ mes</span>
              </div>
              <ul className="mt-8 space-y-4 text-gray-600 dark:text-gray-400 grow">
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Acceso a todas las herramientas
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Sesiones de mentoría grupal
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Comunidad exclusiva
                </li>
              </ul>
              <button className="w-full mt-10 px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105">
                Suscribirme
              </button>
            </div>

            {/* Plan Emprendedor y Personal */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl border-2 border-purple-200 dark:border-purple-900 relative overflow-hidden flex flex-col">
                <span className="absolute top-0 right-0 px-3 py-1 bg-purple-600 text-white font-bold text-sm rounded-bl-lg">
                    Recomendado
                </span>
              <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400">Emprendedor y Personal</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Para el crecimiento integral de tu negocio y tu persona.
              </p>
              <div className="flex items-end mt-6">
                <span className="text-5xl font-extrabold text-gray-900 dark:text-gray-100">$199</span>
                <span className="text-2xl font-medium text-gray-500 dark:text-gray-400">/ mes</span>
              </div>
              <ul className="mt-8 space-y-4 text-gray-600 dark:text-gray-400 grow">
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Todo lo del Plan Emprendedor
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Mentoría 1:1 Semanal
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Sesiones de crecimiento personal
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Feedback y seguimiento directo
                </li>
              </ul>
              <button className="w-full mt-10 px-8 py-4 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition transform hover:scale-105">
                Suscribirme
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}