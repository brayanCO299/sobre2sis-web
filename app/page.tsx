import React from 'react';

export default function InicioSobredosis() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center py-24 bg-gradient-to-b from-gray-900 to-black">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-red-600 mb-4">
          SOBRE2SIS
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 uppercase tracking-widest text-center px-4">
          El Rock No Muere. Se Transforma.
        </p>
      </header>

      {/* Próximo Evento */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center border-t border-gray-800">
        <h2 className="text-4xl font-bold mb-8 text-white">PRÓXIMO EVENTO</h2>
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
          <div className="h-64 bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500 font-bold">[Foto del Evento Dinámica (Backend)]</span>
          </div>
          <div className="p-8">
            <h3 className="text-3xl font-bold text-red-500 mb-2">Concierto en Bagua</h3>
            <p className="text-gray-400 mb-6 text-lg">
              Fecha: Sábado, 15 de Octubre | Lugar: Plaza Principal
            </p>
            <p className="text-gray-300 mb-8">
              ¡Prepárense para la mejor descarga de rock de la ciudad! Presentando temas nuevos y los clásicos de siempre.
            </p>
            <button className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition">
              AGENDAR RESERVA
            </button>
          </div>
        </div>
      </section>

      {/* Contacto Rápido */}
      <section className="py-16 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-6">CONTACTO Y MENSAJES</h2>
        <form className="max-w-md mx-auto flex flex-col gap-4 px-4">
          <input 
            type="text" 
            placeholder="Nombre o Productora" 
            className="p-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-red-500"
          />
          <textarea 
            placeholder="Escribe tu mensaje a la página..." 
            rows={4}
            className="p-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:border-red-500"
          />
          <button 
            type="button" 
            className="bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition"
          >
            ENVIAR MENSAJE
          </button>
        </form>
      </section>
    </main>
  );
}