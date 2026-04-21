let carrinho = JSON.parse(localStorage.getItem("carrinho")) || {};
let unidade = localStorage.getItem("unidade") || "";
let frete = 5;

// ===== VALIDAÇÕES CADASTRO =====

// Função da  máscara para digitar numerão telefone
function mascaraTelefone(campo) {
    let valor = campo.value.replace(/\D/g, ""); // Remove tudo que não é número
    
    if (valor.length <= 10) {
        // Formato Fixo: (xx) xxxx-xxxx
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
        // Formato Celular: (xx) xxxxx-xxxx
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    }
    
    campo.value = valor;
}

//  validação final do telefone
function validarTelefone(t) {
    // Aceita (xx) xxxx-xxxx ou (xx) xxxxx-xxxx
    const regexFinal = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regexFinal.test(t);
}

// validação do cpf
function validarCPF(cpf) {
  let regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpf === "" || regex.test(cpf);
}

// validação formato da data de nascimento

function validarDataNascimento(data) {

  let regex = /^\d{2}\/\d{2}\/\d{4}$/;

  return regex.test(data);

} 


 //Faz as barras aparecerem sozinhas

function mascaraData(campo) {
    let v = campo.value.replace(/\D/g, "");
    
    // Remover o que não é número
    
    if (v.length >= 3 && v.length <= 4) {
        v = v.replace(/(\d{2})(\d)/, "$1/$2");
    } else if (v.length >= 5) {
        v = v.replace(/(\d{2})(\d{2})(\d)/, "$1/$2/$3");
    }
    
    campo.value = v;
}

function validarDataNascimento(dataString) {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const partes = dataString.match(regex);
    
    if (!partes) return false;

    const dia = parseInt(partes[1], 10);
    const mes = parseInt(partes[2], 10);
    const ano = parseInt(partes[3], 10);

    // Impede datas impossíveis e anos absurdos (até 100 anos)
    if (ano < 1926 || ano > new Date().getFullYear() || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
        return false;
    }

    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia);
    
    // Verifica se a data é válida no calendário (ex: evita 31/02)
    if (nascimento.getDate() !== dia) return false;

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();

    // Ajuste preciso: se o mês atual é menor que o de nascimento, 
    // ou se é o mesmo mês mas o dia atual é menor, ainda não fez aniversário
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade >= 18;

}

