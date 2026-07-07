import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Categoria from "../../../models/Categoria"
import { buscar, deletar } from "../../../services/Service"
import { PacmanLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarCategoria() {

  const navigate = useNavigate()

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria)
    } catch (error: any) {
      ToastAlerta('Erro ao buscar a categoria.', 'erro')
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarCategoria() {
    setIsLoading(true)

    try {
      await deletar(`/categorias/${id}`)
      ToastAlerta('Categoria apagada com sucesso', 'sucesso')
    } catch (error: any) {
      ToastAlerta('Erro ao deletar a categoria.', 'erro')
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate("/categorias")
  }

  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar Categoria</h1>
      <p className='text-center font-semibold mb-4'>
        Você tem certeza de que deseja apagar a categoria a seguir?
      </p>
      <div className='border border-blue-200 flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header
          className='py-2 px-6 bg-blue-100 text-blue-900 font-bold text-2xl border-b border-blue-200'>
          Categoria
        </header>
        <p className='p-8 text-3xl bg-white h-full text-blue-800'>{categoria.nome}</p>
        <div className="flex">
          <button
            className='text-red-900 bg-red-200 hover:bg-red-300 w-full py-2'
            onClick={retornar}>
            Não
          </button>
          <button
            className='w-full text-white bg-blue-500 hover:bg-blue-600 flex items-center justify-center'
            onClick={deletarCategoria}>

            {isLoading ?
              <PacmanLoader
                color="#ffffff"
                size={24}
              /> :
              <span>Sim</span>
            }

          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarCategoria
