import { InstagramLogoIcon } from "@phosphor-icons/react"

function Footer() {

  let data = new Date().getFullYear()

  return (
    <>
      <div className="flex justify-center bg-emerald-800 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className='text-xl font-bold'>
            InteliFarma | Copyright: {data}
          </p>
          <p className='text-lg'>Acesse nossa rede social</p>

          <a href="https://www.instagram.com/inteli_farma" target="_blank">
            <InstagramLogoIcon size={48} weight='bold' />
          </a>

        </div>
      </div>
    </>
  )
}

export default Footer