import { toast } from 'sonner'

export function ToastAlerta(mensagem: string, tipo: string) {
  switch (tipo) {
    case 'sucesso':
      toast.success(mensagem)
      break
    case 'erro':
      toast.error(mensagem)
      break
    case 'info':
      toast.info(mensagem)
      break
    default:
      toast.message(mensagem)
  }
}