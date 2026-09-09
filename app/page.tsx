import React from 'react';
import { supabase } from './lib/supabase';
import FormularioContacto from './components/FormularioContacto';
import Reels from './components/Reels';
import Galeria from './components/Galeria';

export const revalidate = 0; 

export default async function InicioSobredosis() {
  const { data: eventos } = await supabase
    .from('eventos')
    .select('*')
    .order('fecha', { ascending: true })
    .limit(1);

  const evento = eventos?.[0];

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      
      <header className="flex flex-col items-center justify-center py-24 bg-gradient-to-b from-gray-900 to-black">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-red-600 mb-4 drop-shadow-lg">
          SOBRE2SIS
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 uppercase tracking-widest text-center px-4 font-light">
          El Rock No Muere. Se Transforma.
        </p>
      </header>

      <section className="py-16 px-4 max-w-4xl mx-auto text-center border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-10 text-white tracking-wide">PRÓXIMO EVENTO</h2>
        
        {evento ? (
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 hover:border-red-900/50 transition duration-500">
            <div 
              className="h-72 bg-gray-800 flex items-center justify-center bg-cover bg-center" 
              style={{ backgroundImage: `url(${evento.imagen_url || ''})` }}
            >
              {!evento.imagen_url && <span className="text-gray-500 font-bold">[FOTO DEL EVENTO]</span>}
            </div>
            <div className="p-10">
              <h3 className="text-4xl font-black text-red-500 mb-4">{evento.titulo}</h3>
              <p className="text-gray-300 mb-6 text-xl font-medium tracking-wide">
                🗓️ {evento.fecha} | 📍 {evento.lugar}
              </p>
              <p className="text-gray-400 mb-8 text-lg italic leading-relaxed">"{evento.descripcion}"</p>
              
              <a 
                href={`https://wa.me/51999999999?text=¡Hola!%20Quiero%20reservar%20entradas%20para%20${evento.titulo}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 inline-block shadow-lg shadow-red-600/30"
              >
                AGENDAR RESERVA
              </a>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-xl font-bold">Pronto anunciaremos nuevas fechas...</p>
        )}
      </section>

      <section className="py-16 max-w-6xl mx-auto text-center border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-10 text-white tracking-wide">NUESTRAS FOTOS</h2>
        <Galeria />
      </section>

      <section className="py-16 max-w-5xl mx-auto text-center border-t border-gray-800 overflow-hidden">
        <h2 className="text-4xl font-bold mb-10 text-white tracking-wide">REELS DE LA BANDA</h2>
        <Reels />
      </section>

      <section className="py-20 bg-gray-900 text-center border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-white tracking-wide">CONTACTO Y MENSAJES</h2>
        <FormularioContacto />
      </section>
    </main>
  );
}