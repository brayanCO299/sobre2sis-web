import React from 'react';
import { supabase } from './lib/supabase';
import Reels from './components/Reels';
import Galeria from './components/Galeria';
import Countdown from './components/Countdown';
import SetlistInteractivo from './components/SetlistInteractivo';
import LogoAnimado from './components/LogoAnimado';

export const revalidate = 0; 

export default async function InicioSobredosis() {
  const { data: eventos } = await supabase.from('eventos').select('*').order('fecha', { ascending: true }).limit(1);
  const evento = eventos?.[0];

  return (
    <main className="overflow-x-hidden">
      <header className="flex flex-col items-center justify-center pt-32 pb-16 bg-gradient-to-b from-gray-900 to-black">
        <LogoAnimado />
        <p className="text-xl md:text-2xl text-gray-300 uppercase tracking-widest text-center px-4 font-light">
          El Rock No Muere. Se Transforma.
        </p>
      </header>


<section id="eventos" className="py-16 px-4 max-w-7xl mx-auto border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-10 text-white tracking-wide text-center">PRÓXIMO EVENTO</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Lado Izquierdo: Setlist Interactivo */}
          <SetlistInteractivo />

          {/* Lado Derecho: Lógica Automática de Tarjeta del Evento */}
          {evento && new Date(evento.fecha + 'T23:59:59') >= new Date() ? (
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 transition duration-500 hover:shadow-red-900/20 w-full text-center">
              <div className="h-72 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${evento.imagen_url || ''})` }} />
              <div className="p-8">
                <h3 className="text-3xl font-black text-red-500 mb-4">{evento.titulo}</h3>
                <p className="text-gray-300 text-lg font-medium tracking-wide">🗓️ {evento.fecha} | 📍 {evento.lugar}</p>
                <Countdown fechaEvento={evento.fecha} />
                <p className="text-gray-400 mb-8 text-base italic leading-relaxed">"{evento.descripcion}"</p>
                <a href={`https://wa.me/51945250393?text=¡Hola!%20Quiero%20reservar%20entradas%20para%20${evento.titulo}`} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors inline-block w-full md:w-auto">
                  AGENDAR RESERVA
                </a>
              </div>
            </div>
          ) : (
            /* Diseño Alternativo cuando el evento expiró o no hay evento */
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col items-center justify-center p-10 text-center min-h-[500px]">
              <div className="text-7xl mb-6 opacity-80">🎸</div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-300 mb-4 uppercase tracking-widest">Gira en Preparación</h3>
              <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
                Nuestros amplificadores están descansando por ahora. Afina tus guitarras porque pronto soltaremos nueva información.
              </p>
              <div className="w-full bg-black border border-gray-800 rounded-lg p-6 shadow-inner">
                <p className="text-sm md:text-base font-bold text-red-500 uppercase tracking-widest animate-pulse">
                  El próximo evento se estará publicando pronto...
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="fotos" className="py-16 max-w-6xl mx-auto text-center border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-10 text-white tracking-wide">NUESTRAS FOTOS</h2>
        <Galeria />
      </section>
    </main>
  );
}