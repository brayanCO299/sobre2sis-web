"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export default function ClubFans() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [totalFans, setTotalFans] = useState(0);
    const [yaEsFan, setYaEsFan] = useState(false);
    const [cargando, setCargando] = useState(false);

    // Carga inicial del contador y verificación del usuario
    useEffect(() => {
        const cargarDatos = async () => {
            // Cuenta cuántos registros hay en la tabla 'fans'
            const { count } = await supabase.from('fans').select('*', { count: 'exact', head: true });
            if (count !== null) setTotalFans(count);
        };

        cargarDatos();

        // Verifica si ya se registró desde este dispositivo
        if (localStorage.getItem('fan_sobre2sis')) {
            setYaEsFan(true);
        }
    }, []);

    const unirseAlClub = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim() || !email.trim()) {
            toast.error('Llena tus datos para unirte 🤘');
            return;
        }

        setCargando(true);
        // Asume que tu tabla 'fans' tiene las columnas 'nombre' y 'email'
        const { error } = await supabase.from('fans').insert([{ nombre, email }]);

        if (error) {
            toast.error('Hubo un error al registrarte. Intenta de nuevo.');
        } else {
            toast.success('¡Bienvenido al Club Oficial!');
            localStorage.setItem('fan_sobre2sis', 'true');
            setYaEsFan(true);
            setTotalFans(prev => prev + 1); // Suma visual instantánea
        }
        setCargando(false);
    };

    return (
        <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl mt-12 text-center">
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-wide">Club de Fans</h2>

            {/* Contador Dinámico */}
            <div className="my-6 inline-block bg-black border border-gray-700 px-6 py-3 rounded-full shadow-lg">
                <p className="text-gray-300 font-bold uppercase tracking-widest text-sm">
                    🔥 <span className="text-red-500 text-xl">{totalFans}</span> Rockeros Unidos
                </p>
            </div>

            {!yaEsFan ? (
                <>
                    <p className="text-gray-400 mb-8 text-sm md:text-base">Únete para enterarte primero de nuevas fechas, contenido exclusivo y sorpresas de SOBRE2SIS.</p>
                    <form onSubmit={unirseAlClub} className="flex flex-col gap-4 text-left">
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Tu Nombre / Apodo"
                            className="p-3 bg-black border border-gray-700 rounded text-white focus:border-red-500 outline-none w-full"
                            required
                        />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu Correo Electrónico"
                            className="p-3 bg-black border border-gray-700 rounded text-white focus:border-red-500 outline-none w-full"
                            required
                        />
                        <button
                            type="submit"
                            disabled={cargando}
                            className={`mt-4 font-black py-4 rounded transition-all tracking-widest ${cargando ? 'bg-red-900 text-gray-400' : 'bg-red-600 hover:bg-red-700 text-white hover:scale-[1.02]'}`}
                        >
                            {cargando ? 'PROCESANDO...' : 'UNIRME A LA LEGIÓN'}
                        </button>
                    </form>
                </>
            ) : (
                /* Tarjeta de Reconocimiento cuando ya es Fan */
                <div className="mt-4 p-8 bg-black rounded-xl border border-red-900/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-500 to-red-900"></div>
                    <h3 className="text-2xl font-black text-red-500 mb-2">¡YA ERES FAN OFICIAL!</h3>
                    <p className="text-gray-400">Tu lugar en la legión de SOBRE2SIS está asegurado. Gracias por apoyar a la banda, nos vemos en el mosh.</p>
                </div>
            )}
        </div>
    );
}