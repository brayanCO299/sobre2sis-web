"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

// Puedes cambiar estas canciones por las que la banda vaya a tocar
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

        const { error } = await supabase.from('votos_setlist').insert([{ cancion }]);

        if (error) {
            toast.error('Hubo un error al votar.');
        } else {
            toast.success('¡Voto registrado con éxito!');
            localStorage.setItem('voto_sobre2sis', 'true');
            setYaVoto(true);
            cargarVotos(); // Recarga las barras de progreso
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl mt-8">
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">¿Con qué tema cerramos?</h3>
            <p className="text-gray-400 mb-8 text-sm">El público manda. Vota por el clásico que quieres escuchar al final del próximo show.</p>

            <div className="flex flex-col gap-6">
                {OPCIONES.map((cancion) => {
                    const cantidad = votos[cancion] || 0;
                    const porcentaje = totalVotos === 0 ? 0 : Math.round((cantidad / totalVotos) * 100);

                    return (
                        <div key={cancion} className="relative">
                            <div className="flex justify-between text-white font-bold mb-2 text-sm md:text-base relative z-10 drop-shadow-md">
                                <span>{cancion}</span>
                                <span>{porcentaje}% ({cantidad} votos)</span>
                            </div>

                            {/* Contenedor de la barra */}
                            <div
                                className="w-full h-12 bg-black rounded-lg border border-gray-700 overflow-hidden cursor-pointer group relative"
                                onClick={() => emitirVoto(cancion)}
                            >
                                {/* Barra de progreso animada */}
                                <div
                                    className="h-full bg-red-600 transition-all duration-1000 ease-out flex items-center"
                                    style={{ width: `${porcentaje}%` }}
                                />

                                {/* Botón flotante al pasar el mouse (si no ha votado) */}
                                {!yaVoto && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                                        <span className="text-white font-black tracking-widest bg-red-600 px-4 py-1 rounded">¡VOTAR!</span>
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