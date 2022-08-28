function createTodoElement(todo) {
  if (!todo) return null;
  // find template
  const getIDtemplate = document.getElementById('todoTemplate');
  if (!getIDtemplate) return null;

  // clone li element
  const cloneElement = getIDtemplate.content.firstElementChild.cloneNode(true);
  cloneElement.dataset.id = todo.id;
  cloneElement.dataset.status = todo.status;

  // update content where needed
  const titleElement = cloneElement.querySelector('.todo__title');
  if (titleElement) titleElement.textContent = todo.title;

  // render alert status
  const divElement = cloneElement.querySelector('div.todo');
  if (!divElement) return null;
  const alertClass = todo.status === 'completed' ? 'alert-success' : 'alert-secondary';
  divElement.classList.remove('alert-secondary');
  divElement.classList.add(alertClass);

  // change color for button status
  const buttonElement = cloneElement.querySelector('button.btn');
  if (!buttonElement) return null;
  if (todo.status === 'completed') buttonElement.textContent = 'Reset';
  const changeColor = todo.status === 'completed' ? 'btn-success' : 'btn-dark';
  buttonElement.classList.remove('btn-success');
  buttonElement.classList.add(changeColor);

  // TODO: attach event for button
  // add click mark as done
  const markAsDone = cloneElement.querySelector('button.mark-as-done');
  if (markAsDone) {
    markAsDone.addEventListener('click', () => {
      const currentStatus = cloneElement.dataset.status;
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      const newAlert = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
      // get current todo list
      // update status of current todo
      // save to local storage
      const todoList = getTodoList();
      const index = todoList.findIndex((x) => x.id === todo.id);
      if (index >= 0) {
        todoList[index].status = newStatus;
        localStorage.setItem('todo_list', JSON.stringify(todoList));
      }

      cloneElement.dataset.status = newStatus;
      divElement.classList.remove('alert-success', 'alert-secondary');
      divElement.classList.add(newAlert);

      // change style
      markAsDone.classList.remove('btn-dark');
      if (currentStatus === 'pending') {
        markAsDone.textContent = 'Reset';
        markAsDone.classList.add('btn-success');
      } else if (currentStatus === 'completed') {
        markAsDone.textContent = 'Finish';
        markAsDone.classList.add('btn-dark');
      }
    });
  }

  // add click remove
  const remove = cloneElement.querySelector('button.remove');
  if (remove) {
    remove.addEventListener('click', () => {
      // save todo localStorage
      const todoList = getTodoList();
      const newTodoList = todoList.filter((x) => x.id !== todo.id);
      localStorage.setItem('todo_list', JSON.stringify(newTodoList));
      // remove from DOM
      cloneElement.remove();
    });
  }
  return cloneElement;
}

function renderTodoList(todoList, ulElementID) {
  const ulElement = document.getElementById(ulElementID);
  if (!ulElement) return;
  for (const item of todoList) {
    const liElement = createTodoElement(item);
    ulElement.appendChild(liElement);
  }
}

function createNewTodo() {
  const todoInput = document.getElementById('todoText');
  if (!todoInput) return;
}

function getTodoList() {
  try {
    const todoList = JSON.parse(localStorage.getItem('todo_list'));
    return todoList || [];
  } catch (error) {
    return [];
  }
}

// main
(() => {
  // const todoList = [
  //   { id: 1, title: 'Hoc Javascript', status: 'completed' },
  //   { id: 2, title: 'Hoc ReactJS', status: 'completed' },
  //   { id: 3, title: 'Hoc NextJS', status: 'pending' },
  //   { id: 4, title: 'Hoc VueJS', status: 'pending' },
  //   { id: 5, title: 'Hoc Ruby', status: 'pending' },
  // ];
  const todoList = getTodoList();
  renderTodoList(todoList, 'todoList');
})();
