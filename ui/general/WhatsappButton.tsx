'use client';

import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const WhatsappButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const phoneNumber = process.env.WHATSAPP_NUMBER;
  const message = 'Hola, me gustaría más información sobre el Programa 21 Días.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => {
      // Get the current scroll position
      const scrollTop = window.scrollY;
      // Get the total height of the document
      const docHeight = document.documentElement.scrollHeight;
      // Get the height of the viewport
      const windowHeight = window.innerHeight;

      // Calculate how close the user is to the bottom
      const distanceToBottom = docHeight - (scrollTop + windowHeight);

      // We want to hide the button when the remaining scroll distance is less than, for example, 200px
      // You can adjust this value to control when the button disappears
      if (distanceToBottom < 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center group transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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