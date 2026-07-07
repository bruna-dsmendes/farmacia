import { Link } from "react-router-dom";
interface NavbarProps {
  onAbrirModalCategoria: () => void;
  onAbrirModalProduto: () => void;
}

function Navbar({ onAbrirModalCategoria, onAbrirModalProduto }: NavbarProps) {
  return (
    <div className='w-full flex justify-center py-4 bg-emerald-800 text-white'>
      <div className="container flex justify-between items-center text-lg mx-8">

        <Link to='/home' className='font-bold text-xl select-none'>
          InteliFarma
        </Link>

        <div className='flex gap-6 items-center select-none'>
          <Link to='/produtos' className="cursor-pointer hover:text-emerald-200 transition-colors">
            Produtos
          </Link>

          <Link to='/categorias' className="cursor-pointer hover:text-emerald-200 transition-colors">
            Categorias
          </Link>

          <span onClick={onAbrirModalCategoria} className="cursor-pointer bg-emerald-700 hover:bg-emerald-600 px-3 py-1 rounded text-sm transition-colors">
            + Cadastrar Categoria
          </span>

          <span onClick={onAbrirModalProduto} className="cursor-pointer bg-emerald-700 hover:bg-emerald-600 px-3 py-1 rounded text-sm transition-colors">
            + Cadastrar Produto
          </span>

        </div>
      </div>
    </div>
  )
}

export default Navbar;