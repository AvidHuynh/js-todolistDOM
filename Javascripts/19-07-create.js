function creatTodoElement(todo) {
  if (!todo) return null;
  const liElement = document.createElement('li');
  liElement.textContent = todo.title;
  liElement.dataset.id = todo.id;
  return liElement;
}
function renderTodoList(ulElementID) {
  const ulElement = document.getElementById(ulElementID);
  if (!ulElement) return;

  const todoList = [
    { id: 1, title: 'Hoc Javascript' },
    { id: 2, title: 'Hoc PHP' },
    { id: 3, title: 'Hoc ReactJS' },
    { id: 4, title: 'Hoc NextJS' },
  ];

  for (const item of todoList) {
    const liElement = creatTodoElement(item);
    ulElement.appendChild(liElement);
  }
}

(() => {
  renderTodoList('todoList');
})();
