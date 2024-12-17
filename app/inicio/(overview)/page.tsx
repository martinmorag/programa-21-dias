import React from "react";
import Image from "next/image";
import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Programa 21 Días",
    description: "Programa 21 Días: Impulsa tu negocio, transforma tu futuro"
}

const Page : React.FC = () => {
    return (
        <>
            <Image
            src="/background.jpg"
            alt="Imagen de fondo"
            width={800}
            height={800}
            className="w-full opacity-70 relative top-0 z-0"
            layout="responsive"
            >
            </Image>
            <div className="flex flex-col justify-center items-center relative w-full h-[13rem] bg-[#cbb26a]">
                <h1 className="text-2xl text-bold mb-2">¡Bienvenido a Programa 21 Días!</h1>
                <p className="text-lg w-[75%] text-center mt-2">Aquí comienza tu camino hacia el éxito: juntos impulsaremos tu negocio, alcanzaremos nuevas metas y lograremos resultados en tan solo 21 días. ¡Es hora de crecer!</p>
            </div>
        </>
    )
}

export default Page;