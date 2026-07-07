# 💊 InteliFarma - Sistema de Gerenciamento de Farmácia

O **InteliFarma** é uma aplicação web responsiva voltada para o gerenciamento de inventário de uma farmácia. O sistema permite o controle completo (CRUD) de **Produtos** e suas respectivas **Categorias**, integrado a uma API REST integrada no ecossistema Spring Boot.

---

## 🚀 Funcionalidades Principais

### 📦 Módulo de Produtos
* **Listagem Dinâmica:** Visualização de produtos em formato de cards responsivos com tratamento para itens esgotados.
* **Filtro em Tempo Real:** Busca instantânea por nome do produto.
* **Controle de Estoque:** Exibição clara do preço formatado (`R$`) e quantidade disponível.
* **CRUD Completo via Modal:** Cadastro e edição centralizados em uma única estrutura de modal dinâmico.

### 🗂️ Módulo de Categorias
* **Gerenciamento Simplificado:** Criação e alteração de categorias de medicamentos (ex: Anti-Inflamatórios, Analgésicos).
* **Fluxo em Modais:** Operações de escrita (`POST` e `PUT`) otimizadas por sobreposição, mantendo o usuário no contexto da listagem atual.

---

## 🛠️ Tecnologias Utilizadas

* **Front-end:**
    * [React](https://react.dev/) (com TypeScript)
    * [Tailwind CSS](https://tailwindcss.com/) (Estilização e utilitários de interface)
    * [Axios](https://axios-http.com/) (Comunicação HTTP com a API)
    * [React Router DOM](https://reactrouter.com/) (Navegação interna da SPA)
* **Back-end (API Externa):**
    * Spring Boot hospedado no Render
    * Swagger/OpenAPI (Documentação dos Endpoints)

---

## 📐 Estrutura de Contratos da API

As operações realizam o mapeamento de propriedades seguindo as especificações estritas do backend:

### Produto (`PUT /produtos`)
Envia o identificador numérico em conjunto com a carga útil na raiz do objeto para compatibilidade com o servidor:
```json
{
  "id": 10,
  "nome": "Ibuprofeno 100mg",
  "descricao": "Ibuprofeno 100mg",
  "preco": 17.00,
  "quantidade": 25,
  "foto": "[https://i.imgur.com/b7wVo2b.png](https://i.imgur.com/b7wVo2b.png)",
  "laboratorio": "Geral",
  "categoria": {
    "id": 1
  }
}
