"use client";

import React, { useState } from "react";
import { people } from "@/app/lib/utils";
import Image from "next/image";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const People : React.FC = () => {
    const [openDropdowns, setOpenDropdowns] = useState<{ [id: string]: boolean }>({});

    const toggleDropdown = (id: string) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the specific dropdown by id
        }));
    };

    return (
        <>
            {people.map((person) => {
                const isOpen = openDropdowns[person.id] || false;
                    return (
                        <div key={person.id} className={`w-full h-[18rem] flex justify-center items-center`} style={{ background: `linear-gradient(to right, ${person.color}, white)` }}>
                            <div className="text-2xl w-[65%]">
                                <div className="flex">
                                    <p>Conozca a {person.nombre}: <span
                                        className="italic">{person.profesion} </span><strong>| {person.herramienta}</strong></p>
                                    <button onClick={() => toggleDropdown(person.id)} className="ml-4"
                                    >{isOpen ? <ChevronUpIcon className="w-4 h-4 text-black" /> : <ChevronDownIcon className="w-4 h-4 text-black" />}
                                    </button>
                                </div>
                                <hr className="border-black my-4"/>
                                {isOpen && (
                                    <ul className="list-none">
                                        {person.logros.items.map((item, index) => (
                                            <li key={index}
                                                className="before:content-['■'] before:mr-2 before:text-black text-xl py-2"
                                            >{item.logro}</li>))}
                                    </ul>)}
                            </div>
                            <Image src={person.src} alt={"Querido cliente"} width={800} height={800} className="ml-8 h-[90%] w-auto" layout="reponsive" />
                        </div>
                    )
            })}
        </>
    )
}

export default People;