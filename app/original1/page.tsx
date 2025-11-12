"use client";
import { useState } from "react";

export default function Original1() {
  const [numeroSecreto] = useState(() => generarNumero());
  const [intento, setIntento] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [intentos, setIntentos] = useState<string[]>([]);

function generarNumero() {
  const digitos: number[] = [];
  while (digitos.length < 3) {
    const num = Math.floor(Math.random() * 9) + 1;
    if (!digitos.includes(num)) digitos.push(num);
  }
  return digitos.join("");
}

  function verificar() {
    if (intento.length !== 3) return setMensaje("Debe tener 3 cifras distintas");

    let picas = 0;
    let fijas = 0;
    for (let i = 0; i < 3; i++) {
      if (intento[i] === numeroSecreto[i]) fijas++;
      else if (numeroSecreto.includes(intento[i])) picas++;
    }

    const resultado = `${intento} → ${picas} pica(s), ${fijas} fija(s)`;
    setIntentos([resultado, ...intentos]);

    if (fijas === 3) setMensaje(`🎉 ¡Adivinaste el número ${numeroSecreto}!`);
    else setMensaje(`Intento registrado.`);
    setIntento("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <h1 className="text-4xl font-bold text-blue-400 mb-4">🎯 Picas y Fijas</h1>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <input
          type="text"
          value={intento}
          onChange={(e) => setIntento(e.target.value)}
          className="p-3 rounded w-full mb-3"
          placeholder="Escribe un número de 3 cifras"
          maxLength={3}
        />
        <button
          onClick={verificar}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 w-full"
        >
          Verificar intento
        </button>
        <p className="text-center text-sm text-gray-300 mt-3">{mensaje}</p>
      </div>

      <div className="mt-6 w-full max-w-md">
        <h2 className="text-lg text-blue-300 mb-2">Historial:</h2>
        <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 max-h-64 overflow-y-auto">
          {intentos.length === 0 && (
            <p className="text-gray-500 text-sm">Aún no hay intentos...</p>
          )}
          {intentos.map((i, idx) => (
            <p key={idx} className="border-b border-gray-700 py-1">
              {i}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
