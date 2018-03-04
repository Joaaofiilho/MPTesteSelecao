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

var tarefas = [];
var tarefasCadast;
var numTarefasTotal;

if (!(String(typeof(localStorage)).indexOf("undefined") > -1)) {
    if(!window.localStorage.stgTarefasCadast) armazenarDado("stgTarefasCadast", 0);
    if(!localStorage.stgNumTarefasTotal) armazenarDado("stgNumTarefasTotal", 0);
    if(!localStorage.stgTarefas) armazenarDado("stgTarefas", JSON.stringify(tarefas));
    
    tarefasCadast = parseInt(pegarDado("stgTarefasCadast"));
    numTarefasTotal = parseInt(pegarDado("stgNumTarefasTotal"));
    tarefas = JSON.parse(pegarDado("stgTarefas"));
}else{
    tarefasCadast = 0;
    numTarefasTotal = 0;
    exibirErro("[Aviso] Seu navegador não suporta o armazenamento local!");
}

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
    
    armazenarDado("stgTarefas", JSON.stringify(tarefas));
    
    numTarefasTotal++;
    
    acrescentarDado("stgNumTarefasTotal");
    
    return tarefa;
}

function montarDiv(classe){
    var div = document.createElement("div");
    div.classList.add(classe);
    return div;
}

function montarLabel(texto, classe){
    var label = document.createElement("label");
    label.textContent = texto;
    label.classList.add(classe);
    return label;
}

function montarParag(texto, classe){
    var p = document.createElement("p");
    p.innerHTML = texto;
    p.classList.add(classe);
    return p;
}

function montarSpan(texto, classe, tarefa){
    var span = document.createElement("span");
    span.textContent = tarefa.numero;
    span.classList.add(classe);
    ocultarElemento(span);
    return span;
}

function montarDivTarefa(tarefa){
    var divTarefa = montarDiv("tarefa");
    
    var divNome = montarDiv("nome");
    divNome.appendChild(montarLabel("Tarefa (ID: " + (tarefa.id) + ")", "label-titulo"));
    divNome.appendChild(montarParag(tarefa.nome, "nome-tarefa"));
    divTarefa.appendChild(divNome);

    var divPrazo = montarDiv("prazo");
    divPrazo.appendChild(montarLabel("Prazo", "label-prazo"));
    divPrazo.appendChild(montarParag(getPrazo(tarefa.prazo), "prazo-tarefa"));
    divTarefa.appendChild(divPrazo);

    var divDescricao = montarDiv("descricao");
    divDescricao.appendChild(montarLabel("Descrição", "label-descricao"));
    divDescricao.appendChild(montarParag(tarefa.descricao, "descricao-tarefa"));
    divTarefa.appendChild(divDescricao);

    divTarefa.appendChild(montarSpan(tarefa.numero, "numero-tarefa", tarefa));
    divTarefa.classList.add(getCor(tarefa.cor));
    
    return divTarefa;
}

function exibirTarefa(divTarefa){
    containerLista.appendChild(divTarefa);
    tarefasCadast++;
    acrescentarDado("stgTarefasCadast");
}

function exibirFormulario() {
    if(sessaoAdicionar.classList.contains("ocultar")){
        exibirElemento(sessaoAdicionar);
    }else ocultarElemento(sessaoAdicionar);
}

botaoAdicionar.addEventListener('click', function(event){
    colorir(inputCor);
    exibirFormulario();
});

botaoSalvar.addEventListener("click", function(event){
  if(isFormValido(formulario)){
      var tarefa = criarTarefa(formulario);
      exibirTarefa(montarDivTarefa(tarefa));
      ocultarElemento(sessaoAdicionar);
      ordenar(listOrdenar.value, true);
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
        destacarElemento(inputNome);
        exibirErro("Verifique o campo de texto \"Nome\" e tente novamente!");
    }
    else retirarDestaqueElemento(inputNome);
    
    var datasPrazo = form.prazo.value.split("-");
    var dataInput = new Date(datasPrazo[0], datasPrazo[1], datasPrazo[2], 0, 0, 0, 0);

    if(form.prazo.value.length == 0 || dataInput.getTime() < dataHoje.getTime() 
       || dataInput.getTime() > dataMaxima.getTime() || ((form.prazo.value.indexOf("-") > -1)
      && (form.prazo.value.indexOf("/") > -1)) || (!(form.prazo.value.indexOf("-") > -1)
      && !(form.prazo.value.indexOf("/") > -1))){
        valido = false;
        destacarElemento(inputPrazo);
        exibirErro("Verifique o campo \"Data\" e tente novamente. Datas permitidas: (" + diaHoje + "/"
                  + mesHoje + "/" + anoHoje + ") até (31/12/"+anoMaximo+")!");
    }
    else retirarDestaqueElemento(inputPrazo);

    if(form.descricao.value.length == 0){
        valido = false;
        destacarElemento(inputDescricao);
        exibirErro("Verifique o campo de texto \"Descrição\" e tente novamente!");
    }
    else retirarDestaqueElemento(inputDescricao);
    
    
    if(valido) return true;
    return false;
    
}

function limparErrosForm(){
    retirarDestaqueElemento(inputNome);
    retirarDestaqueElemento(inputPrazo);
    retirarDestaqueElemento(inputDescricao);
}