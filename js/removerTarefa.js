const botaoRemover = menu.querySelector(".remover");

function removerTarefa(tarefa) {

}

botaoRemover.addEventListener('click', function(event) {
    if(tarefasCadast > 0){
        var tarefaRemover = document.querySelector(".tarefa");
        divTarefas.splice(divTarefas.length-1, divTarefas.length);
        tarefas.splice(tarefas.length-1, tarefas.length);
        tarefaRemover.remove();
        tarefasCadast--;
    }
});
