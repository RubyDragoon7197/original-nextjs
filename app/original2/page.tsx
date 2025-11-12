"use client";

import React, { useState, useEffect } from "react";

const JuegoReaccion = () => {
  const [color, setColor] = useState("white");
  const [mensaje, setMensaje] = useState("⚡ Espera el color verde...");
  const [tiempoInicio, setTiempoInicio] = useState<number | null>(null);
  const [tiempoReaccion, setTiempoReaccion] = useState<number | null>(null);
  const [bloqueado, setBloqueado] = useState(false); // evita clics múltiples

  useEffect(() => {
    iniciarJuego();
  }, []);

  const iniciarJuego = () => {
    setBloqueado(false);
    setColor("white");
    setMensaje("⚡ Espera el color verde...");
    setTiempoReaccion(null);

    const tiempoAleatorio = Math.random() * 2000 + 1000; // entre 1 y 3 segundos
    setTimeout(() => {
      setColor("green");
      setTiempoInicio(Date.now());
      setMensaje("✅ ¡Haz clic ahora!");
    }, tiempoAleatorio);
  };

  const handleClick = () => {
    if (bloqueado) return;

    if (color === "green" && tiempoInicio) {
      const tiempo = Date.now() - tiempoInicio;
      setTiempoReaccion(tiempo);
      setMensaje(`⏱ Tu tiempo de reacción: ${tiempo} ms`);
      setColor("white");
      setBloqueado(true);
    } else if (color === "white") {
      setMensaje("❌ Te adelantaste. Intenta de nuevo.");
      setBloqueado(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-6">
      <h1 className="text-4xl font-bold text-white mb-4">⚡ Juego de Reacción</h1>

      {/* Cuadro principal */}
      <div
        onClick={handleClick}
        className="w-[250px] h-[250px] border-4 border-gray-300 rounded-lg transition-colors duration-300 cursor-pointer"
        style={{ backgroundColor: color }}
      ></div>

      {/* Mensajes */}
      <div className="mt-4">
        <p className="text-lg text-gray-200">{mensaje}</p>
        {tiempoReaccion && (
          <p className="text-green-400 mt-2 text-lg">
            ⏱ Tiempo: {tiempoReaccion} ms
          </p>
        )}
      </div>

      {/* Botón de reiniciar */}
      <button
        onClick={iniciarJuego}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
      >
        🔄 Reiniciar
      </button>
    </div>
  );
};

export default JuegoReaccion;
