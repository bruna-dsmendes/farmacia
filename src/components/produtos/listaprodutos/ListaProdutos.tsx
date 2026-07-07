import { useState, useEffect } from 'react';
import CardProduto from '../cardprodutos/CardProdutos';
import { getProdutos } from '../../../services/Service';

function ListaProdutos() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [carregando, setCarregando] = useState(true);

  const categoriasFiltro = ["Todos", "Medicamentos", "Cosméticos e Beleza", "Higiene Pessoal", "Suplementos e Vitaminas"];

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

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeTexto = produto.nome.toLowerCase().includes(busca.toLowerCase());

    const nomeCat = produto.categoria?.nome || produto.categoria?.descricao || '';
    const correspondeCategoria = categoriaSelecionada === 'Todos' || nomeCat === categoriaSelecionada;

    return correspondeTexto && correspondeCategoria;
  });

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-800"></div>
        <span className="ml-3 text-slate-600">Carregando produtos...</span>
      </div>
    );
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

        <div className="flex flex-wrap gap-2">
          {categoriasFiltro.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${categoriaSelecionada === cat
                ? 'bg-emerald-800 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {produtosFiltrados.length === 0 ? (
        <p className="text-center text-slate-500 py-10">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.map((prod: any) => (
            <CardProduto
              key={prod.id}
              nome={prod.nome}
              preco={prod.preco}
              foto={prod.foto}
              categoria={prod.categoria?.descricao || prod.categoria?.nome || "Sem Categoria"}
              estoque={prod.quantidade !== undefined ? prod.quantidade : prod.estoque}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaProdutos;