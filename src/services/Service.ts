import axios from 'axios';

const api = axios.create({
  baseURL: 'https://farmacia-jjxo.onrender.com'
})

export const getProdutos = async () => {
  try {
    const response = await api.get('/produtos');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

export const createProduto = async (produto: any) => {
  try {
    const response = await api.post('/produtos', produto);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
};

export const updateProduto = async (id: string, dados: any) => {
  const produtoComId = {
    ...dados,
    id: parseInt(id)
  };
  const resposta = await axios.put('https://farmacia-jjxo.onrender.com/produtos', produtoComId);
  return resposta.data;
};

export const deleteProduto = async (id: string) => {
  try {
    const response = await api.delete(`/produtos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
};

export const getCategorias = async () => {
  try {
    const response = await api.get('/categorias');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};

export const createCategoria = async (categoria: any) => {
  try {
    const response = await api.post('/categorias', categoria);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};