import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4">
      <h1 className="text-9xl font-extrabold text-gray-800 dark:text-gray-200">
        404
      </h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Página No Encontrada
      </h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-md">
        Lo sentimos, la página que estás buscando no existe. Es posible que la dirección haya sido escrita incorrectamente o que la página haya sido movida.
      </p>
      <Link href="/">
        <div className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Volver al inicio
        </div>
      </Link>
    </div>
  );
}