function validarSenha(senha) {

  // mínimo 3 caracteres
  if (senha.length < 3) return false;

  // pelo menos 1 letra
  let letra = /[a-zA-Z]/.test(senha);

  // pelo menos 1 número
  let numero = /[0-9]/.test(senha);

  // pelo menos 1 especial permitido
  let especial = /[@#$%&]/.test(senha);

  return letra && numero && especial;
}


// ===== FUNÇÃO PRINCIPAL =====

// function  login() {
// let login = document.getElementById("Login").value.trim();
// let senha = document.getElementById("Senha").value.trim();
//
//}
// ===== VALIDAÇÃO DE SENHA =====
function validarSenha(senha) {

  if (senha.length < 3) return false;

  let letra = /[a-zA-Z]/.test(senha);
  let numero = /[0-9]/.test(senha);
  let especial = /[@#$%&]/.test(senha);

  return letra && numero && especial;
}

// ===== LOGIN =====
function validarLogin() {

  let usuario = document.getElementById("login").value.trim();
  let senha = document.getElementById("senha").value.trim();
  let msg = document.getElementById("mensagem");

  msg.style.color = "red";
  msg.innerText = "";

  if (usuario === "") {
    msg.innerText = "Informe o usuário";
    return;
  }

  if (!validarSenha(senha)) {
    msg.innerText = "Senha inválida (mínimo 3 caracteres, com letra, número e @#$%&)";
    return;
  }

  msg.style.color = "green";
  msg.innerText = "Login realizado com sucesso";

  setTimeout(() => {
    window.location.href = "LGPD.html"; // redireciona para  escolha das unidades
  }, 1500);
}

// ===== SE O CLIENTE NÃO TIVER CADASTRO == REDIRECIONAR PARA CADASTRO =====
function irCadastro() {
  window.location.href = "index.html"; // página de cadastro
}

function irLGPD() {

  let nome = document.getElementById("nome").value.trim();
  let telefone = document.getElementById("telefone").value.trim();
  let cpf = document.getElementById("cpf").value.trim();
  let email = document.getElementById("email").value.trim();
  let nascimento = document.getElementById("nascimento").value.trim();
  let endereco = document.getElementById("endereco").value.trim();

  let erro = document.getElementById("erro");
  erro.innerText = "";

  if (nome === "") {
    erro.innerText = "Nome é obrigatório";
    return;
  }

  if (!validarTelefone(telefone)) {
    erro.innerText = "Telefone inválido";
    return;
  }

  if (!validarCPF(cpf)) {
    erro.innerText = "CPF inválido";
    return;
  }

  

  if (!validarDataNascimento(nascimento)) {
    erro.innerText = "Data inválida ou menor de 18 anos";
    return;
  }

  if (endereco === "") {
    erro.innerText = "Endereço obrigatório";
    return;
  }

  // salva dados 
  localStorage.setItem("cliente", JSON.stringify({
    nome, telefone, cpf, email, nascimento, endereco
  }));

  // segue fluxo
  window.location.href = "LGPD.html";
}

function validarLGPD() {
  if (!document.getElementById("aceite").checked) {
    alert("Aceite necessário");
    return;
  }
  window.location.href = "unidade.html";
}

function selecionarUnidade(u) {
  localStorage.setItem("unidade", u);
  localStorage.setItem("carrinho", JSON.stringify({}));
  window.location.href = "cardapio.html";
}

// ===== CARDÁPIO =====
let cardapio = {
  Lapa: [
    { nome: "Cuscuz", preco: 10 },
    { nome: "Tapioca", preco: 8 }
  ],
  Centro: [
    { nome: "Bolo de macaxeira", preco: 12 },
    { nome: "Café", preco: 5 }
  ],
  Rodoviaria: [
    { nome: "Suco", preco: 6 },
    { nome: "Cuscuz simples", preco: 7 }
  ]
};

if (document.getElementById("lista")) {
  let lista = document.getElementById("lista");

  if (cardapio[unidade]) {
    cardapio[unidade].forEach(item => {
      let li = document.createElement("li");

      li.innerHTML = `
        ${item.nome} - R$ ${item.preco}
        <button onclick="adicionar('${item.nome}', ${item.preco})">+</button>
        <button onclick="diminuir('${item.nome}')">-</button>
      `;

      lista.appendChild(li);
    });
  }

  atualizarResumo();
}

// ===== CARRINHO =====
function adicionar(nome, preco) {
  if (!carrinho[nome]) {
    carrinho[nome] = { qtd: 0, preco: preco };
  }
  carrinho[nome].qtd++;
  salvar();
}

function diminuir(nome) {
  if (carrinho[nome]) {
    carrinho[nome].qtd--;
    if (carrinho[nome].qtd <= 0) delete carrinho[nome];
  }
  salvar();
}

function salvar() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  location.reload(); // GARANTE ATUALIZAÇÃO NO CARRINHO
}

// ===== RESUMO CARDÁPIO =====
function atualizarResumo() {
  let div = document.getElementById("resumo");
  if (!div) return;

  let total = 0;
  div.innerHTML = "";

  for (let item in carrinho) {
    let qtd = carrinho[item].qtd;
    let preco = carrinho[item].preco;
    let subtotal = qtd * preco;
    total += subtotal;

    div.innerHTML += `${item} | Qtd: ${qtd} | R$ ${subtotal}<br>`;
  }

  div.innerHTML += `<strong>Total: R$ ${total}</strong>`;
}

// ===== CARRINHO PÁGINA =====
if (document.getElementById("resumoCarrinho")) {

  let div = document.getElementById("resumoCarrinho");
  let total = 0;

  for (let item in carrinho) {
    let qtd = carrinho[item].qtd;
    let preco = carrinho[item].preco;
    let subtotal = qtd * preco;
    total += subtotal;

    div.innerHTML += `
      ${item} | Qtd: ${qtd} | R$ ${preco}
      <button onclick="adicionar('${item}', ${preco})">+</button>
      <button onclick="diminuir('${item}')">-</button>
      <br>
    `;
  }

  document.getElementById("frete").innerText = "Frete: R$ " + frete;
  document.getElementById("totalFinal").innerText = "Total: R$ " + (total + frete);
}

function finalizar() {
  window.location.href = "pagamento.html";
}

// ===== PAGAMENTO =====
function pagamentoAprovado() {
  window.location.href = "statuspedido.html";
}

function pagamentoRecusado() {
  document.getElementById("msg").innerText =
    "Pagamento recusado. Entre em contato com seu banco.";
}

// ===== STATUS =====
if (document.getElementById("status")) {
  let status = document.getElementById("status");

  status.innerText = "Pedido recebido";

  setTimeout(() => status.innerText = "Em preparo", 5000);
  setTimeout(() => status.innerText = "Pronto", 10000);
  setTimeout(() => status.innerText = "Saiu para entrega", 15000);
  setTimeout(() => {
    status.innerText = "Entregue";
    calcularPontos();
    setTimeout(() => window.location.href = "avaliacao.html", 3000);
  }, 20000);
}

// ===== PONTOS =====
function calcularPontos() {
  let total = 0;

  for (let item in carrinho) {
    total += carrinho[item].qtd * carrinho[item].preco;
  }

  let pontos = Math.floor(total / 15);

  let pontosAtuais = parseInt(localStorage.getItem("pontos")) || 0;

  localStorage.setItem("pontos", pontosAtuais + pontos);
}

// ===== AVALIAÇÃO =====
function enviarAvaliacao() {
  let nota = document.getElementById("nota").value;
  let pontos = localStorage.getItem("pontos") || 0;

  document.getElementById("pontos").innerText =
    `Avaliação enviada: ${nota} estrelas | Pontos acumulados: ${pontos}`;
}