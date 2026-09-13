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
        [OPCIONES[0]]: 0,
        [OPCIONES[1]]: 0,
        [OPCIONES[2]]: 0
    });
    const [totalVotos, setTotalVotos] = useState(0);
    const [yaVoto, setYaVoto] = useState(false);

    const cargarVotos = async () => {
        const { data } = await supabase.from('votos_setlist').select('cancion');

        if (data) {
            const conteo = { [OPCIONES[0]]: 0, [OPCIONES[1]]: 0, [OPCIONES[2]]: 0 };
            data.forEach((v) => {
                if (conteo[v.cancion as keyof typeof conteo] !== undefined) {
                    conteo[v.cancion as keyof typeof conteo]++;
                }
            });
            setVotos(conteo);
            setTotalVotos(data.length);
        }
    };

    useEffect(() => {
        cargarVotos();
        if (localStorage.getItem('voto_sobre2sis')) {
            setYaVoto(true);
        }
    }, []);

    const emitirVoto = async (cancion: string) => {
        if (yaVoto) {
            toast.error('¡Ya dejaste tu voto para este show! 🎸');
            return;
        }

        // 1. Actualización visual instantánea (Suma el voto de inmediato)
        setVotos(prev => ({ ...prev, [cancion]: (prev[cancion] || 0) + 1 }));
        setTotalVotos(prev => prev + 1);
        setYaVoto(true);
        localStorage.setItem('voto_sobre2sis', 'true');

        // 2. Guardado en la base de datos en segundo plano
        const { error } = await supabase.from('votos_setlist').insert([{ cancion }]);

        if (error) {
            toast.error('Hubo un error de conexión al guardar tu voto.');
        } else {
            toast.success('¡Voto registrado con éxito!');
            cargarVotos(); // Sincroniza datos por si alguien más votó al mismo tiempo
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl mt-8">
            <h3 className="text-xl md:text-2xl font-black text-white mb-2 uppercase tracking-wide">¿Con qué tema cerramos?</h3>
            <p className="text-gray-400 mb-8 text-xs md:text-sm">El público manda. Vota por el clásico que quieres escuchar al final del próximo show.</p>

            <div className="flex flex-col gap-5">
                {OPCIONES.map((cancion) => {
                    const cantidad = votos[cancion] || 0;
                    const porcentaje = totalVotos === 0 ? 0 : Math.round((cantidad / totalVotos) * 100);

                    return (
                        <div key={cancion} className="relative">
                            <div className="flex justify-between items-end text-white font-bold mb-2 text-xs md:text-sm relative z-10 drop-shadow-md gap-2">
                                <span className="flex-1 leading-tight">{cancion}</span>
                                <span className="whitespace-nowrap text-gray-300">{porcentaje}% ({cantidad} votos)</span>
                            </div>

                            <div
                                className="w-full h-10 md:h-12 bg-black rounded-lg border border-gray-700 overflow-hidden cursor-pointer relative"
                                onClick={() => emitirVoto(cancion)}
                            >
                                <div
                                    className="h-full bg-red-600 transition-all duration-1000 ease-out"
                                    style={{ width: `${porcentaje}%` }}
                                />

                                {!yaVoto && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span className="text-white font-black tracking-widest bg-red-600 px-4 py-1 text-xs md:text-sm rounded border border-red-500 shadow-lg">
                                            VOTAR
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="text-center text-gray-500 mt-6 text-xs uppercase tracking-widest">Total de votos: {totalVotos}</p>
        </div>
    );
}