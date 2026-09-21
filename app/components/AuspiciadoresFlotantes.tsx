"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AuspiciadoresFlotantes() {
    const [socios, setSocios] = useState<any[]>([]);

    useEffect(() => {
        const cargarSocios = async () => {
            const { data } = await supabase.from('socios').select('*');
            if (data) setSocios(data);
        };
        cargarSocios();
    }, []);

    if (socios.length === 0) return null;

    return (
        <div className="fixed top-1/3 left-0 z-40 flex flex-col gap-6 bg-black/60 p-3 rounded-r-2xl backdrop-blur-md border-y border-r border-gray-800 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            {socios.map((socio) => (
                <a
                    key={socio.id}
                    href={socio.enlace || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group w-10 h-10 md:w-14 md:h-14 flex items-center justify-center logo-flotante"
                >
                    <img
                        src={socio.logo_url}
                        alt={socio.nombre}
                        className="max-w-full max-h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 grayscale group-hover:grayscale-0"
                    />

                    {/* Etiqueta con el nombre que aparece al pasar el cursor */}
                    <span className="absolute left-full ml-4 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                        {socio.nombre}
                        {/* Triángulo rojo apuntando al logo */}
                        <span className="absolute top-1/2 -left-1 w-2 h-2 bg-red-600 transform -translate-y-1/2 rotate-45"></span>
                    </span>
                </a>
            ))}
        </div>
    );
}