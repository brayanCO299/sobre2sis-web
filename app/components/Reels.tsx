import React from 'react';
import { supabase } from '../lib/supabase';

// Componente de Servidor para consultar la base de datos
export default async function Reels() {
    // Consultar los videos que estén activos, del más nuevo al más viejo
    const { data: reels, error } = await supabase
        .from('reels')
        .select('*')
        .eq('activo', true);

    if (error || !reels || reels.length === 0) {
        return <p className="text-gray-500 text-center font-bold">Pronto subiremos nuevos videos...</p>;
    }

    return (
        <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x snap-mandatory scrollbar-hide">
            {reels.map((reel) => (
                <div
                    key={reel.id}
                    className="min-w-[300px] w-[300px] h-[533px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl snap-center relative border border-gray-800 flex-shrink-0"
                >
                    {/* Etiqueta nativa de video HTML5 */}
                    <video
                        src={reel.video_url}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        controlsList="nodownload"
                    />
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 pointer-events-none">
                        <p className="text-white font-bold text-lg drop-shadow-md">{reel.titulo}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}