"use client";
import React, { useState, useEffect } from 'react';

export default function Countdown({ fechaEvento }: { fechaEvento: string }) {
    const [tiempoRestante, setTiempoRestante] = useState({
        días: 0, horas: 0, minutos: 0, segundos: 0
    });
    const [finalizado, setFinalizado] = useState(false);

    useEffect(() => {
        // Convierte la fecha del evento a un formato compatible (asegura que tome la hora local)
        const fechaObjetivo = new Date(`${fechaEvento}T00:00:00`).getTime();

        const intervalo = setInterval(() => {
            const ahora = new Date().getTime();
            const diferencia = fechaObjetivo - ahora;

            if (diferencia <= 0) {
                clearInterval(intervalo);
                setFinalizado(true);
            } else {
                setTiempoRestante({
                    días: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
                    horas: Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
                    segundos: Math.floor((diferencia % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(intervalo);
    }, [fechaEvento]);

    if (finalizado) {
        return <p className="text-red-500 font-bold text-2xl mt-6 animate-pulse">¡EL EVENTO ES HOY!</p>;
    }

    return (
        <div className="flex justify-center gap-4 mt-6 mb-8">
            {Object.entries(tiempoRestante).map(([unidad, valor]) => (
                <div key={unidad} className="flex flex-col items-center bg-black px-4 py-3 rounded-lg border border-gray-700 w-20 shadow-inner">
                    <span className="text-3xl font-black text-white">{valor}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">{unidad}</span>
                </div>
            ))}
        </div>
    );
}