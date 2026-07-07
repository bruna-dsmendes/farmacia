import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Categoria from "../../../models/Categoria"
import { buscar, atualizar, cadastrar } from "../../../services/Service"
import { PropagateLoader } from "react-spinners"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function FormCategoria() {

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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
  }

  function retornar() {
    navigate("/categorias")
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria)
        ToastAlerta('A Categoria foi atualizada com sucesso!', 'sucesso')
      } catch (error: any) {
        ToastAlerta('Erro ao atualizar a categoria.', 'erro')
      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria)
        ToastAlerta('A Categoria foi cadastrada com sucesso!', 'sucesso')
      } catch (error: any) {
        ToastAlerta('Erro ao cadastrar a categoria.', 'erro')
      }
    }

    setIsLoading(false)
    retornar()
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
      </h1>

      <form className="w-1/2 flex flex-col gap-4"
        onSubmit={gerarNovaCategoria}>

        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome da Categoria</label>
          <input
            type="text"
            placeholder="Digite o nome da categoria"
            name='nome'
            className="border-2 border-blue-200 rounded p-2"
            value={categoria.nome || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição da Categoria</label>
          <textarea
            placeholder="Digite a descrição da categoria"
            name='descricao'
            className="border-2 border-blue-200 rounded p-2"
            value={categoria.descricao || ''}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
            rows={4}
            required
          />
        </div>

        <button
          className="rounded text-white bg-blue-500 
                     hover:bg-blue-600 w-1/2 py-2 mx-auto flex justify-center"
          type="submit">

          {isLoading ?
            <PropagateLoader
              color="#ffffff"
              size={24}
            /> :
            <span>{id === undefined ?
              'Cadastrar' : 'Atualizar'}</span>
          }
        </button>

      </form>
    </div>
  )
}

export default FormCategoria