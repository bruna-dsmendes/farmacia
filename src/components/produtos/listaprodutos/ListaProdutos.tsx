import { useState, useEffect } from 'react';
import CardProduto from '../cardprodutos/CardProdutos';
import ModalProduto from '../../../models/ModalProdutos';
import { getProdutos, deleteProduto } from '../../../services/Service';

function ListaProdutos() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada] = useState('Todos');
  const [carregando, setCarregando] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  async function buscarProdutos() {
    try {
      setCarregando(true);
      const dados = await getProdutos();
      setProdutos(dados);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  const handleDeletarProduto = async (id: number, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${nome}"?`)) {
      try {
        await deleteProduto(String(id));
        alert('Produto excluído com sucesso!');
        buscarProdutos();
      } catch (error) {
        console.error(error);
        alert('Erro ao deletar o produto.');
      }
    }
  };

  const handleEditarProduto = (produto: any) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  };

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeTexto = produto.nome.toLowerCase().includes(busca.toLowerCase());
    const nomeCat = produto.categoria?.nome || produto.categoria?.descricao || '';
    const correspondeCategoria = categoriaSelecionada === 'Todos' || nomeCat === categoriaSelecionada;
    return correspondeTexto && correspondeCategoria;
  });

  if (carregando) {
    return <div className="text-center py-10 text-slate-600">Carregando produtos...</div>;
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-4 border-b border-slate-200">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border border-slate-300 rounded px-4 py-2 w-full lg:max-w-md focus:outline-none focus:border-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtosFiltrados.map((prod: any) => (
          <CardProduto
            key={prod.id}
            id={prod.id}
            nome={prod.nome}
            preco={prod.preco}
            foto={prod.foto}
            categoria={prod.categoria?.descricao || prod.categoria?.nome || "Sem Categoria"}
            estoque={prod.quantidade !== undefined ? prod.quantidade : prod.estoque}
            onEdit={() => handleEditarProduto(prod)}
            onDelete={() => handleDeletarProduto(prod.id, prod.nome)}
          />
        ))}
      </div>

      <ModalProduto
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setProdutoSelecionado(null); }}
        produtoParaEditar={produtoSelecionado}
      />
    </div>
  );
}

export default ListaProdutos;