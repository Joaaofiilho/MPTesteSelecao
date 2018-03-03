const listOrdenar = menu.querySelector(".ordenar");

var dataHojeAux = new Date();
var diaHoje = dataHojeAux.getDate();
var mesHoje = dataHojeAux.getMonth()+1;
var anoHoje = dataHojeAux.getFullYear();
var anoMaximo = 2150;
var dataMaxima = new Date(anoMaximo, 12, 31, 0, 0, 0, 0);
if(diaHoje<10) diaHoje = '0'+diaHoje;
if(mesHoje<10) mesHoje = '0'+mesHoje;
var dataHoje = new Date(anoHoje, mesHoje, diaHoje, 0, 0, 0, 0);

var dataHojeInvertida = anoHoje + "-" + mesHoje + "-" + diaHoje;
inputPrazo.setAttribute("min", dataHojeInvertida);
inputPrazo.setAttribute("max", (anoMaximo + "-12-31"));

var oldValueOrdenar = "";

listOrdenar.addEventListener('click', function(event){
    var tipoOrdem = listOrdenar.value;
    ordenar(tipoOrdem, false, false);
});

function ordenar(valor, adicionandoTarefa, vindoPeloReordenar){
    if(!(valor == oldValueOrdenar) || adicionandoTarefa){
        for(var i = 0; i < tarefasCadast; i++){
            var tarefa = containerLista.querySelector(".tarefa");
            tarefa.remove();
        }
        tarefasCadast = 0;
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
    }
    if(!vindoPeloReordenar)
        reordenarIds();
}

function ordenarPorNome(){
    var nomes = [];
    var divTarefasAux = divTarefas.slice();
    console.log("tarefas.length: " + tarefas.length);
    for (var i = 0; i < tarefas.length; i++) nomes.push(tarefas[i].nome.toLowerCase());
    nomes = nomes.sort();
    
    for (var i = 0; i < tarefas.length; i++){
        for (var j = 0; j < tarefas.length; j++){
            if(typeof divTarefasAux[j] != 'undefined'){
                var nomeDiv = divTarefasAux[j].querySelector(".nome-tarefa").textContent.toLowerCase();
                if(nomes[i] == nomeDiv){
                    containerLista.appendChild(divTarefasAux[j]);
                    delete divTarefasAux[j];
                    tarefasCadast++;
                    break;
                }
            }
        }
    }
}

function ordenarPorPrazo(){
    var datas = [];
    var divTarefasAux = divTarefas.slice();
    for (var i = 0; i < tarefas.length; i++){
        var data = tarefas[i].prazo.split("-");
        var dataF = new Date(data[0], data[1], data[2], 0, 0, 0, 0);
        datas.push(dataF);
    }
    
    datas.sort(function(a, b){
        return a.getDate()-b.getDate();
    });
    /*
    for(var i = 0; i < datas.length-1; i++){
        for (var j = i; j <= datas.length; j++){
            if(datas[i].getTime() > datas[i+1].getTime()){
                var aux = datas[i];
                datas[i] = datas[i+1];
                datas[i+1] = aux;
            }
        }
    }
    */
    
    for (var i = 0; i < tarefas.length; i++){
        for (var j = 0; j < tarefas.length; j++){
            if(typeof divTarefasAux[j] != 'undefined'){
                data = getPrazoInvertido(divTarefas[j].querySelector(".prazo-tarefa").textContent).split("-");
                var dataDiv = new Date(data[0], data[1], data[2], 0, 0, 0, 0);
                if(datas[i].getTime() == dataDiv.getTime()){
                    containerLista.appendChild(divTarefas[j]);
                    delete divTarefasAux[j];
                    
                    tarefasCadast++;
                    break;
                }
            }
        }
    }
}

function ordenarPorData(){
    var datas = [];
    var divTarefasAux = divTarefas.slice();
    
    for (var i = 0; i < tarefas.length; i++) datas.push(tarefas[i].numero);
    datas = datas.sort();
    
    for (var i = 0; i < tarefas.length; i++){
        for (var j = 0; j < tarefas.length; j++){
            if(typeof divTarefasAux[j] != 'undefined'){
                var dataDiv = tarefas[j].numero;
                if(datas[i] == dataDiv){
                    containerLista.appendChild(divTarefas[j]);
                    delete divTarefasAux[j];
                    
                    tarefasCadast++;
                    break;
                }
            }
        }
    }
}
function reordenarIds(){
    
    //var divTarefasAux = divTarefas.slice();
    
    for(var i = 0; i < divTarefas.length; i++){
        for(var j = i; j < tarefas.length; j++){
            if(divTarefas[i].querySelector(".numero-tarefa").textContent 
               == tarefas[j].numero){
                var titulo = divTarefas[i].querySelector(".label-titulo");
                tarefas[j].id = i+1;
                titulo.textContent = "Tarefa (ID: " + (tarefas[j].id) + ")";
            }
        }
    }
    
    ordenar(listOrdenar.value, true, true);
    //console.log(tarefas.length);
    //console.log(divTarefasAux.length);
    //for (var i = 0; i < tarefas.length; i++){
    //   var titulo = divTarefasAux[i].querySelector(".label-titulo");
    //    tarefas[i].id = i+1;
    //    titulo.textContent = "Tarefa (ID: " + (tarefas[i].id) + ")";
    //    containerLista.appendChild(divTarefasAux[i]);
    //    tarefasCadast++;
    //}
}

function getDia(dataInvertida){
    var data = dataInvertida.split("-");
    return data[2];
}

function getMes(dataInvertida){
    var data = dataInvertida.split("-");
    return data[1];
}

function getAno(dataInvertida){
    var data = dataInvertida.split("-");
    return data[0];
}

function getPrazo(dataInvertida){
    var data = dataInvertida.split("-");
    return data[2] + "/" + data[1] + "/" + data[0];
}

function getPrazoInvertido(dataNormal){
    var data = dataNormal.split("/");
    return data[2] + "-" + data[1] + "-" + data[0];
}