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
    const [evImagenUrl, setEvImagenUrl] = useState('');

    // Estados para Fotos y Reels
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaDesc, setMediaDesc] = useState('');

    // Estado unificado para el archivo físico (si el usuario elige subir desde su PC/Celular)
    const [archivoFisico, setArchivoFisico] = useState<File | null>(null);

    const iniciarSesion = (e: React.FormEvent) => {
        e.preventDefault();
        if (clave === 'SobredosisAdmin') {
            setAutenticado(true);
            toast.success('¡Bienvenido al panel, admin!');
        } else {
            toast.error('Contraseña incorrecta');
        }
    };

    // Función maestra para subir el archivo a Supabase Storage
    const subirArchivoStorage = async (file: File, carpeta: string) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${carpeta}/${Date.now()}.${fileExt}`;

        const { data, error } = await supabase.storage.from('media').upload(fileName, file);
        if (error) throw new Error(`Error al subir archivo: ${error.message}`);

        // Obtener la URL pública del archivo recién subido
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(fileName);
        return urlData.publicUrl;
    };

    const publicarEvento = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!evImagenUrl && !archivoFisico) {
            toast.error('Debes subir una imagen o colocar una URL');
            return;
        }

        setCargando(true);
        try {
            let urlFinal = evImagenUrl;

            // Si el usuario seleccionó un archivo físico, lo subimos primero
            if (archivoFisico) {
                toast('Subiendo imagen al servidor...', { icon: '⏳' });
                urlFinal = await subirArchivoStorage(archivoFisico, 'eventos');
            }

            const { error } = await supabase.from('eventos').insert([{
                titulo: evTitulo, fecha: evFecha, lugar: evLugar, descripcion: evDesc, imagen_url: urlFinal
            }]);

            if (error) throw error;

            toast.success('¡Evento publicado con éxito!');
            setEvTitulo(''); setEvFecha(''); setEvLugar(''); setEvDesc(''); setEvImagenUrl(''); setArchivoFisico(null);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setCargando(false);
        }
    };

    const publicarMedia = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mediaUrl && !archivoFisico) {
            toast.error('Debes subir un archivo o colocar una URL');
            return;
        }

        setCargando(true);
        try {
            let urlFinal = mediaUrl;
            const carpeta = pestana === 'foto' ? 'galeria' : 'reels';

            // Si hay archivo físico, lo subimos primero
            if (archivoFisico) {
                toast(`Subiendo ${pestana} al servidor...`, { icon: '⏳' });
                urlFinal = await subirArchivoStorage(archivoFisico, carpeta);
            }

            const tabla = pestana === 'foto' ? 'galeria' : 'reels';
            const datos = pestana === 'foto'
                ? { foto_url: urlFinal, descripcion: mediaDesc }
                : { video_url: urlFinal, titulo: mediaDesc, activo: true };

            const { error } = await supabase.from(tabla).insert([datos]);

            if (error) throw error;

            toast.success(`¡${pestana === 'foto' ? 'Foto' : 'Reel'} publicado con éxito!`);
            setMediaUrl(''); setMediaDesc(''); setArchivoFisico(null);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setCargando(false);
        }
    };

    // Resetea el archivo seleccionado al cambiar de pestaña
    const cambiarPestana = (nuevaPestana: string) => {
        setPestana(nuevaPestana);
        setArchivoFisico(null);
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
                <button type="button" onClick={() => cambiarPestana('evento')} className={`font-bold px-4 py-2 rounded ${pestana === 'evento' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}>NUEVO EVENTO</button>
                <button type="button" onClick={() => cambiarPestana('foto')} className={`font-bold px-4 py-2 rounded ${pestana === 'foto' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}>SUBIR FOTO</button>
                <button type="button" onClick={() => cambiarPestana('reel')} className={`font-bold px-4 py-2 rounded ${pestana === 'reel' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'}`}>SUBIR REEL</button>
            </div>

            {/* ZONA DE CARGA DE ARCHIVO (Común para todas las pestañas) */}
            <div className="mb-6 bg-black p-4 rounded-lg border border-gray-700">
                <label className="block text-gray-400 text-sm font-bold mb-3 uppercase tracking-wider">
                    Opción 1: Subir desde el equipo (Recomendado)
                </label>
                <input
                    type="file"
                    accept={pestana === 'reel' ? 'video/mp4,video/x-m4v,video/*' : 'image/*'}
                    onChange={(e) => setArchivoFisico(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-bold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
                />
                <p className="text-center text-gray-600 font-black my-3">- O -</p>
                <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">
                    Opción 2: Pegar URL de internet
                </label>
                <input
                    type="url"
                    value={pestana === 'evento' ? evImagenUrl : mediaUrl}
                    onChange={e => pestana === 'evento' ? setEvImagenUrl(e.target.value) : setMediaUrl(e.target.value)}
                    placeholder="Ej: https://misitio.com/imagen.jpg"
                    className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
                    disabled={archivoFisico !== null}
                />
                {archivoFisico && <p className="text-xs text-green-500 mt-2">Archivo local seleccionado. La URL externa será ignorada.</p>}
            </div>

            {pestana === 'evento' && (
                <form onSubmit={publicarEvento} className="flex flex-col gap-4">
                    <input type="text" value={evTitulo} onChange={e => setEvTitulo(e.target.value)} placeholder="Título del Evento (Ej. Tributo 80s)" className="p-3 bg-black border border-gray-700 rounded text-white" required />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" value={evFecha} onChange={e => setEvFecha(e.target.value)} className="p-3 bg-black border border-gray-700 rounded text-white" required />
                        <input type="text" value={evLugar} onChange={e => setEvLugar(e.target.value)} placeholder="Lugar (Ej. NATIVA)" className="p-3 bg-black border border-gray-700 rounded text-white" required />
                    </div>
                    <textarea value={evDesc} onChange={e => setEvDesc(e.target.value)} placeholder="Descripción del evento..." className="p-3 bg-black border border-gray-700 rounded text-white" rows={3} required />
                    <button type="submit" disabled={cargando} className={`font-bold py-3 rounded mt-2 transition-colors ${cargando ? 'bg-red-900 text-gray-400' : 'bg-red-600 hover:bg-red-700 text-white'}`}>{cargando ? 'PROCESANDO...' : 'PUBLICAR EVENTO'}</button>
                </form>
            )}

            {(pestana === 'foto' || pestana === 'reel') && (
                <form onSubmit={publicarMedia} className="flex flex-col gap-4">
                    <input type="text" value={mediaDesc} onChange={e => setMediaDesc(e.target.value)} placeholder={pestana === 'foto' ? 'Descripción de la foto' : 'Título del Reel'} className="p-3 bg-black border border-gray-700 rounded text-white" required />
                    <button type="submit" disabled={cargando} className={`font-bold py-3 rounded mt-2 transition-colors ${cargando ? 'bg-red-900 text-gray-400' : 'bg-red-600 hover:bg-red-700 text-white'}`}>{cargando ? 'PROCESANDO...' : `PUBLICAR ${pestana.toUpperCase()}`}</button>
                </form>
            )}
        </div>
    );
}