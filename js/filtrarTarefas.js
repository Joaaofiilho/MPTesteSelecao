var listFiltrar = menu.querySelector(".filtrar");

var oldValueFitlrar = "";

listFiltrar.addEventListener("click", function(event){
   colorir(listFiltrar);
    filtrar(listFiltrar.value);
});

function filtrar(cor){
    if(cor != oldValueFitlrar){
        if(cor == "none"){
            for(var i = 0; i < tarefasCadast; i++){
                divTarefas[i].classList.remove("ocultar");
            }
        }
        else{ 
            for(var i = 0; i < tarefasCadast; i++){
                if(tarefas[i].cor != cor) {
                    divTarefas[i].classList.add("ocultar");
                }else{
                    divTarefas[i].classList.remove("ocultar");
                }
            }
        }
    }
    oldValueFitlrar = cor;
        
}

function colorir(list){
    if(list.classList.contains("background-vermelho"))
        list.classList.remove("background-vermelho");
    else if(list.classList.contains("background-amarelo"))
        list.classList.remove("background-amarelo");
    else if(list.classList.contains("background-verde"))
        list.classList.remove("background-verde");
    else if(list.classList.contains("background-azul"))
        list.classList.remove("background-azul");
     else if(list.classList.contains("background-rosa"))
        list.classList.remove("background-rosa");
    
    list.classList.add(getCor(list.value));
}