var menu = document.querySelector(".menu");
var botaoAdicionar = menu.querySelector(".adicionar");

var sessaoAdicionar = document.querySelector(".secao-addTarefa");
var adicionarTarefa = sessaoAdicionar.querySelector(".addTarefa");
var formulario = adicionarTarefa.querySelector(".tarefa-form");
var nome = formulario.querySelector(".nome");
var inputNome = nome.querySelector(".inputNome");
var prazo = formulario.querySelector(".prazo");
var inputPrazo = prazo.querySelector(".inputPrazo");
var descricao = formulario.querySelector(".descricao");
var inputDescricao = descricao.querySelector(".inputDescricao");
var cor = formulario.querySelector(".cor");
var inputCor = cor.querySelector(".inputCor");
var botaoSalvar = adicionarTarefa.querySelector(".salvar");
var botaoCancelar = adicionarTarefa.querySelector(".cancelar");

var containerLista = document.querySelector(".lista");

var tarefasCadast = 0;
var numTarefasTotal = 0;
var tarefas = [];
var divTarefas = [];

function criarTarefa(form) {
  //As condiçoes do formulario completo ja devem ter sido avaliadas
  var tarefa = {
    nome: form.nome.value.trim(),
    prazo: form.prazo.value,
    numero: numTarefasTotal,
    id: tarefasCadast+1,
    descricao: form.descricao.value.trim(),
    cor: form.cor.value
  };
  tarefas.push(tarefa);
  montarTarefa(form);
}

function montarTarefa(form){
    var divTarefa = document.createElement("div");
    divTarefa.classList.add("tarefa");
    
    var divNome = document.createElement("div");
    divNome.classList.add("nome");
    
    var label1 = document.createElement("label");
    label1.textContent = "Tarefa (ID: " + (tarefas[tarefas.length-1].id) + ")";
    label1.classList.add("label-titulo");
    divNome.appendChild(label1);

    var p1 = document.createElement("p");
    p1.classList.add("nome-tarefa");
    p1.innerHTML = tarefas[tarefas.length-1].nome;
    divNome.appendChild(p1);

    divTarefa.appendChild(divNome);

    var divPrazo = document.createElement("div");
    divPrazo.classList.add("prazo");

    var label2 = document.createElement("label");
    label2.textContent = "Prazo";
    divPrazo.appendChild(label2);

    var p2 = document.createElement("p");
    p2.classList.add("prazo-tarefa");
    p2.innerHTML = getPrazo(tarefas[tarefas.length - 1].prazo);
    divPrazo.appendChild(p2);

    divTarefa.appendChild(divPrazo);

    var divDescricao = document.createElement("div");
    divDescricao.classList.add("descricao");

    var label3 = document.createElement("label");
    label3.textContent = "Descrição";
    divDescricao.appendChild(label3);

    var p3 = document.createElement("p");
    p3.classList.add("descricao-tarefa");
    p3.innerHTML = tarefas[tarefas.length - 1].descricao;
    divDescricao.appendChild(p3);
    
    divTarefa.appendChild(divDescricao);
    
    var spanNumero = document.createElement("span");
    spanNumero.classList.add("numero-tarefa","ocultar");
    spanNumero.textContent = tarefas[tarefas.length-1].numero;
    
    divTarefa.appendChild(spanNumero);
    
    divTarefa.classList.add(getCor(tarefas[tarefas.length-1].cor));
    
    divTarefas.push(divTarefa);
    containerLista.appendChild(divTarefa);
    tarefasCadast++;
    numTarefasTotal++;
    reordenarIds();
}

function exibirFormulario() {
    if(sessaoAdicionar.classList.contains("ocultar")){
        sessaoAdicionar.classList.remove("ocultar");
    }else sessaoAdicionar.classList.add("ocultar");
}

botaoAdicionar.addEventListener('click', function(event){
    colorir(inputCor);
    exibirFormulario();
});

botaoSalvar.addEventListener('click', function(event){
  if(isFormValido(formulario)){
      criarTarefa(formulario);
      sessaoAdicionar.classList.add("ocultar");
      formulario.reset();
  }
});

botaoCancelar.addEventListener('click', function(event){
    sessaoAdicionar.classList.add("ocultar");
    formulario.reset();
    limparErrosForm();
});

inputCor.addEventListener('click', function(event){
    colorir(inputCor);
});

//Certificar formulario
function isFormValido(form){
    var valido = true;
    if(form.nome.value.length == 0){
        valido = false;
        inputNome.classList.add("erro");
        exibirErro("Verifique o campo de texto \"Nome\" e tente novamente!");
    }
    else inputNome.classList.remove("erro");
    
    var datasPrazo = form.prazo.value.split("-");
    var dataInput = new Date(datasPrazo[0], datasPrazo[1], datasPrazo[2], 0, 0, 0, 0);

    if(form.prazo.value.length == 0 || dataInput.getTime() < dataHoje.getTime() || dataInput.getTime() > dataMaxima.getTime()){
        valido = false;
        inputPrazo.classList.add("erro");
        exibirErro("Verifique o campo \"Data\" e tente novamente. Datas permitidas: (" + diaHoje + "/"
                  + mesHoje + "/" + anoHoje + ") até (31/12/"+anoMaximo+")!");
    }
    else inputPrazo.classList.remove("erro");

    if(form.descricao.value.length == 0){
        valido = false;
        inputDescricao.classList.add("erro");
        exibirErro("Verifique o campo de texto \"Descrição\" e tente novamente!");
    }
    else inputDescricao.classList.remove("erro");
    
    
    if(valido) return true;
    return false;
    
}

function limparErrosForm(){
    inputNome.classList.remove("erro");
    inputPrazo.classList.remove("erro");
    inputDescricao.classList.remove("erro");
}

function getCor(nome){
    switch(nome.toLowerCase()){
        case "vermelho":
            return "background-vermelho";
            break;
        case "amarelo":
            return "background-amarelo";
            break;
        case "verde":
            return "background-verde";
            break;
        case "azul":
            return "background-azul";
            break;
        case "rosa":
            return "background-rosa";
            break;
    }
}