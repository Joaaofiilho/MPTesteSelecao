var menu = document.querySelector(".menu");
var botaoAdicionar = menu.querySelector(".adicionar");

var adicionarTarefa = document.querySelector(".addTarefa");
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
var tarefas = [];
var divTarefas = [];

function criarTarefa(form) {
  //As condiçoes do formulario completo ja devem ter sido avaliadas
  var tarefa = {
    nome: form.nome.value.trim(),
    prazo: form.prazo.value,
    numero: tarefasCadast,
    descricao: form.descricao.value.trim(),
    cor: form.cor.value
  };
  tarefas.push(tarefa);
  montarTarefa();
}

function montarTarefa(form){
    var divTarefa = document.createElement("div");
    divTarefa.classList.add("tarefa");
    
    var divCorpo = document.createElement("div");
    divCorpo.classList.add("corpo-tarefa");
    
    divTarefa.appendChild(divCorpo);
    
    var divNome = document.createElement("div");
    divNome.classList.add("nome");

    var label1 = document.createElement("label");
    label1.textContent = "Tarefa";
    divNome.appendChild(label1);

    var p1 = document.createElement("p");
    p1.classList.add("nome-tarefa");
    p1.innerHTML = tarefas[tarefas.length-1].nome;
    divNome.appendChild(p1);

    divCorpo.appendChild(divNome);

    var divPrazo = document.createElement("div");
    divPrazo.classList.add("prazo");

    var label2 = document.createElement("label");
    label2.textContent = "Prazo";
    divPrazo.appendChild(label2);

    var p2 = document.createElement("p");
    p2.classList.add("prazo-tarefa");
    p2.innerHTML = getPrazo(tarefas[tarefas.length - 1].prazo);
    divPrazo.appendChild(p2);

    divCorpo.appendChild(divPrazo);

    var divDescricao = document.createElement("div");
    divDescricao.classList.add("descricao");

    var label3 = document.createElement("label");
    label3.textContent = "Descrição";
    divDescricao.appendChild(label3);

    var p3 = document.createElement("p");
    p3.classList.add("descricao-tarefa");
    p3.innerHTML = tarefas[tarefas.length - 1].descricao;
    divDescricao.appendChild(p3);
    
    divCorpo.appendChild(divDescricao);
    
	var botao = document.createElement("button");
	botao.classList.add("close-button");
	botao.textContent = "X";
	
	divCorpo.appendChild(botao);
	
    divTarefa.classList.add(getCor(tarefas[tarefas.length-1].cor));
    
    divTarefas.push(divTarefa);
    
    containerLista.appendChild(divTarefa);
    tarefasCadast++;
    ordenar(listOrdenar.value, true);
}

function exibirFormulario() {
    if(adicionarTarefa.classList.contains("ocultar")){
        adicionarTarefa.classList.remove("ocultar");
    }else adicionarTarefa.classList.add("ocultar");
}

botaoAdicionar.addEventListener('click', function(event){
    colorir(inputCor);
    exibirFormulario();
});

botaoSalvar.addEventListener('click', function(event){
  if(isFormValido(formulario)){
      criarTarefa(formulario);
      adicionarTarefa.classList.add("ocultar");
      formulario.reset();
  }
});

botaoCancelar.addEventListener('click', function(event){
    adicionarTarefa.classList.add("ocultar");
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
    }
    else inputNome.classList.remove("erro");
    
    
    if(form.prazo.value.length == 0 && form.prazo){
        valido = false;
        inputPrazo.classList.add("erro");
    }
    else inputPrazo.classList.remove("erro");

    if(form.descricao.value.length == 0){
        valido = false;
        inputDescricao.classList.add("erro");
    }
    else inputDescricao.classList.remove("erro");
    
    
    if(valido) return true;
    else{
        exibirErro("Por favor, verifique os campos destacados e tente novamente.");
        return false;
    }
}

function limparErrosForm(){
    inputNome.classList.remove("erro");
    inputPrazo.classList.remove("erro");
    inputDescricao.classList.remove("erro");
}

function getPrazo(dataInvertida){
    var data = dataInvertida.split("-");
    return data[2] + "/" + data[1] + "/" + data[0];
}

function getPrazoInvertido(dataNormal){
    var data = dataNormal.split("/");
    return data[2] + "-" + data[1] + "-" + data[0];
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