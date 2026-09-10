"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export default function ClubFans() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [estrellas, setEstrellas] = useState(0);
    const [hover, setHover] = useState(0);

    const registrarFan = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre.trim() || !correo.trim() || estrellas === 0) {
            toast.error('Completa tus datos y selecciona tus estrellas 🎸');
            return;
        }

        const { error } = await supabase
            .from('fans')
            .insert([{ nombre, correo, estrellas, interacciones: 1 }]);

        if (error) {
            toast.error('Error al unirte. Intenta de nuevo.');
            console.error(error);
        } else {
            toast.success('¡Bienvenido al Club de Fans Oficial! 🤘');
            setNombre('');
            setCorreo('');
            setEstrellas(0);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
            <p className="text-gray-300 mb-6 text-sm">
                Únete, apóyanos con tu calificación y acumula interacciones para convertirte en <span className="text-red-500 font-bold">FAN DESTACADO</span> y ganar premios exclusivos.
            </p>

            <form onSubmit={registrarFan} className="flex flex-col gap-4">
                {/* Sistema de Estrellas */}
                <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            type="button"
                            key={star}
                            className={`text-4xl transition-colors duration-200 ${star <= (hover || estrellas) ? 'text-yellow-500' : 'text-gray-700'
                                }`}
                            onClick={() => setEstrellas(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu Nombre / Apodo"
                    className="p-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-red-500"
                />
                <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Tu Correo Electrónico"
                    className="p-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-red-500"
                />
                <button
                    type="submit"
                    className="bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition-colors duration-300 mt-2"
                >
                    ¡HACERME FAN!
                </button>
            </form>
        </div>
    );
}