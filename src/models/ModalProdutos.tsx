import React, { useState, useEffect } from 'react';
import { createProduto, getCategorias } from '../services/Service';

interface ModalProdutoProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalProduto({ isOpen, onClose }: ModalProdutoProps) {
  const [carregando, setCarregando] = useState(false);
  const [categoriasBanco, setCategoriasBanco] = useState<any[]>([]);

  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    estoque: '',
    foto: '',
    categoriaId: ''
  });

  useEffect(() => {
    if (isOpen) {
      getCategorias()
        .then(dados => setCategoriasBanco(dados))
        .catch(erro => console.error("Erro ao carregar categorias no select:", erro));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setProduto((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    const produtoFormatado = {
      nome: produto.nome,
      descricao: produto.nome,
      preco: parseFloat(produto.preco),
      foto: produto.foto || "https://i.imgur.com/b7wVo2b.png",
      quantidade: parseInt(produto.estoque),
      laboratorio: "Geral",
      categoria: {
        id: parseInt(produto.categoriaId)
      }
    };

    try {
      await createProduto(produtoFormatado);
      alert('Produto cadastrado com sucesso!');
      setProduto({ nome: '', preco: '', estoque: '', foto: '', categoriaId: '' });
      onClose();
      window.location.reload();
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.error("Erro completo do Servidor:", error.response.data);
      } else {
        console.error("Erro na requisição:", error);
      }
      alert('Erro ao cadastrar o produto. Verifique se os campos obrigatórios estão corretos.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="bg-emerald-800 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Cadastrar Novo Produto</h3>
          <button onClick={onClose} className="text-white text-2xl font-semibold">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-slate-700 font-medium text-sm">Nome do Produto</label>
            <input
              type="text"
              id="nome"
              placeholder="Ex: Paracetamol 500mg"
              value={produto.nome}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800"
              required
              disabled={carregando}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-slate-700 font-medium text-sm">Preço (R$)</label>
              <input
                type="number"
                id="preco"
                step="0.01"
                placeholder="0.00"
                value={produto.preco}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800"
                required
                disabled={carregando}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-slate-700 font-medium text-sm">Estoque (Qtd.)</label>
              <input
                type="number"
                id="estoque"
                placeholder="Ex: 50"
                value={produto.estoque}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800"
                required
                disabled={carregando}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-700 font-medium text-sm">Categoria</label>
            <select
              id="categoriaId"
              value={produto.categoriaId}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800 bg-white"
              required
              disabled={carregando}
            >
              <option value="" disabled hidden>Selecione uma categoria</option>
              {categoriasBanco.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.descricao || cat.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-700 font-medium text-sm">URL da Imagem</label>
            <input
              type="text"
              id="foto"
              placeholder="https://exemplo.com/imagem.png"
              value={produto.foto}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded px-3 py-2 text-slate-800"
              disabled={carregando}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-slate-600 border border-slate-300 hover:bg-slate-100"
              disabled={carregando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-emerald-800 text-white font-medium hover:bg-emerald-700 disabled:bg-slate-400"
              disabled={carregando}
            >
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalProduto;