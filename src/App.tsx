import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import FormCategoria from './components/categoria/formcategoria/FormCategoria'
import DeletarCategoria from './components/categoria/deletarcategoria/DeletarCategoria'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <div className='flex flex-col min-h-screen'>

          <div className='flex-1'>
            <Routes>
              <Route path="/categorias" element={<div>Lista de Categorias</div>} />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
            </Routes>
          </div>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App
