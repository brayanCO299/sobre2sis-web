"use client";
import React, { useState } from 'react';

export default function LogoAnimado() {
    const [clics, setClics] = useState(0);
    const [explotando, setExplotando] = useState(false);

    const activarSecreto = () => {
        const nuevosClics = clics + 1;
        setClics(nuevosClics);

        if (nuevosClics === 5) {
            setExplotando(true);

            // Sonido de guitarra eléctrica de prueba
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
            audio.play().catch(() => console.log('El navegador bloqueó el audio automático'));

            setTimeout(() => {
                setExplotando(false);
                setClics(0);
            }, 1500); // Tiembla durante 1.5 segundos
        }
    };

    return (
        <h1
            onClick={activarSecreto}
            className={`text-6xl md:text-8xl font-black tracking-tighter text-red-600 mb-4 drop-shadow-lg cursor-pointer select-none transition-transform ${explotando ? 'animacion-temblor scale-110 text-white drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]' : ''}`}
            title="¿Qué pasa si haces clic 5 veces?"
        >
            SOBRE2SIS
        </h1>
    );
}