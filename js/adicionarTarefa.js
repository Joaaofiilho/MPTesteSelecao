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
var botaoSalvar = adicionarTarefa.querySelector(".salvar");
var botaoCancelar = adicionarTarefa.querySelector(".cancelar");

var containerLista = document.querySelector(".lista");

var tarefasCadast = 0;
var tarefas = [];
var divTarefas = [];

function criarTarefa(form) {
  //As condiçoes do formulario completo ja devem ter sido avaliadas
  var tarefa = {
    nome: form.nome.value,
    prazo: form.prazo.value,
    numero: tarefasCadast,
    descricao: form.descricao.value
  };
  tarefas.push(tarefa);
  montarTarefa();
}

function montarTarefa(form){
    var divTarefa = document.createElement("div");
    divTarefa.classList.add("tarefa");

    var divNome = document.createElement("div");
    divNome.classList.add("nome");

    var label1 = document.createElement("label");
    label1.textContent = "Tarefa";
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

    divTarefa.classList.add("exibir");
    divTarefas.push(divTarefa);
    
    containerLista.appendChild(divTarefa);
    tarefasCadast++;
    ordenar(listOrdenar.value, true);
}

function exibirFormulario() {
    var classes = adicionarTarefa.classList;
    var isVisivel = false;
    
    for (var i = 0; i < classes.length; i++){
        if(classes[i] == "exibir"){
            classes.remove("exibir");
            classes.add("ocultar");
            isVisivel = true;
        }
    }
    if(!isVisivel){
        classes.remove("ocultar");
        classes.add("exibir");
    }
}

botaoAdicionar.addEventListener('click', function(event){
    exibirFormulario();
});

botaoSalvar.addEventListener('click', function(event){
  if(isFormValido(formulario)){
      criarTarefa(formulario);
      adicionarTarefa.classList.remove("exibir");
      adicionarTarefa.classList.add("ocultar");
      formulario.reset();
  }
});

botaoCancelar.addEventListener('click', function(event){
    adicionarTarefa.classList.remove("exibir");
    adicionarTarefa.classList.add("ocultar");
    formulario.reset();
    limparErrosForm();
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
    return false;
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
