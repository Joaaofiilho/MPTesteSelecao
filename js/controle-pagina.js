//Armazenamento local
function armazenarDado(nome, dado){
    localStorage.setItem(nome, dado);
}

function pegarDado(nome){
    return localStorage.getItem(nome);
}

function acrescentarDado(nome){
    armazenarDado(nome, (parseInt(pegarDado(nome))+1));
}

function decrescerDado(nome){
    armazenarDado(nome, (parseInt(pegarDado(nome))-1));
}

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

function getCor(nome){
    switch(nome.toLowerCase()){
        case "vermelho":
            return "background-vermelho";
            break;
        case "amarelo":
            return "background-amarelo";
            break;
        case "verde":
            return "background-verde";
            break;
        case "azul":
            return "background-azul";
            break;
        case "rosa":
            return "background-rosa";
            break;
    }
}

//Data e hora
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