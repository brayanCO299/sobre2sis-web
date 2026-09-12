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
            className="min-w-[300px] w-[300px] h-[533px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl snap-center relative border border-gray-800 flex-shrink-0 cursor-pointer group"
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
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 pointer-events-none">
                <p className="text-white font-bold text-lg drop-shadow-md">{reel.titulo}</p>
            </div>
            {/* Indicador visual de sonido flotante */}
            <div className="absolute bottom-6 right-6 bg-black/70 p-3 rounded-full text-white backdrop-blur-sm group-hover:scale-110 transition-transform">
                {silenciado ? '🔇' : '🔊'}
            </div>
        </div>
    );
}