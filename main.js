// Arquivo para código javascript
const API_URL = "https://6a1c77bf8858a003817be931.mockapi.io/api/v1/Material";
const formulario = document.getElementById("formulario");
const tabela = document.getElementById("lista-materiais");

const validarRetirada = (estoqueAtual, quantidadeRetirada) => {
  if (quantidadeRetirada <= 0) {
    return false;
  }
  if (quantidadeRetirada > estoqueAtual) {
    return false;
  }
  return true;
};

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

    btnBaixar.addEventListener("click", async () => {
      const inputRetirada = document.getElementById("input-retirada");
      const quantidadeRetirada = Number(inputRetirada.value);

      if (!validarRetirada(material.QUANTIDADE, quantidadeRetirada)) {
        alert("Operação inválida. Verifique o valor digitado.");
        return;
      }

      const novaQuantidade = material.QUANTIDADE - quantidadeRetirada;

      const respostaPut = await fetch(`${API_URL}/${material.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ QUANTIDADE: novaQuantidade })
      });

      if (respostaPut.ok) {
        inputRetirada.value = "";
        buscarProdutos();
      }
    });

    btnExcluir.addEventListener("click", async () => {
      const respostaDelete = await fetch(`${API_URL}/${material.id}`, {
        method: "DELETE"
      });

      if (respostaDelete.ok) {
        buscarProdutos();
      }
    });

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