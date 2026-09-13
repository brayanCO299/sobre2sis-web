import React from 'react';
import MuroGritos from '../components/MuroGritos';

export const revalidate = 0;

export default function MuroPage() {
    return (
        <main className="min-h-screen pt-36 pb-20 px-4 bg-gradient-to-b from-gray-900 to-black">
            <h1 className="text-5xl font-black text-center text-white mb-4 tracking-wide uppercase drop-shadow-md">
                Muro de <span className="text-red-600">Gritos</span>
            </h1>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                El espacio exclusivo para que los fans dejen su marca.
            </p>
            <MuroGritos />
        </main>
    );
}