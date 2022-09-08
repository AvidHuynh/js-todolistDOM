function isMatchStatus(liElement, filterStatus) {
  return filterStatus === 'all' || liElement.dataset.status === filterStatus;
}

function isMatchSearch(liElement, searchTerm) {
  if (!liElement) return false;
  // searchTerm === empty -> show All Todos
  // searchTerm != empty -> filter todo
  if (searchTerm === '') return true;
  const titleElement = liElement.querySelector('p.todo__title');
  if (!titleElement) return false;
  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function isMatch(liElement, params) {
  return (
    isMatchSearch(liElement, params.get('searchTerm')) &&
    isMatchStatus(liElement, params.get('status'))
  );
}

function createTodoElement(todo, params) {
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
  // check if we should show it or not
  // cloneElement.hidden = !isMatch(cloneElement, params);
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
  // ============== add event click mark as done ==============
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

  // ============== add event click remove ==============
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

  // =============== add event click edit ==============
  const editButton = cloneElement.querySelector('button.edit');
  if (editButton) {
    editButton.addEventListener('click', () => {
      // TODO: lasted todo data - get from local storage
      // need get todo from local storage
      // as todo data can be outdated
      const todoList = getTodoList();
      const latestTodo = todoList.find((x) => x.id === todo.id);
      if (!latestTodo) return;
      // populate data to todo form
      populateTodoForm(latestTodo);
    });
  }
  return cloneElement;
}

function populateTodoForm(todo) {
  // query todo form
  const todoForm = document.getElementById('todoFormID');
  if (!todoForm) return;
  // dataset.id = todo.id
  todoForm.dataset.id = todo.id;
  // set value for form control
  // set todoText input
  const todoInput = document.getElementById('todoText');
  todoInput.value = todo.title;
}

function renderTodoList(todoList, ulElementID, params) {
  const ulElement = document.getElementById(ulElementID);
  if (!ulElement) return;
  for (const item of todoList) {
    const liElement = createTodoElement(item, params);
    ulElement.appendChild(liElement);
  }
}

function createNewTodo(event) {
  event.preventDefault();
  const todoFormInput = document.getElementById('todoFormID');
  if (!todoFormInput) return;
  // get form value
  // validate form values
  const todoInput = document.getElementById('todoText');
  if (!todoInput) return;

  const isEdit = Boolean(todoFormInput.dataset.id);
  if (isEdit) {
    // find current todo
    const todoList = getTodoList();
    const index = todoList.findIndex((x) => x.id.toString() === todoFormInput.dataset.id);
    if (index < 0) return;
    // update content
    todoList[index].title = todoInput.value;
    // save
    localStorage.setItem('todo_list', JSON.stringify(todoList));
    // apple DOM changes
    // find li element having id = todoForm.dataset.id
    const liElement = document.querySelector(
      `ul#todoList > li[data-id="${todoFormInput.dataset.id}"]`
    );
    if (liElement) {
      const titleElement = liElement.querySelector('.todo__title');
      if (titleElement) titleElement.textContent = todoInput.value;
    }
  } else {
    const newTodo = {
      id: Date.now(),
      title: todoInput.value,
      status: 'pending',
    };
    // save
    const todoList = getTodoList();
    todoList.push(newTodo);
    localStorage.setItem('todo_list', JSON.stringify(todoList));
    // apple DOM changes
    const newliElement = createTodoElement(newTodo);
    const ulElement = document.getElementById('todoList');
    if (!ulElement) return;
    ulElement.appendChild(newliElement);
  }
  // reset form
  delete todoFormInput.dataset.id;
  todoFormInput.reset();
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
  const params = new URLSearchParams(window.location.search);
  // Bước 1
  const todoList = getTodoList();
  renderTodoList(todoList, 'todoList', params);
  //
  const todoForm = document.getElementById('todoFormID');
  if (todoForm) {
    todoForm.addEventListener('submit', createNewTodo);
  }
})();
