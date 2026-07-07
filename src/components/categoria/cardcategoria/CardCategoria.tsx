interface CardCategoriaProps {
  id: number;
  nome: string;
  onEdit: () => void;
  onDelete: () => void;
}

function CardCategoria({ nome, onEdit, onDelete }: CardCategoriaProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex justify-between items-center w-full group">
      <div className="flex flex-col gap-1">
        <h4 className="text-base font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
          {nome}
        </h4>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="p-1.5 rounded-full bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          title="Editar Categoria"
        >
          Editar
        </button>

        <button
          onClick={onDelete}
          className="p-1.5 rounded-full bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Deletar Categoria"
        >
          Deletar
        </button>
      </div>
    </div>
  );
}

export default CardCategoria;