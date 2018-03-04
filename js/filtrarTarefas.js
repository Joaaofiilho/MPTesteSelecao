var listFiltrar = menu.querySelector(".filtrar");

var oldValueFitlrar = "";

if (!(String(typeof(localStorage)).indexOf("undefined") > -1)) {
    inicializar();
}

listFiltrar.addEventListener("click", function(event){
    colorir(listFiltrar);
    filtrar(listFiltrar.value);
});

function filtrar(cor){
    var divTarefas = containerLista.getElementsByClassName("tarefa");
    if(cor != oldValueFitlrar){
        if(cor == "none"){
            for(var i = 0; i < tarefasCadast; i++){
                exibirElemento(divTarefas[i]);
            }
        }
        else{ 
            for(var i = 0; i < tarefasCadast; i++){
                var corBack = divTarefas[i].classList;
                if(corBack.contains(getCor(cor))) exibirElemento(divTarefas[i]);
                else ocultarElemento(divTarefas[i]);
            }
        }
    }
    oldValueFitlrar = cor;       
}

function colorir(list){
    list.classList.remove("background-vermelho");
    list.classList.remove("background-amarelo");
    list.classList.remove("background-verde");
    list.classList.remove("background-azul");
    list.classList.remove("background-rosa");

    list.classList.add(getCor(list.value));
}

function inicializar(){
    for(var i = 0; i < tarefas.length; i++){
        var divTarefa = montarDivTarefa(tarefas[i]);
        containerLista.appendChild(divTarefa);
    }
    ordenar(listOrdenar.value, true);
}