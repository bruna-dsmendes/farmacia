interface CardProdutoProps {
  id: number;
  nome: string;
  preco: number;
  foto: string;
  categoria: string;
  estoque: number;
  onEdit: () => void;
  onDelete: () => void;
}

function CardProduto({ nome, preco, foto, categoria, estoque, onEdit, onDelete }: CardProdutoProps) {
  const imagemPadrao = "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=400";

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200 flex flex-col h-full">
      <div className="relative h-44 w-full bg-slate-100 flex items-center justify-center p-4">
        <img src={foto || imagemPadrao} alt={nome} className="max-h-full max-w-full object-contain" />
        {estoque === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">Esgotado</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-growgap-2">
        <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded w-max">
          {categoria}
        </span>
        <h4 className="text-base font-bold text-slate-800">{nome}</h4>
        <p className="text-xl font-extrabold text-emerald-800 mt-auto">
          R$ {preco.toFixed(2).replace('.', ',')}
        </p>
        <p className="text-xs text-slate-500">Estoque: {estoque} unidades</p>

        <div className="flex gap-2 mt-4 pt-2 border-t border-slate-100">
          <button
            onClick={onEdit}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded transition-colors"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold px-3 py-2 rounded transition-colors"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProduto;