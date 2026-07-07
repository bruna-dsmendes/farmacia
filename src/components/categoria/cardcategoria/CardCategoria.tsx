interface CardCategoriaProps {
  id: number;
  nome: string;
  quantidadeProdutos?: number;
  onClick?: (id: number) => void;
}

function CardCategoria({ id, nome, quantidadeProdutos, onClick }: CardCategoriaProps) {
  return (
    <div
      onClick={() => onClick && onClick(id)}
      className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm 
                       hover:border-emerald-600 hover:shadow-md hover:-translate-y-0.5
                       transition-all duration-200 cursor-pointer flex justify-between items-center 
                       max-w-xs w-full group"
    >
      <div className="flex flex-col gap-1">
        <h4 className="text-base font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
          {nome}
        </h4>

        {quantidadeProdutos !== undefined && (
          <span className="text-xs text-slate-400 font-medium">
            {quantidadeProdutos} {quantidadeProdutos === 1 ? 'produto' : 'produtos'}
          </span>
        )}
      </div>

      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center 
                            group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-700 
                            transition-colors duration-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </div>
  );
}

export default CardCategoria;