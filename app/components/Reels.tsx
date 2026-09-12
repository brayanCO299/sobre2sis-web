import React from 'react';
import { supabase } from '../lib/supabase';
import ReelInteractivo from './ReelInteractivo';

export default async function Reels() {
    const { data: reels, error } = await supabase.from('reels').select('*').eq('activo', true);

    if (error || !reels || reels.length === 0) return null;

    return (
        <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x snap-mandatory scrollbar-hide">
            {reels.map((reel) => (
                <ReelInteractivo key={reel.id} reel={reel} />
            ))}
        </div>
    );
}