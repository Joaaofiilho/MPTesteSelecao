const listOrdenar = menu.querySelector(".ordenar");

var oldValueOrdenar = "";

listOrdenar.addEventListener('click', function(event){
    var tipoOrdem = listOrdenar.value;
    ordenar(tipoOrdem, false);
});

function ordenar(valor, adicionandoTarefa){
    if(!(valor == oldValueOrdenar) || adicionandoTarefa){
        apagarTarefas();
        console.log("apagadas");
        oldValueOrdenar = valor;
        
        switch(valor.toLowerCase()){
            case "nome":
                ordenarPorNome();
                break;
            case "prazo":
                ordenarPorPrazo();
                break;
            case "data":
                ordenarPorData();
                break;
        }
        reordenarIds();
    }
}

function ordenarPorNome(){
    var nomes = [];
    var tarefasAux = tarefas.slice();
    
    for (var i = 0; i < tarefas.length; i++)
        nomes.push(tarefas[i].nome.toLowerCase());
    nomes = nomes.sort();
    
    for (var i = 0; i < tarefasAux.length; i++){
        for (var j = 0; j < tarefasAux.length; j++){
            //Evita repetição
            if(typeof tarefasAux[j] != 'undefined'){
                var nomeDiv = tarefasAux[j].nome.toLowerCase();
                if(nomes[i] == nomeDiv){
                    var divTarefa = montarDivTarefa(tarefasAux[j]);
                    exibirTarefa(divTarefa);
                    //Faz com que tarefas com o mesmo nome não se repitam
                    delete tarefasAux[j];
                    break;
                }
            }
        }
    }
}

function ordenarPorPrazo(){
    var datas = [];
    var tarefasAux = tarefas.slice();
    
    for (var i = 0; i < tarefas.length; i++){
        var data = tarefas[i].prazo.split("-");
        var dataF = new Date(data[0], data[1], data[2], 0, 0, 0, 0);
        datas.push(dataF);
    }
    
    datas.sort(function(a, b){
        return a.getDate()-b.getDate();
    });

    for (var i = 0; i < tarefas.length; i++){
        for (var j = 0; j < tarefas.length; j++){
            if(typeof tarefasAux[j] != 'undefined'){
                var data = (getPrazoInvertido(tarefasAux[j].prazo)).split("-");
                var dataDiv = new Date(data[2], data[3], data[4], 0, 0, 0, 0);
                if(datas[i].getTime() == dataDiv.getTime()){
                    var divTarefa = montarDivTarefa(tarefasAux[j]);
                    exibirTarefa(divTarefa);
                    delete tarefasAux[j];
                    break;
                }
            }
        }
    }
}

function ordenarPorData(){
    var datas = [];
    var tarefasAux = tarefas.slice();
    
    for (var i = 0; i < tarefas.length; i++) datas.push(tarefas[i].numero);
    datas = datas.sort();
    
    for (var i = 0; i < tarefas.length; i++){
        for (var j = 0; j < tarefas.length; j++){
            if(typeof tarefasAux[j] != 'undefined'){
                var dataDiv = tarefas[j].numero;
                if(datas[i] == dataDiv){
                    var divTarefa = montarDivTarefa(tarefasAux[j]);
                    exibirTarefa(divTarefa);
                    delete tarefasAux[j];
                    break;
                }
            }
        }
    }
}

function reordenarIds(){
    var divTarefasAux = containerLista.querySelectorAll(".tarefa");
    console.log(divTarefasAux);
    apagarTarefas();
    
    for(var i = 0; i < divTarefasAux.length; i++){
        divTarefasAux[i].querySelector(".label-titulo").textContent = "Tarefa (ID: " + (i+1) + ")";
        for(var j = 0; j < tarefas.length; j++){
            var numeroTarefa = divTarefasAux[i].querySelector(".numero-tarefa").textContent;
            if(numeroTarefa == tarefas[j].numero){
                tarefas[j].id = i+1;
            }
        }
        exibirTarefa(divTarefasAux[i]);
    }
}

function apagarTarefas(){
    for(var i = 0; i < tarefasCadast; i++){
        var tarefa = containerLista.querySelector(".tarefa");
        tarefa.remove();
    }
    tarefasCadast = 0;
}