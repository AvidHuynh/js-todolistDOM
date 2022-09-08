function getALlElement() {
  return document.querySelectorAll('#todoList > li');
}
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
// function searchTodo(searchTerm) {
//   const todoElementList = getALlElement();
//   for (const todoElement of todoElementList) {
//     const needtoShow = isMatch(todoElement, searchTerm);
//     todoElement.hidden = !needtoShow;
//   }
// }

// function filterTodo(filterStatus) {
//   const todoElementList = getALlElement();
//   for (const todoElement of todoElementList) {
//     const needtoShow = filterStatus === 'all' || todoElement.dataset.status === filterStatus;
//     todoElement.hidden = !needtoShow;
//   }
// }

function handleFilterChange(filterName, filterValue) {
  // update query params
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  history.pushState({}, '', url);
  const todoElementList = getALlElement();
  for (const todoElement of todoElementList) {
    const needtoShow = isMatch(todoElement, url.searchParams);
    todoElement.hidden = !needtoShow;
  }
}

function initSearchInput(params) {
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;
  if (params.get('searchTerm')) {
    searchInput.value = params.get('searchTerm');
  }
  // atttach event
  searchInput.addEventListener('input', () => {
    // searchTodo(searchInput.value);
    handleFilterChange('searchTerm', searchInput.value);
  });
}

function initFilterStatus(params) {
  // find select
  const filterStatusSelect = document.getElementById('filterStatus');
  if (!filterStatusSelect) return;
  if (params.get('status')) {
    filterStatusSelect.value = params.get('status');
  }
  // attach event
  filterStatusSelect.addEventListener('change', () => {
    // filterTodo(filterStatusSelect.value);
    handleFilterChange('status', filterStatusSelect.value);
  });
}
// MAIN
(() => {
  // get query params objects
  const params = new URLSearchParams(window.location.search);
  initSearchInput(params);
  initFilterStatus(params);
})();
