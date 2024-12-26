import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { items } from "@/app/lib/utils";
import Link from "next/link";
import People from "@/app/ui/general/People";

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
            <div className="flex flex-col justify-center items-center relative w-full h-[13rem] bg-[#EB9C47]">
                <h1 className="text-2xl text-bold mb-2">¡Bienvenido a Programa 21 Días!</h1>
                <p className="text-lg w-[75%] text-center mt-2">Aquí comienza tu camino hacia el éxito: juntos impulsaremos tu negocio, alcanzaremos nuevas metas y lograremos resultados en tan solo 21 días. ¡Es hora de crecer!</p>
            </div>
            <div className="flex flex-col mt-[2rem] items-center mx-auto w-[65%]">
                <Image
                    src="/Programa-21-Dias.png"
                    alt="Programa 21 Días foto"
                    width={800}
                    height={800}
                    layout="object"
                    className="w-full h-[auto] mx-auto mb-5"
                />
                <p className="italic text-bold">Haga click en el día para aprender más</p>
                <ul className="flex flex-col self-start my-10">
                    {items.map((item) => {
                        return (
                            <Link key={item.name} href={item.href}>
                                <strong>
                                    <li className="my-2">{item.name}. <span className="underline">{item.nombre}</span></li>
                                </strong>
                            </Link>
                        )
                })}</ul>
            </div>
            <div className="flex flex-col items-center justify-center mt-10 w-full h-[12rem] bg-[#E78823]">
                <h3 className="text-2xl mb-8">Descubra el Equipo</h3>
                <ul className="list-none w-[75%] text-lg">
                    <li className="before:content-['■'] before:mr-2 before:text-black">Inspírese con las historias de personas en distintas etapas de su camino empresarial.</li>
                    <li className="before:content-['■'] before:mr-2 before:text-black">Encuentre todas las claves del éxito en el Programa 21 Días más arriba.</li>
                </ul>
            </div>
            <div className="w-full h-full">
                <People />
            </div>
        </>
    )
}

export default Page;