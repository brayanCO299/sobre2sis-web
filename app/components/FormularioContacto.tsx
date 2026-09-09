"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast, Toaster } from 'react-hot-toast';

export default function FormularioContacto() {
    const [remitente, setRemitente] = useState('');
    const [contenido, setContenido] = useState('');

    const enviarMensaje = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación de campos vacíos
        if (!remitente.trim() || !contenido.trim()) {
            toast.error('Por favor, completa todos los campos.');
            return;
        }

        const { error } = await supabase
            .from('mensajes_contacto')
            .insert([{ remitente, contenido }]);

        if (error) {
            toast.error('Error al enviar el mensaje. Intenta de nuevo.');
            console.error(error);
        } else {
            toast.success('¡Mensaje enviado con éxito! 🎸');
            setRemitente('');
            setContenido('');
        }
    };

    return (
        <>
            <Toaster position="bottom-center" reverseOrder={false} />
            <form onSubmit={enviarMensaje} className="max-w-md mx-auto flex flex-col gap-4 px-4">
                <input
                    type="text"
                    value={remitente}
                    onChange={(e) => setRemitente(e.target.value)}
                    placeholder="Nombre o Productora"
                    className="p-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-red-500 transition-colors"
                />
                <textarea
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    placeholder="Escribe tu mensaje a la página..."
                    rows={4}
                    className="p-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                    type="submit"
                    className="bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition-colors duration-300"
                >
                    ENVIAR MENSAJE
                </button>
            </form>
        </>
    );
}