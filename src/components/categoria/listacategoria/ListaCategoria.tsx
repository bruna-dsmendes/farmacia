import { useState, useEffect } from 'react';
import axios from 'axios';
import CardCategoria from '../cardcategoria/CardCategoria';
import ModalCategoria from '../../../models/ModalCategoria';

function ListaCategorias() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<any>(null);

  async function buscarCategorias() {
    try {
      setCarregando(true);
      const resposta = await axios.get('https://farmacia-jjxo.onrender.com/categorias');
      setCategorias(resposta.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  const handleEditar = (cat: any) => {
    setCategoriaSelecionada(cat);
    setIsModalOpen(true);
  };

  const handleDeletar = async (id: number, nome: string) => {
    if (window.confirm(`Deseja mesmo deletar a categoria "${nome}"?`)) {
      try {
        await axios.delete(`https://farmacia-jjxo.onrender.com/categorias/${id}`);
        alert('Categoria deletada com sucesso!');
        buscarCategorias();
      } catch (error) {
        console.error(error);
        alert('Erro ao deletar. Certifique-se de que não existem produtos vinculados a ela.');
      }
    }
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-800"></div>
        <span className="ml-3 text-slate-600">Carregando categorias...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Categorias Cadastradas</h2>

      {categorias.length === 0 ? (
        <p className="text-center text-slate-500 py-10">Nenhuma categoria cadastrada ainda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categorias.map((cat: any) => (
            <CardCategoria
              key={cat.id}
              id={cat.id}
              nome={cat.descricao || cat.nome}
              onEdit={() => handleEditar(cat)}
              onDelete={() => handleDeletar(cat.id, cat.descricao || cat.nome)}
            />
          ))}
        </div>
      )}

      <ModalCategoria
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setCategoriaSelecionada(null); }}
        categoriaParaEditar={categoriaSelecionada}
      />
    </div>
  );
}

export default ListaCategorias;