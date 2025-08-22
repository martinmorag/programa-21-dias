'use client';

import { Plan } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const mpLogo = '/logos/mercadopago.svg';
const whatsAppLogo = '/logos/whatsapp.png';
const emailLogo = '/logos/email.svg';

export default function CheckoutClient({ plan }: { plan: Plan }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const handleMercadoPagoPayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/mercadopago/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: plan.name, // Use the prop data
          price: plan.price,   // Use the prop data
          planId: plan.id,     // Use the prop data
        }),
      });

      const data = await response.json();
      if (data.initPoint) {
        window.location.href = data.initPoint;
      } else {
        alert('Error al crear la orden de pago.');
      }
    } catch (error) {
      console.error('API call failed:', error);
      alert('Error de conexión. Intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const cbuAlias = 'your-alias.here';
  const cbuNumber = 'your-cbu-number-here';
  const contactEmail = 'soporte@tuempresa.com'; // 👈 Replace with your email
  const whatsappNumber = '5491112345678'; // 👈 Replace with your WhatsApp number (e.g., 54911 for Argentina)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contactEmail).then(() => {
      setIsEmailCopied(true);
      setTimeout(() => setIsEmailCopied(false), 2000); // Reset message after 2 seconds
    });
  };

  const whatsappMessage = `Hola, te envío el comprobante de pago para mi suscripción al plan "${plan.name}" por un monto de $${plan.price}.`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-auto shadow-xl">
        <button
          onClick={() => router.back()}
          className="mb-6 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition flex items-center"
        >
          &larr; Volver
        </button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
          Pagar Suscripción
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-6">
          Plan: {plan.name} | Monto: ${plan.price}
        </p>

        <div className="space-y-4">
          <button
            onClick={handleMercadoPagoPayment}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
            disabled={isLoading}
          >
            <Image src={mpLogo} alt="Mercado Pago Logo" width={100} height={24} className="mr-2" />
            {isLoading ? 'Cargando...' : 'Pagar con Mercado Pago'}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              O podés pagar con Alias / CBU
            </p>
            <div className="mt-2 text-left bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-900 dark:text-gray-100 font-bold">
                Alias: <span className="font-normal">{cbuAlias}</span>
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100 font-bold">
                CBU: <span className="font-normal">{cbuNumber}</span>
              </p>
              
              <div className="mt-4 flex flex-col gap-2">
                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition flex items-center justify-center text-sm"
                >
                  <Image src={whatsAppLogo} alt="WhatsApp Logo" width={18} height={18} className="mr-2" />
                  Enviar Comprobante por WhatsApp
                </a>

                <div
                  onClick={copyToClipboard}
                  className="w-full py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition flex items-center justify-center text-sm cursor-pointer"
                >
                  <span className="flex items-center">
                    {isEmailCopied ? (
                      <span className="text-green-500 dark:text-green-400">Email Copiado!</span>
                    ) : (
                      <>
                        <Image src={emailLogo} alt="Email Logo" width={18} height={18} className="mr-2" />
                        <span className="font-medium">{contactEmail}</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}