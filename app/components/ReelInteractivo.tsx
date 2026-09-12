"use client";
import React, { useRef, useState } from 'react';

export default function ReelInteractivo({ reel }: { reel: any }) {
    const [silenciado, setSilenciado] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const alternarSonido = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setSilenciado(videoRef.current.muted);
        }
    };

    return (
        <div
            className="relative w-full max-w-[320px] h-[568px] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 cursor-pointer group hover:shadow-red-900/40 transition-shadow duration-300 mx-auto"
            onClick={alternarSonido}
        >
            <video
                ref={videoRef}
                src={reel.video_url}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-5 pointer-events-none">
                <p className="text-white font-bold text-lg drop-shadow-md">{reel.titulo}</p>
            </div>

            {/* Indicador visual de sonido flotante */}
            <div className="absolute bottom-6 right-6 bg-black/70 p-4 rounded-full text-white backdrop-blur-md group-hover:scale-110 transition-transform">
                {silenciado ? '🔇' : '🔊'}
            </div>
        </div>
    );
}