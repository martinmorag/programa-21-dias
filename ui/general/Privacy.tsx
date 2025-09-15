const Privacy: React.FC = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Política de Privacidad</h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          Esta aplicación utiliza la <strong>API de WhatsApp Business</strong> para enviar y recibir mensajes. No
          recopilamos, almacenamos ni compartimos ninguna información personal de los usuarios. Los
          mensajes se procesan únicamente con el propósito de responder a las consultas de los usuarios.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Si tiene alguna pregunta sobre esta política de privacidad, puede contactarnos en:
          <a
            href="mailto:moragamartin2@gmail.com"
            className="text-blue-600 hover:text-blue-800 font-semibold ml-1"
          >
            moragamartin2@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Privacy;