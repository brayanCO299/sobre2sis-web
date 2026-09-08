import React from 'react';
import { supabase } from '../lib/supabase';

export default async function Galeria() {
    const { data: fotos, error } = await supabase
        .from('galeria')
        .select('*');

    if (error || !fotos || fotos.length === 0) {
        return <p className="text-gray-500 text-center font-bold">Pronto subiremos nuestras mejores fotos...</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-8">
            {fotos.map((foto) => (
                <div key={foto.id} className="relative group overflow-hidden rounded-xl border border-gray-800 shadow-2xl h-80">
                    <img
                        src={foto.foto_url}
                        alt={foto.descripcion || "Foto de Sobredosis"}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-4">
                        <p className="text-white text-center font-bold text-lg">{foto.descripcion}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}