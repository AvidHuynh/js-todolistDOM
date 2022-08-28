function createTodoElement(todo) {
  if (!todo) return null;
  // find template
  const getIDtemplate = document.getElementById('todoTemplate');
  if (!getIDtemplate) return null;
  // clone li element
  const cloneElement = getIDtemplate.content.firstElementChild.cloneNode(true);
  cloneElement.dataset.id = todo.id;
  // update content where needed
  const titleElement = cloneElement.querySelector('.todo__title')
  if (titleElement) titleElement.textContent = todo.title;
  return cloneElement;
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
    const liElement = createTodoElement(item);
    ulElement.appendChild(liElement);
  }
}

(() => {
  renderTodoList('todoList');
})();
