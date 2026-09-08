import React from 'react';
import { supabase } from './lib/supabase';
import FormularioContacto from './components/FormularioContacto';

// Fuerza a Vercel a consultar la base de datos en tiempo real
export const revalidate = 0; 

export default async function InicioSobredosis() {
  // Consultar el evento más cercano en Supabase
  const { data: eventos } = await supabase
    .from('eventos')
    .select('*')
    .order('fecha', { ascending: true })
    .limit(1);

  const evento = eventos?.[0];

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <header className="flex flex-col items-center justify-center py-24 bg-gradient-to-b from-gray-900 to-black">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-red-600 mb-4">
          SOBRE2SIS
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 uppercase tracking-widest text-center px-4">
          El Rock No Muere. Se Transforma.
        </p>
      </header>

      <section className="py-16 px-4 max-w-4xl mx-auto text-center border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-8 text-white">PRÓXIMO EVENTO</h2>
        
        {evento ? (
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
            <div 
              className="h-64 bg-gray-800 flex items-center justify-center bg-cover bg-center" 
              style={{ backgroundImage: `url(${evento.imagen_url || ''})` }}
            >
              {!evento.imagen_url && <span className="text-gray-500 font-bold">[FOTO DEL EVENTO]</span>}
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold text-red-500 mb-2">{evento.titulo}</h3>
              <p className="text-gray-400 mb-6 text-lg">
                Fecha: {evento.fecha} | Lugar: {evento.lugar}
              </p>
              <p className="text-gray-300 mb-8">{evento.descripcion}</p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition">
                AGENDAR RESERVA
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-xl font-bold">Pronto anunciaremos nuevas fechas...</p>
        )}
      </section>

      {/* Contacto Rápido */}
      <section className="py-16 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">CONTACTO Y MENSAJES</h2>
        <FormularioContacto />
      </section>
    </main>
  );
}