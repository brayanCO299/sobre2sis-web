"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function FormularioContacto() {
    const [remitente, setRemitente] = useState('');
    const [contenido, setContenido] = useState('');
    const [estado, setEstado] = useState('');

    const enviarMensaje = async (e: React.FormEvent) => {
        e.preventDefault();
        setEstado('Enviando...');

        const { error } = await supabase
            .from('mensajes_contacto')
            .insert([{ remitente, contenido }]);

        if (error) {
            setEstado('Error al enviar el mensaje. Intenta de nuevo.');
            console.error(error);
        } else {
            setEstado('¡Mensaje enviado con éxito! 🎸');
            setRemitente('');
            setContenido('');
        }
    };

    return (
        <form onSubmit={enviarMensaje} className="max-w-md mx-auto flex flex-col gap-4 px-4">
            <input
                type="text"
                required
                value={remitente}
                onChange={(e) => setRemitente(e.target.value)}
                placeholder="Nombre o Productora"
                className="p-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-red-500"
            />
            <textarea
                required
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Escribe tu mensaje a la página..."
                rows={4}
                className="p-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-red-500"
            />
            <button
                type="submit"
                className="bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition"
            >
                ENVIAR MENSAJE
            </button>

            {estado && (
                <p className={`text-center font-bold mt-2 ${estado.includes('éxito') ? 'text-green-500' : 'text-yellow-500'}`}>
                    {estado}
                </p>
            )}
        </form>
    );
}