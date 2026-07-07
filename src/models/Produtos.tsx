import React, { useState } from 'react';

interface ModalProdutoProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalProduto({ isOpen, onClose }: ModalProdutoProps) {
  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    estoque: '',
    foto: '',
    categoria: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setProduto((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Produto Cadastrado:", produto);

    setProduto({ nome: '', preco: '', estoque: '', foto: '', categoria: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden">

        <div className="bg-emerald-800 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Cadastrar Novo Produto</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-emerald-200 text-2xl font-semibold focus:outline-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label htmlFor="nome" className="text-slate-700 font-medium text-sm">
              Nome do Produto
            </label>
            <input
              type="text"
              id="nome"
              placeholder="Ex: Paracetamol 500mg"
              value={produto.nome}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="preco" className="text-slate-700 font-medium text-sm">
                Preço (R$)
              </label>
              <input
                type="number"
                id="preco"
                step="0.01"
                placeholder="0.00"
                value={produto.preco}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="estoque" className="text-slate-700 font-medium text-sm">
                Estoque (Qtd.)
              </label>
              <input
                type="number"
                id="estoque"
                placeholder="Ex: 50"
                value={produto.estoque}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="categoria" className="text-slate-700 font-medium text-sm">
              Categoria
            </label>
            <select
              id="categoria"
              value={produto.categoria}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800 bg-white focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              required
            >
              <option value="" disabled hidden>Selecione uma categoria</option>
              <option value="1">Analgésicos</option>
              <option value="2">Cosméticos</option>
              <option value="3">Suplementos</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="foto" className="text-slate-700 font-medium text-sm">
              URL da Imagem do Produto
            </label>
            <input
              type="text"
              id="foto"
              placeholder="https://exemplo.com/imagem.png"
              value={produto.foto}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
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
              Cadastrar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default ModalProduto;