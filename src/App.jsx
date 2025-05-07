import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Ylävalikko */}
      <nav className="bg-gray-800 px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-extrabold text-green-400 tracking-wide">FreeWo</h1>
        <div className="space-x-6">
          <button className="hover:text-green-300">Etusivu</button>
          <button className="hover:text-green-300">Toimeksiannot</button>
          <button className="hover:text-green-300">Freelancerit</button>
          <button className="hover:text-green-300">Kirjaudu</button>
        </div>
      </nav>

      {/* Hero-osio */}
      <section className="bg-green-100 text-gray-900 w-full py-20 px-6 text-center">
        <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Tervetuloa FreeWo-sivustolle!</h2>
        <p className="text-xl max-w-2xl mx-auto">
          Etsi ja luo toimeksiantoja helposti. Liity mukaan freelancerina tai asiakkaana – täysin maksutta!
        </p>
        <div className="mt-8 flex justify-center space-x-6">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">Rekisteröidy</button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition">Kirjaudu</button>
        </div>
      </section>

      {/* Esittelyosio */}
      <div className="px-6 py-12 max-w-4xl mx-auto space-y-12">
        <div>
          <h3 className="text-3xl font-bold mb-2">Toimeksiannot</h3>
          <p className="text-lg text-gray-400">Tutustu saatavilla oleviin toimeksiantoihin ja löydä sinulle sopiva työprojekti!</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-2">Freelancerit</h3>
          <p className="text-lg text-gray-400">Etsi lahjakkaita freelancereita eri kategorioista ja aloita yhteistyö helposti.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
