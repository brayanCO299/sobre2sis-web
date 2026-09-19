import React from 'react';
import PanelAdmin from '../components/PanelAdmin';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
    return (
        <main className="min-h-screen pt-36 pb-20 px-4 bg-gradient-to-b from-gray-900 to-black">
            <h1 className="text-4xl font-black text-center text-red-600 mb-8 tracking-wide uppercase">
                Zona de Administración
            </h1>
            <PanelAdmin />
        </main>
    );
}