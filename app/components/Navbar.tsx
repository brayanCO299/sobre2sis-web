"use client";
import React, { useState } from 'react';

export default function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <a href="/" className="text-red-600 font-black text-2xl tracking-tighter z-50 relative">
                    SOBRE2SIS
                </a>

                {/* Botón Hamburguesa para celulares */}
                <button
                    className="md:hidden text-white z-50 p-2 text-2xl relative"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    {menuAbierto ? '✕' : '☰'}
                </button>

                {/* Enlaces del menú (Pantalla completa en móvil, fila normal en PC) */}
                <div className={`${menuAbierto ? 'flex' : 'hidden'} md:flex flex-col md:flex-row fixed md:relative top-0 left-0 w-full md:w-auto h-screen md:h-auto bg-black md:bg-transparent items-center justify-center gap-8 font-bold text-xl md:text-sm tracking-widest text-gray-300 transition-all z-40`}>
                    <a href="/" onClick={() => setMenuAbierto(false)} className="hover:text-white transition-colors">INICIO</a>
                    <a href="/#fotos" onClick={() => setMenuAbierto(false)} className="hover:text-white transition-colors">FOTOS</a>
                    <a href="/reels" onClick={() => setMenuAbierto(false)} className="hover:text-white transition-colors">REELS</a>
                    <a href="/muro" onClick={() => setMenuAbierto(false)} className="hover:text-white transition-colors">MURO</a>
                    <a href="/fans" onClick={() => setMenuAbierto(false)} className="hover:text-white transition-colors text-red-500">CLUB DE FANS</a>
                    <a href="/contacto" onClick={() => setMenuAbierto(false)} className="hover:text-white transition-colors">CONTACTO</a>
                </div>
            </div>
        </nav>
    );
}