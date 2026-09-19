"use client";
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export default function PanelAdmin() {
    const [autenticado, setAutenticado] = useState(false);
    const [clave, setClave] = useState('');
    const [pestana, setPestana] = useState('evento');
    const [cargando, setCargando] = useState(false);

    // Estados para Eventos
    const [evTitulo, setEvTitulo] = useState('');
    const [evFecha, setEvFecha] = useState('');
    const [evLugar, setEvLugar] = useState('');
    const [evDesc, setEvDesc] = useState('');
    const [evImagen, setEvImagen] = useState('');

    // Estados para Fotos y Reels
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaDesc, setMediaDesc] = useState('');

    const iniciarSesion = (e: React.FormEvent) => {
        e.preventDefault();
        // Cambia "SobredosisAdmin" por la contraseña que quieras usar
        if (clave === 'SobredosisAdmin') {
            setAutenticado(true);
            toast.success('¡Bienvenido al panel, admin!');
        } else {
            toast.error('Contraseña incorrecta');
        }
    };

    const publicarEvento = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);
        const { error } = await supabase.from('eventos').insert([{
            titulo: evTitulo, fecha: evFecha, lugar: evLugar, descripcion: evDesc, imagen_url: evImagen
        }]);

        if (error) toast.error(`Error: ${error.message}`);
        else {
            toast.success('Evento publicado');
            setEvTitulo(''); setEvFecha(''); setEvLugar(''); setEvDesc(''); setEvImagen('');
        }
        setCargando(false);
    };

    const publicarMedia = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);

        const tabla = pestana === 'foto' ? 'galeria' : 'reels';
        const datos = pestana === 'foto'
            ? { foto_url: mediaUrl, descripcion: mediaDesc }
            : { video_url: mediaUrl, titulo: mediaDesc, activo: true };

        const { error } = await supabase.from(tabla).insert([datos]);

        if (error) toast.error(`Error: ${error.message}`);
        else {
            toast.success(`${pestana === 'foto' ? 'Foto' : 'Reel'} publicado con éxito`);
            setMediaUrl(''); setMediaDesc('');
        }
        setCargando(false);
    };

    if (!autenticado) {
        return (
            <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-xl border border-gray-800 text-center">
                <h2 className="text-2xl font-black mb-6">ACCESO RESTRINGIDO</h2>
                <form onSubmit={iniciarSesion}>
                    <input
                        type="password"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        placeholder="Contraseña de Administrador"
                        className="w-full mb-4 p-3 bg-black border border-gray-700 rounded text-white text-center"
                    />
                    <button type="submit" className="w-full bg-red-600 font-bold py-3 rounded hover:bg-red-700">ENTRAR</button>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto bg-gray-900 p-6 md:p-10 rounded-xl border border-gray-800">
            <div className="flex gap-4 mb-8 border-b border-gray-700 pb-4 overflow-x-auto">
                <button onClick={() => setPestana('evento')} className={`font-bold px-4 py-2 rounded ${pestana === 'evento' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}>NUEVO EVENTO</button>
                <button onClick={() => setPestana('foto')} className={`font-bold px-4 py-2 rounded ${pestana === 'foto' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}>SUBIR FOTO</button>
                <button onClick={() => setPestana('reel')} className={`font-bold px-4 py-2 rounded ${pestana === 'reel' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}>SUBIR REEL</button>
            </div>

            {pestana === 'evento' && (
                <form onSubmit={publicarEvento} className="flex flex-col gap-4">
                    <input type="text" value={evTitulo} onChange={e => setEvTitulo(e.target.value)} placeholder="Título del Evento (Ej. Tributo 80s)" className="p-3 bg-black border border-gray-700 rounded text-white" required />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" value={evFecha} onChange={e => setEvFecha(e.target.value)} className="p-3 bg-black border border-gray-700 rounded text-white" required />
                        <input type="text" value={evLugar} onChange={e => setEvLugar(e.target.value)} placeholder="Lugar (Ej. NATIVA)" className="p-3 bg-black border border-gray-700 rounded text-white" required />
                    </div>
                    <input type="url" value={evImagen} onChange={e => setEvImagen(e.target.value)} placeholder="URL de la imagen del banner" className="p-3 bg-black border border-gray-700 rounded text-white" />
                    <textarea value={evDesc} onChange={e => setEvDesc(e.target.value)} placeholder="Descripción del evento..." className="p-3 bg-black border border-gray-700 rounded text-white" rows={3} required />
                    <button type="submit" disabled={cargando} className="bg-red-600 font-bold py-3 rounded hover:bg-red-700 mt-2">{cargando ? 'PUBLICANDO...' : 'PUBLICAR EVENTO'}</button>
                </form>
            )}

            {(pestana === 'foto' || pestana === 'reel') && (
                <form onSubmit={publicarMedia} className="flex flex-col gap-4">
                    <input type="url" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder={`URL del ${pestana === 'foto' ? 'link de la imagen' : 'video (mp4)'}`} className="p-3 bg-black border border-gray-700 rounded text-white" required />
                    <input type="text" value={mediaDesc} onChange={e => setMediaDesc(e.target.value)} placeholder={pestana === 'foto' ? 'Descripción de la foto' : 'Título del Reel'} className="p-3 bg-black border border-gray-700 rounded text-white" required />
                    <button type="submit" disabled={cargando} className="bg-red-600 font-bold py-3 rounded hover:bg-red-700 mt-2">{cargando ? 'PUBLICANDO...' : `PUBLICAR ${pestana.toUpperCase()}`}</button>
                </form>
            )}
        </div>
    );
}