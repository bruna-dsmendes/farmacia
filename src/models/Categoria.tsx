import React, { useState } from 'react';

interface ModalCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalCategoria({ isOpen, onClose }: ModalCategoriaProps) {
  const [nomeCategoria, setNomeCategoria] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Categoria Cadastrada:", nomeCategoria);

    setNomeCategoria('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">

        <div className="bg-emerald-800 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Nova Categoria</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-emerald-200 text-2xl font-semibold focus:outline-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="categoria" className="text-slate-700 font-medium text-sm">
              Nome da Categoria
            </label>
            <input
              type="text"
              id="categoria"
              placeholder="Ex: Analgésicos, Higiene, Suplementos..."
              value={nomeCategoria}
              onChange={(e) => setNomeCategoria(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-slate-600 border border-slate-300 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-emerald-800 text-white font-medium hover:bg-emerald-700 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default ModalCategoria;