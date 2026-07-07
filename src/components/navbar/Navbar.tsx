function Navbar() {
  return (
    <>
      <div className='w-full flex justify-center py-4
                            bg-emerald-800 text-white'>

        <div className="container flex justify-between text-lg mx-8">
          FarmaVida

          <div className='flex gap-4'>
            Produtos
            Categorias
            Cadastrar Produto
            Perfil
            Sair
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar