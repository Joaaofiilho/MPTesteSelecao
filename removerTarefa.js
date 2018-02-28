const botaoRemover = document.getElementById('remover');

function removerTarefa(tarefa) {

}

botaoRemover.addEventListener('click', function(event) {
  var tarefaRemover = document.getElementById('tarefa');
  tarefaRemover.remove();
  contador--;
});
