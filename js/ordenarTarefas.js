const listOrdenar = menu.querySelector(".ordenar");

var dataHoje = new Date();
var diaHoje = dataHoje.getDate();
var mesHoje = dataHoje.getMonth()+1;
var anoHoje = dataHoje.getFullYear();
if(diaHoje<10) diaHoje = '0'+diaHoje;
if(mesHoje<10) mesHoje = '0'+mesHoje;

var dataHojeInvertida = anoHoje + "-" + mesHoje + "-" + diaHoje;
inputPrazo.setAttribute("min", dataHojeInvertida);

var oldValueOrdenar = "";
var ordemNum = [];

listOrdenar.addEventListener('click', function(event){
    var tipoOrdem = listOrdenar.value;
    ordenar(tipoOrdem, false);
});

function ordenar(valor, adicionandoTarefa){
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
}

function ordenarPorNome(){
    var nomes = [];
    var divTarefasAux = divTarefas.slice();
    for (var i = 0; i < tarefas.length; i++) nomes.push(tarefas[i].nome);
    nomes = nomes.sort();
    
    for (var i = 0; i < tarefas.length; i++){
        for (var j = 0; j < tarefas.length; j++){
            if(typeof divTarefasAux[j] != 'undefined'){
                var nomeDiv = divTarefasAux[j].querySelector(".nome-tarefa").textContent;
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
        var data = new Date(tarefas[i].prazo);
        datas.push(data);
    }
    
    for(var i = 0; i < datas.length-1; i++){
        for (var j = 0; j <= datas.length; j++){
            if(datas[i].getTime() > datas[i+1].getTime()){
                var aux = datas[i];
                datas[i] = datas[i+1];
                datas[i+1] = aux;
            }
        }
    }
    
    for (var i = 0; i < tarefas.length; i++){
        for (var j = 0; j < tarefas.length; j++){
            if(typeof divTarefasAux[j] != 'undefined'){
                var dataDiv = new Date(getPrazoInvertido(divTarefas[j].querySelector(".prazo-tarefa").textContent));
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