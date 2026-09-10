import React from 'react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <span className="text-red-600 font-black text-2xl tracking-tighter cursor-pointer">
                    <a href="#">SOBRE2SIS</a>
                </span>
                <div className="hidden md:flex gap-8 font-bold text-sm tracking-widest text-gray-300">
                    <a href="#eventos" className="hover:text-white transition-colors">EVENTOS</a>
                    <a href="#fotos" className="hover:text-white transition-colors">FOTOS</a>
                    <a href="#reels" className="hover:text-white transition-colors">REELS</a>
                    <a href="#contacto" className="hover:text-white transition-colors">CONTACTO</a>
                </div>
            </div>
        </nav>
    );
}