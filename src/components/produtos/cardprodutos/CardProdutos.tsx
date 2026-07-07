interface CardProdutoProps {
  nome: string;
  preco: number;
  foto: string;
  categoria: string;
  estoque: number;
}

function CardProduto({ nome, preco, foto, categoria, estoque }: CardProdutoProps) {

  const imagemPadrao = "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=400";

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-200 flex flex-col justify-between max-w-sm w-full">

      <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center p-4">
        <img
          src={foto || imagemPadrao}
          alt={nome}
          className="max-h-full max-w-full object-contain"
        />
        {estoque === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
              Esgotado
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-growgap-2">
        <span className="text-xs font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded w-max">
          {categoria}
        </span>

        <h4 className="text-lg font-bold text-slate-800 line-clamp-2min-h-[3.5rem]">
          {nome}
        </h4>

        <span className={`text-xs ${estoque > 0 ? 'text-slate-500' : 'text-red-500 font-semibold'}`}>
          {estoque > 0 ? `Estoque: ${estoque} un.` : 'Indisponível'}
        </span>
      </div>

      <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400">Preço</span>
          <span className="text-2xl font-black text-slate-900">
            R$ {preco.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <button
          disabled={estoque === 0}
          className={`px-4 py-2 rounded font-medium text-sm transition-colors duration-200
                        ${estoque > 0
              ? 'bg-emerald-800 hover:bg-emerald-700 text-white cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

export default CardProduto;