import { useState, useEffect } from 'react';
import CardCategoria from '../cardcategoria/CardCategoria';
import { getCategorias } from '../../../services/Service';

function ListaCategorias() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function buscarCategorias() {
    try {
      setCarregando(true);
      const dados = await getCategorias();
      setCategorias(dados);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

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
              nome={cat.descricao || cat.nome} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaCategorias;