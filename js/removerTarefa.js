var inputRemover = menu.querySelector(".inputRemover");

var botaoConfirmarRem = menu.querySelector(".remover-button");

botaoConfirmarRem.addEventListener("click", function(event){
   if(inputRemover.value != ""){
       removerTarefa(inputRemover.value);
   }else exibirErro("Por favor, selecione uma ID!");
    inputRemover.value = "";
});

function removerTarefa(idTarefa) {
    if(tarefasCadast > 0 && idTarefa <= tarefasCadast && idTarefa > 0){
        //console.log(containerLista.childNodes.item(numeroTarefa));
         containerLista.childNodes.item(idTarefa).remove();
         
         var aux1 = tarefas.slice(0, idTarefa-1);
         var aux2 = tarefas.slice(idTarefa);
         tarefas = aux1.concat(aux2);
        
         tarefasCadast--;
         decrescerDado("stgTarefasCadast");
         armazenarDado("stgTarefas", JSON.stringify(tarefas));
         reordenarIds();
    }else exibirErro("Não há uma tarefa com o número correspondente para ser apagada!");
    //Lembrar de voltar um numero em todas as tarefas da frente da removida
}


function getIndexTarefa(id){
    tarefas.forEach(function(element, index){
       if(element.id == id) return index; 
    });
    return null;
}



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