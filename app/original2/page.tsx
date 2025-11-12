"use client";
import { useState } from "react";

export default function Original2() {
  const [color, setColor] = useState("red");
  const [tiempoInicio, setTiempoInicio] = useState<number | null>(null);
  const [resultado, setResultado] = useState("");
  const [activo, setActivo] = useState(false);

  function iniciarJuego() {
    setResultado("");
    setActivo(true);
    setColor("red");
    const espera = Math.random() * 3000 + 1000;
    setTimeout(() => {
      setColor("green");
      setTiempoInicio(performance.now());
    }, espera);
  }

  function manejarClick() {
    if (!activo) return;
    if (color === "green" && tiempoInicio) {
      const tiempo = performance.now() - tiempoInicio;
      setResultado(`⏱️ Reacción: ${tiempo.toFixed(0)} ms`);
      setActivo(false);
    } else if (color === "red") {
      setResultado("❌ ¡Muy rápido! Espera que se ponga verde.");
      setActivo(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4">
      <h1 className="text-4xl font-bold text-green-400">⚡ Juego de Reacción</h1>

      <div
        onClick={manejarClick}
        className={`w-64 h-64 rounded-xl shadow-2xl border-4 cursor-pointer transition-colors duration-200 ${
          color === "red" ? "bg-red-600 border-red-800" : "bg-green-500 border-green-700"
        }`}
      ></div>

      {!activo && (
        <button
          onClick={iniciarJuego}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3"
        >
          Iniciar
        </button>
      )}

      <p className="text-xl text-gray-300 font-medium">{resultado}</p>
    </div>
  );
}
