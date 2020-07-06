const addMessage = document.querySelector('.message'),
        addButton = document.querySelector('.add'),
        todo = document.querySelector('.todo');

const displayMessages = () => {
    let displayMessage = "";
    if (todoList.length === 0) todo.textContent = "";
    todoList.forEach((item, index) => {
        displayMessage += `
        <li data-id-item="${index}">
            <input type = "checkbox" id="item_${index}" ${item.checked ? "checked" : ""} title="Выполнено">
            <label for="item_${index}" class="${item.important ? "important" : ""}">${item.todo}</label>
            <a href="#" class="icon-important" title="Важно">
                <img src="img/important.png" alt="important" class="todo-important-icon">
            </a>
            <a href="#" class="icon-delete" title="Удалить">
                <img src="img/delete.png" alt="delete" class="todo-delete-icon">
            </a>              
        </li>
        `;
        todo.innerHTML = displayMessage;
    })
};

let todoList = [];
if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', () => {
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

todo.addEventListener('click', (event) => {
    todoList.forEach((item, index) => {
        let id = +event.target.closest('li').dataset.idItem;
        if (index === id) {   
            if (event.target.className === 'todo-important-icon') {
                item.important = !item.important;
            } else if (event.target.className === 'todo-delete-icon') {
                todoList.splice(id, 1);
            } else if (event.target.tagName === 'LABEL' || event.target.tagName === 'INPUT') {
                item.checked = !item.checked;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
    }
    });
});    
