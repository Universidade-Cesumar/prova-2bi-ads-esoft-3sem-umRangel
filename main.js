// Arquivo para código javascript
const API_URL = "https://6a1c77bf8858a003817be931.mockapi.io/api/v1/Material"
const formulario = document.getElementById("formulario")
const lista = document.getElementById("lista-materiais")

const buscarProdutos = async () => {
  const resposta = await fetch(API_URL);
  const dados = await resposta.json();

  lista.innerHTML = "";

  dados.forEach((produto) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${produto.PRODUTO}</td> 
      <td>${produto.QUANTIDADE}</td>
    `;
    lista.appendChild(linha);
  });
};