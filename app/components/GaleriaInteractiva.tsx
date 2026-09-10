"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export default function GaleriaInteractiva({ fotos }: { fotos: any[] }) {
    const [fotoSeleccionada, setFotoSeleccionada] = useState<any>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-8">
                {fotos.map((foto) => (
                    <div
                        key={foto.id}
                        className="relative group overflow-hidden rounded-xl border border-gray-800 shadow-2xl h-80 cursor-pointer"
                        onClick={() => setFotoSeleccionada(foto)}
                    >
                        <Image
                            src={foto.foto_url}
                            alt={foto.descripcion || "Foto de la banda"}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-4">
                            <p className="text-white text-center font-bold text-lg">{foto.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Pantalla Completa (Lightbox) */}
            {fotoSeleccionada && (
                <div
                    className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setFotoSeleccionada(null)}
                >
                    <div className="relative max-w-5xl w-full h-[80vh]">
                        <Image
                            src={fotoSeleccionada.foto_url}
                            alt={fotoSeleccionada.descripcion || "Foto ampliada"}
                            fill
                            className="object-contain"
                        />
                        <button
                            className="absolute top-0 right-4 text-white text-5xl font-bold hover:text-red-500 z-50 transition-colors"
                            onClick={() => setFotoSeleccionada(null)}
                        >
                            &times;
                        </button>
                        {fotoSeleccionada.descripcion && (
                            <p className="absolute bottom-4 left-0 right-0 text-center text-white text-xl font-bold drop-shadow-md">
                                {fotoSeleccionada.descripcion}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}