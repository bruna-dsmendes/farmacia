import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type Categoria from '../../../models/Categoria'
import { buscar } from '../../../services/Service'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function buscarCategorias() {
    setIsLoading(true)
    try {
      await buscar('/categorias', setCategorias)
    } catch (error: any) {
      ToastAlerta('Erro ao buscar categorias.', 'erro')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    buscarCategorias()
  }, [])

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold text-center mb-8'>Categorias</h1>

      {isLoading ? (
        <p className='text-center'>Carregando...</p>
      ) : categorias.length === 0 ? (
        <div className='text-center'>
          <p className='mb-4'>Nenhuma categoria encontrada</p>
          <Link to='/cadastrarcategoria' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Criar Categoria
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {categorias.map((categoria) => (
            <div key={categoria.id} className='border border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg transition'>
              <h2 className='text-2xl font-bold mb-2 text-blue-700'>{categoria.nome}</h2>
              <p className='text-gray-600 mb-4'>{categoria.descricao}</p>
              <div className='flex gap-2'>
                <Link
                  to={`/editarcategoria/${categoria.id}`}
                  className='flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-center transition'
                >
                  Editar
                </Link>
                <Link
                  to={`/deletarcategoria/${categoria.id}`}
                  className='flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 text-center transition'
                >
                  Deletar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListaCategorias