import React from 'react';
import Reels from '../components/Reels';

export const revalidate = 0;

export default function ReelsPage() {
    return (
        <main className="min-h-screen pt-36 pb-20 px-4 bg-gradient-to-b from-gray-900 to-black">
            <h1 className="text-5xl font-black text-center text-white mb-12 tracking-wide uppercase drop-shadow-md">
                Galería de <span className="text-red-600">Reels</span>
            </h1>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                Toca cualquier video para encender el rock 🔊
            </p>

            {/* Contenedor principal de la galería */}
            <Reels />
        </main>
    );
}