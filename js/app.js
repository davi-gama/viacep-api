const cep = document.querySelector("#inputCep");
const endereco = document.querySelector("#inputEndereco");
const bairro = document.querySelector("#inputBairro");
const cidade = document.querySelector("#inputCidade");
const uf = document.querySelector("#inputUf");

cep.addEventListener("focusout", () => {
  if (!validarCampo()) {
    return;
  }

  pesquisarCep();
});

function pesquisarCep() {
  fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
    .then((response) => {
      // Verifica se a requisição foi realizada
      if (!response.ok) {
        throw new Error("Erro na requisição");
      } else {
        // Converte o response para JSON
        return response.json();
      }
    })
    .then((data) => {
      if ("erro" in data) {
        alert("CEP não encontrado.");
        limparCampos();
      } else {
        console.log(data);
        endereco.value = data.logradouro;
        bairro.value = data.bairro;
        cidade.value = data.localidade;
        uf.value = data.uf;
      }
    });
}

function validarCampo() {
  // Regex que verifica se o CEP é válido (0-9, 8 dígitos)
  const cepValido = /^[0-9]{8}$/;
  // Regex que verifica se o campo contém somente números
  const somenteNumero = /^\d+$/;
  if (!somenteNumero.test(cep.value) || !cepValido.test(cep.value)) {
    alert("CEP inválido.");
    limparCampos();
    return false;
  } else {
    return true;
  }
}

function limparCampos() {
  document.querySelector("#inputEndereco").value = "";
  document.querySelector("#inputBairro").value = "";
  document.querySelector("#inputCidade").value = "";
  document.querySelector("#inputUf").value = "";
}
