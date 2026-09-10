import React from 'react';
import { supabase } from '../lib/supabase';
import GaleriaInteractiva from './GaleriaInteractiva';

export default async function Galeria() {
    const { data: fotos, error } = await supabase
        .from('galeria')
        .select('*');

    if (error || !fotos || fotos.length === 0) {
        return <p className="text-gray-500 text-center font-bold">Pronto subiremos nuestras mejores fotos...</p>;
    }

    return <GaleriaInteractiva fotos={fotos} />;
}