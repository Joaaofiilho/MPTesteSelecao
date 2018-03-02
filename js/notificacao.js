var cabecalho = document.querySelector(".cabecalho");

var notificationBar = cabecalho.querySelector(".notification-bar");
var textoErro = notificationBar.querySelector(".mensagem-erro");
var botaoFechar = notificationBar.querySelector(".close-button");

function exibirErro(mensagem){
    textoErro.textContent = mensagem;
    notificationBar.classList.remove("ocultar");
}

botaoFechar.addEventListener("click", function(event){
    notificationBar.classList.add("ocultar");
});