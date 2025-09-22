import { useState } from "react";

export default function SearchBar({ riceviCitta }) {
  const [input, setInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  function handleChange(e) {
    setInput(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    setIsSearching(true);
    await riceviCitta(input.trim());
    setIsSearching(false);
    setInput("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 max-w-md mx-auto border border-white/50 mb-8">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            🌍 Meteo
          </h2>
          <p className="text-slate-600">Scopri il meteo in qualsiasi città</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              disabled={isSearching}
              className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50 text-slate-800 placeholder-slate-500 transition-all duration-300 disabled:opacity-50"
              placeholder="Es: Milano, Roma, Parigi..."
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isSearching}
            className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isSearching ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Cerca...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-lg">🔍</span>
                <span>Cerca</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
