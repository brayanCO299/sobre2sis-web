"use client";
import React, { useState } from 'react';

export default function GaleriaInteractiva({ fotos }: { fotos: any[] }) {
    // Estado para controlar qué foto está abierta en pantalla completa
    const [fotoAmpliada, setFotoAmpliada] = useState<any | null>(null);

    return (
        <>
            {/* 1. Cuadrícula de fotos (Miniaturas) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {fotos.map((foto) => (
                    <div
                        key={foto.id}
                        className="relative h-64 md:h-80 w-full bg-black rounded-xl overflow-hidden shadow-lg border border-gray-800 cursor-pointer group flex items-center justify-center"
                        onClick={() => setFotoAmpliada(foto)}
                    >
                        <img
                            src={foto.foto_url}
                            alt={foto.descripcion || 'Foto de SOBRE2SIS'}
                            // object-contain garantiza que la foto no se recorte nunca
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>

            {/* 2. Lightbox (Visor de pantalla completa) */}
            {fotoAmpliada && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-md transition-opacity"
                    onClick={() => setFotoAmpliada(null)} // Cierra al hacer clic en el fondo oscuro
                >
                    {/* Botón de cerrar */}
                    <button
                        className="absolute top-6 right-6 text-white text-5xl font-light hover:text-red-500 z-[110] transition-colors"
                        onClick={() => setFotoAmpliada(null)}
                    >
                        &times;
                    </button>

                    {/* Imagen en tamaño real */}
                    <img
                        src={fotoAmpliada.foto_url}
                        alt={fotoAmpliada.descripcion}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic directo en la foto
                    />

                    {/* Descripción flotante (Si existe) */}
                    {fotoAmpliada.descripcion && (
                        <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none px-4">
                            <span className="bg-black/80 text-white px-6 py-3 rounded-full font-bold tracking-widest text-sm md:text-base border border-gray-700 inline-block shadow-lg">
                                {fotoAmpliada.descripcion}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}