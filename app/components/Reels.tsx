import React from 'react';
import { supabase } from '../lib/supabase';
import ReelInteractivo from './ReelInteractivo';

export default async function Reels() {
    const { data: reels, error } = await supabase.from('reels').select('*').eq('activo', true);

    if (error || !reels || reels.length === 0) return (
        <p className="text-gray-500 text-center font-bold">Pronto subiremos nuevos videos...</p>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto justify-items-center pb-8 px-4">
            {reels.map((reel) => (
                <ReelInteractivo key={reel.id} reel={reel} />
            ))}
        </div>
    );
}