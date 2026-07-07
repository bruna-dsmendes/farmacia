import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ModalCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  categoriaParaEditar?: any;
}

function ModalCategoria({ isOpen, onClose, categoriaParaEditar }: ModalCategoriaProps) {
  const [nome, setNome] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (categoriaParaEditar) {
        setNome(categoriaParaEditar.descricao || categoriaParaEditar.nome || '');
      } else {
        setNome('');
      }
    }
  }, [isOpen, categoriaParaEditar]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    const dadosCategoria: any = {
      nome: nome,
      descricao: nome
    };

    try {
      if (categoriaParaEditar) {
        dadosCategoria.id = categoriaParaEditar.id;

        await axios.put('https://farmacia-jjxo.onrender.com/categorias', dadosCategoria);
        alert('Categoria atualizada com sucesso!');
      } else {
        await axios.post('https://farmacia-jjxo.onrender.com/categorias', dadosCategoria);
        alert('Categoria cadastrada com sucesso!');
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar a categoria. Verifique os campos ou o console.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-emerald-800 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold">
            {categoriaParaEditar ? 'Editar Categoria' : 'Cadastrar Categoria'}
          </h3>
          <button onClick={onClose} className="text-white text-2xl font-semibold">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-slate-700 font-medium text-sm">Nome da Categoria</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800 focus:border-emerald-600 focus:outline-none"
              required
              disabled={carregando}
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded text-slate-600 border border-slate-300 hover:bg-slate-100" disabled={carregando}>Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded bg-emerald-800 text-white font-medium hover:bg-emerald-700 disabled:bg-slate-400" disabled={carregando}>
              {carregando ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCategoria;