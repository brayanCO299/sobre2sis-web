import React from 'react';
import ClubFans from '../components/ClubFans';

export default function FansPage() {
    return (
        <main className="min-h-screen pt-36 pb-20 px-4 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
            <h1 className="text-5xl font-black text-center text-red-600 mb-12 tracking-wide uppercase drop-shadow-lg">Fan Destacado</h1>
            <ClubFans />
        </main>
    );
}