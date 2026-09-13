"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

const OPCIONES = [
    "De Música Ligera (Soda Stereo)",
    "Lamento Boliviano (Enanitos Verdes)",
    "Tren al Sur (Los Prisioneros)"
];

export default function SetlistInteractivo() {
    const [votos, setVotos] = useState<Record<string, number>>({
        [OPCIONES[0]]: 0, [OPCIONES[1]]: 0, [OPCIONES[2]]: 0
    });
    const [totalVotos, setTotalVotos] = useState(0);
    const [yaVoto, setYaVoto] = useState(false);

    const cargarVotos = async () => {
        const { data } = await supabase.from('votos_setlist').select('cancion');
        if (data) {
            const conteo = { [OPCIONES[0]]: 0, [OPCIONES[1]]: 0, [OPCIONES[2]]: 0 };
            data.forEach((v) => {
                if (conteo[v.cancion as keyof typeof conteo] !== undefined) conteo[v.cancion as keyof typeof conteo]++;
            });
            setVotos(conteo);
            setTotalVotos(data.length);
        }
    };

    useEffect(() => {
        cargarVotos();
        if (localStorage.getItem('voto_sobre2sis')) setYaVoto(true);
    }, []);

    const emitirVoto = async (cancion: string) => {
        if (yaVoto) {
            toast.error('¡Ya votaste! 🎸');
            return;
        }
        setVotos(prev => ({ ...prev, [cancion]: (prev[cancion] || 0) + 1 }));
        setTotalVotos(prev => prev + 1);
        setYaVoto(true);
        localStorage.setItem('voto_sobre2sis', 'true');

        const { error } = await supabase.from('votos_setlist').insert([{ cancion }]);
        if (error) toast.error('Error de conexión.');
        else toast.success('¡Voto registrado!');
    };

    return (
        <div className="w-full bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl text-left">
            <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">¿Con qué tema cerramos?</h3>
            <p className="text-gray-400 mb-8 text-xs md:text-sm">El público manda. Vota por el clásico para el próximo show.</p>

            <div className="flex flex-col gap-6">
                {OPCIONES.map((cancion) => {
                    const cantidad = votos[cancion] || 0;
                    const porcentaje = totalVotos === 0 ? 0 : Math.round((cantidad / totalVotos) * 100);

                    return (
                        <div key={cancion} className="w-full">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white font-bold text-sm md:text-base leading-tight pr-4">{cancion}</span>
                                {!yaVoto ? (
                                    <button
                                        onClick={() => emitirVoto(cancion)}
                                        className="bg-red-600 text-white font-black px-4 py-2 rounded text-xs tracking-widest active:scale-95 transition-transform"
                                    >
                                        VOTAR
                                    </button>
                                ) : (
                                    <span className="text-gray-300 font-bold text-sm">{porcentaje}%</span>
                                )}
                            </div>
                            <div className="w-full h-6 bg-black rounded-md border border-gray-700 overflow-hidden">
                                <div className="h-full bg-red-600 transition-all duration-1000 ease-out" style={{ width: `${porcentaje}%` }} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="text-center text-gray-500 mt-6 text-xs uppercase tracking-widest">Total de votos: {totalVotos}</p>
        </div>
    );
}