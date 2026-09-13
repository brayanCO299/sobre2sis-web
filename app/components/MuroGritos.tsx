"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export default function MuroGritos() {
    const [mensajes, setMensajes] = useState<any[]>([]);
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('');

    const cargarMensajes = async () => {
        const { data } = await supabase
            .from('muro_gritos')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);
        if (data) setMensajes(data);
    };

    useEffect(() => {
        cargarMensajes();
    }, []);

    const enviarGrito = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim() || !mensaje.trim()) {
            toast.error('Llena todos los campos para gritar 🤘');
            return;
        }

        const { error } = await supabase.from('muro_gritos').insert([{ nombre, mensaje }]);

        if (error) {
            toast.error('Error al enviar el mensaje.');
        } else {
            toast.success('¡Grito publicado!');
            setNombre('');
            setMensaje('');
            cargarMensajes();
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <form onSubmit={enviarGrito} className="mb-12 max-w-xl mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-2xl">
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu Apodo Rockero"
                    className="w-full mb-4 p-3 bg-black border border-gray-700 rounded text-white focus:border-red-500 outline-none"
                    maxLength={30}
                />
                <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="¡Deja tu mensaje, pide un tema o apoya a la banda!"
                    className="w-full mb-4 p-3 bg-black border border-gray-700 rounded text-white focus:border-red-500 outline-none"
                    rows={3}
                    maxLength={150}
                />
                <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition">
                    GRITAR AHORA
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mensajes.map((msg, index) => (
                    <div key={msg.id} className={`p-6 bg-black border border-gray-800 rounded-lg shadow-lg transform transition hover:scale-105 ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                        <p className="text-gray-300 italic mb-4">"{msg.mensaje}"</p>
                        <p className="text-red-500 font-bold text-right">- {msg.nombre}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}