import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='bg-blue-600 text-white py-4 shadow-lg'>
      <div className='container mx-auto px-4 flex justify-between items-center'>
        <Link to='/' className='text-2xl font-bold'>
          Farmácia
        </Link>
        <ul className='flex gap-6'>
          <li>
            <Link to='/categorias' className='hover:text-blue-200 transition'>
              Categorias
            </Link>
          </li>
          <li>
            <Link to='/cadastrarcategoria' className='hover:text-blue-200 transition'>
              Nova Categoria
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
