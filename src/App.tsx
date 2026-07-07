import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import ListaCategorias from './components/categoria/listacategoria/ListaCategoria';
import ListaProdutos from './components/produtos/listaprodutos/ListaProdutos';
import ModalCategoria from './models/ModalCategoria';
import ModalProduto from './models/ModalProdutos';
import Footer from './components/footer/Footer';

function App() {
  const [modalCategoriaAberta, setModalCategoriaAberta] = useState(false);
  const [modalProdutoAberta, setModalProdutoAberta] = useState(false);

  return (
    <>
      <Navbar
        onAbrirModalCategoria={() => setModalCategoriaAberta(true)}
        onAbrirModalProduto={() => setModalProdutoAberta(true)}
      />

      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <main className="flex-growcontainer mx-auto px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/produtos" element={<ListaProdutos />} />
            <Route path="/categorias" element={<ListaCategorias />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <ModalCategoria
        isOpen={modalCategoriaAberta}
        onClose={() => setModalCategoriaAberta(false)}
      />

      <ModalProduto
        isOpen={modalProdutoAberta}
        onClose={() => setModalProdutoAberta(false)}
      />
    </>
  );
}

export default App;