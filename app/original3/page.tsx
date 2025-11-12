export default function Original3() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Contáctanos</h1>
      <form className="w-full max-w-md bg-blue-50 p-8 rounded-2xl shadow">
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Nombre</span>
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Mensaje</span>
          <textarea
            placeholder="Escribe tu mensaje..."
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}
