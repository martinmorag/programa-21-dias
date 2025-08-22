'use client';

import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

const WhatsappButton = () => {
  const phoneNumber = process.env.WHATSAPP_NUMBER;
  const message = 'Hola, me gustaría más información sobre el Programa 21 Días.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      <span className="
        bg-gray-800 text-white text-sm px-3 py-2 rounded-lg
        shadow-md mr-4 whitespace-nowrap
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
      ">
        Hable con nosotros
      </span>
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-green-500 rounded-full shadow-lg transition-transform transform hover:scale-110 active:scale-95"
      >
        <FaWhatsapp className="h-8 w-8 text-white" />
      </Link>
    </div>
  );
};

export default WhatsappButton;