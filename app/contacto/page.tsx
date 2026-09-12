import React from 'react';
import FormularioContacto from '../components/FormularioContacto';

export default function ContactoPage() {
    return (
        <main className="min-h-screen pt-36 pb-20 px-4 bg-gradient-to-b from-gray-900 to-black">
            <h1 className="text-5xl font-black text-center text-white mb-12 tracking-wide uppercase drop-shadow-md">Contacto y Contrataciones</h1>
            <FormularioContacto />
        </main>
    );
}