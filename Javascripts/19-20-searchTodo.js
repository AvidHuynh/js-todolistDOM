function getALlElement() {
  return document.querySelectorAll('#todoList > li')
}

function isMatch(liElement, searchTerm) {
  if (!liElement) return false;
  // searchTerm === empty -> show All Todos
  // searchTerm != empty -> filter todo
  if (searchTerm === '') return true;
  const titleElement = liElement.querySelector('p.todo__title');
  if (!titleElement) return false;
  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}
function searchTodo(searchTerm) {
  const todoElementList = getALlElement();
  for (const todoElement of todoElementList) {
    const needtoShow = isMatch(todoElement, searchTerm);
    todoElement.hidden = !needtoShow;
  }
}
function initSearchInput() {
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;
  // atttach event
  searchInput.addEventListener('input', () => {
    searchTodo(searchInput.value);
  });
}

// MAIN
(() => {
  initSearchInput();
})();