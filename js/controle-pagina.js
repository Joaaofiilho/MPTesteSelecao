//Elementos
function ocultarElemento(elemento){
    elemento.classList.add("ocultar");
}

function exibirElemento(elemento){
    elemento.classList.remove("ocultar");
}

function destacarElemento(elemento){
    elemento.classList.add("erro");
}

function retirarDestaqueElemento(elemento){
    elemento.classList.remove("erro");
}

//Data e hora
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