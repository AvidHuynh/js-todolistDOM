// main();
(() => {
  let channelName = 'Hello World!';
  console.log(channelName);

  const ulElement = document.querySelector('#todoList');
  const liElementList = document.querySelectorAll('li');
  if (liElementList) {
    for (const liElement of liElementList) {
      console.log(liElement);
    }
  }
})();
