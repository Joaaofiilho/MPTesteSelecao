/*
function removerTarefa(numeroTarefa) {
    var divTarefasAux = containerLista.getElementsByClassName("tarefa");
    divTarefasAux[getTarefa(numeroTarefa)].remove();
    tarefasCadast--;
    //Lembrar de voltar um numero em todas as tarefas da frente da removida
}

function getTarefa(numero){
    tarefas.forEach(function(element, index){
       if(element.numero == numero) return index; 
    });
    console.log("Oops!");
    return null;    
}
*/


 //for(var i=0; i< botoesRemover.length; i++) {
//       botoesRemover[i].addEventListener("click", bindClick(i));
 //}

 //function bindClick(i) {
//    return function(){
//             console.log("you clicked region number " + i);
//           };
//}

/*
for(var botaoRemover : botoesRemover){
    botaoRemover.addEventListener("click", function(event)){
        console.log("clicado");
        if(tarefasCadast > 0){
            var tarefaRemover = document.querySelector(".tarefa");
            divTarefas.splice(divTarefas.length-1, divTarefas.length);
            tarefas.splice(tarefas.length-1, tarefas.length);
            tarefaRemover.remove();
            tarefasCadast--;
        }else{
            exibirErro("Não há tarefas para serem removidas!");
        }                   
    }
}
botaoRemover.forEach(function(){
    
})
botaoRemover.addEventListener('click', function(event) {
    
});
*/