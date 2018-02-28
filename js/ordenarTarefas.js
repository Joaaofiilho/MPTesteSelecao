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
        
        console.log(valor.toLowerCase());
        switch(valor.toLowerCase()){
            case "nome":
                ordenarPorNome();
                break;
            case "prazo":
                ordenarPorPrazo();
                break;
            case "descricao":
                ordenarPorDesc();
                break;
        }
    }
}

function ordenarPorNome(){
    var nomes = [];
    for (var i = 0; i < tarefas.length; i++) nomes.push(tarefas[i].nome);
    nomes = nomes.sort();
    
    for (var i = 0; i < tarefas.length; i++){
        for (var j = 0; j < tarefas.length; j++){
            var nomeDiv = divTarefas[j].querySelector(".nome-tarefa").textContent;
            console.log(nomes[i]);
            console.log(nomeDiv);
            if(nomes[i] == nomeDiv){
                containerLista.appendChild(divTarefas[j]);
                tarefasCadast++;
                break;
            }
        }
    }
}

function ordenarPorPrazo(){
    var datas = [];
    for (var i = 0; i < tarefas.length; i++){
        var data = new Date(tarefas[i].prazo);
        datas.push(data);
    }
    
    console.log(datas);
    
    for(var i = 0; i < datas.length-1; i++){
        for (var j = 0; j <= datas.length; j++){
            if(datas[i].getTime() > datas[i+1].getTime()){
                var aux = datas[i];
                datas[i] = datas[i+1];
                datas[i+1] = aux;
            }
        }
    }
    
    console.log(datas);
    
    for (var i = 0; i < tarefas.length; i++){
        for (var j = 0; j < tarefas.length; j++){
            var dataDiv = new Date(getPrazoInvertido(divTarefas[j].querySelector(".prazo-tarefa").textContent));
            console.log("Data " + i);
            console.log(datas[i]);
            console.log(dataDiv);
            if(datas[i].getTime() == dataDiv.getTime()){
                containerLista.appendChild(divTarefas[j]);
                tarefasCadast++;
                break;
            }
        }
    }
}

function ordenarPorDesc(){
    var descricoes = [];
    for (var i = 0; i < tarefas.length; i++) descricoes.push(tarefas[i].descricao);
    descricoes = descricoes.sort();
    
    for (var i = 0; i < tarefas.length; i++){
        for (var j = 0; j < tarefas.length; j++){
            var descDiv = divTarefas[j].querySelector(".descricao-tarefa").textContent;
            console.log(descDiv);
            console.log(descricoes[i]);
            if(descricoes[i] == descDiv){
                containerLista.appendChild(divTarefas[j]);
                tarefasCadast++;
                break;
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