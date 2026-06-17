// Arquivo para código javascript
const API_URL = "https://6a1c77bf8858a003817be931.mockapi.io/api/v1/Material";
const formulario = document.getElementById("formulario");
const tabela = document.getElementById("lista-materiais");

const buscarProdutos = async () => {
  const resposta = await fetch(API_URL);
  const dados = await resposta.json();

  tabela.innerHTML = "";

  dados.forEach((material) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${material.MATERIAL}</td> 
      <td>${material.QUANTIDADE}</td>
      <td>
        <button class="btn-baixar">Baixar</button>
        <button class="btn-excluir">Excluir</button>
      </td>
    `;

    const btnBaixar = linha.querySelector(".btn-baixar");
    const btnExcluir = linha.querySelector(".btn-excluir");
    
    tabela.appendChild(linha);
  });
};

buscarProdutos();

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault(); 

  const novoMaterial = {
    MATERIAL: document.getElementById("input-nome").value,
    QUANTIDADE: Number(document.getElementById("input-quantidade").value)
  };

  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(novoMaterial)
  });

  if(resposta.ok) {
    formulario.reset();
    buscarProdutos();
  }
});