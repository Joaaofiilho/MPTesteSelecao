const botaoAdicionar = document.querySelector("#adicionar");
const botaoSalvar = document.querySelector("#salvar");
const botaoCancelar = document.querySelector("#cancelar");

const sessaoAdicionar = document.querySelector(".addTarefa");
const formulario = sessaoAdicionar.querySelector("#tarefa-form");

const containerLista = document.querySelector(".lista");
const blocoTarefa = containerLista.querySelector(".tarefa");

var contador = 0;
var tarefas = [];

blocoTarefa.addEventListener("click", function(event){
    blocoTarefa.classList.add("clicado");
});

function criarTarefa(form) {
  //As condiçoes do formulario completo ja devem ter sido avaliadas
  contador++;
  var tarefa = {
    nome: form.nome.value,
    prazo: form.prazo.value,
    numero: contador,
    descricao: form.descricao.value
  };
  tarefas.push(tarefa);
  montarTarefa();
}

function montarTarefa(){
   var divTarefa = document.createElement("div");
   divTarefa.classList.add("tarefa");

   var divNome = document.createElement("div");
   divNome.id = "nome";

   var label1 = document.createElement("label");
   label1.textContent = "Tarefa";
   divNome.appendChild(label1);

   var p1 = document.createElement("p");
   p1.innerHTML = tarefas[contador - 1].numero + ". " + tarefas[contador - 1].nome;
   divNome.appendChild(p1);

   divTarefa.appendChild(divNome);

   var divPrazo = document.createElement("div");
   divPrazo.id = "prazo";

   var label2 = document.createElement("label");
   label2.textContent = "Prazo";
   divPrazo.appendChild(label2);

   var p2 = document.createElement("p");
   p2.innerHTML = tarefas[tarefas.length - 1].prazo;
   divPrazo.appendChild(p2);

   divTarefa.appendChild(divPrazo);

   var divDescricao = document.createElement("div");
   divDescricao.id = "descricao";

   var label3 = document.createElement("label");
   label3.textContent = "Descrição";
   divDescricao.appendChild(label3);

   var p3 = document.createElement("p");
   p3.innerHTML = tarefas[tarefas.length - 1].descricao;
   divDescricao.appendChild(p3);

   divTarefa.appendChild(divDescricao);

   divTarefa.classList.add("exibir");
   containerLista.appendChild(divTarefa);
}

function exibirFormulario() {
    var classes = sessaoAdicionar.classList;
    var isVisivel = false;
    
    for(var i = 0; i < classes.length; i++){
        if(classes[i] == "exibir"){
            classes.remove("exibir");
            isVisivel = true;
        }
    }
    if(!isVisivel){
        classes.add("exibir");
    }
}


//botaoAdicionar.addEventListener('click', function(event){
//  exibirFormulario();
//});

botaoAdicionar.onclick = function(){
    exibirFormulario();
}

botaoSalvar.addEventListener('click', function(event){
  var form = document.querySelector("#tarefa-form");
  //if validador dos dados derem true
  criarTarefa(form);
  sessaoAdicionar.classList.remove("exibir");
  formulario.reset();
  //else
  //do nothing
});

botaoCancelar.addEventListener('click', function(event){
    sessaoAdicionar.remove("exibir");

  formulario.reset();
});
