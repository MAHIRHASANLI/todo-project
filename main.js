//? Select all elements
const form = document.querySelector("#todo-add-form");
const addInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".list-group")
const searchInput = document.querySelector("#todo-input-search")
const cardBody = document.querySelector(".card-body");
const clearButton = document.querySelector("#clear-btn")
// let modall = document.querySelector("#to__do-modal")
let todos = [];
// runEvents();

// function runEvents() {

// };
(function () {
    // Hadise dinleyicisini elave et
    document.addEventListener("DOMContentLoaded", DOMLoader);
    form.addEventListener("submit", addTodo);
    todoList.addEventListener("click", removeTodo);
    clearButton.addEventListener("click", clearAllTodos);
    searchInput.addEventListener("keyup", searchTodoUI)
})()

function DOMLoader() {
    checkTodoToStorage();
    todos.forEach(function (todo) {
        addTodoToYI(todo)
    })
};

function removeTodo(event) {
    if (event.target.className.includes("remove")) {
        //? UI dan silmek
        const todo = event.target.parentElement.parentElement;
        todo.remove();
        //? Storage den silmek
        deleteTodoToStorage(todo.children[0].textContent)
        //? Alert mesaji
        showAlert("success", "Görüləcək işlər uğurla silindi");
    }
};

function deleteTodoToStorage(todoStorage) {
    checkTodoToStorage();
    todos.forEach(function (todo, index) {
        if (todoStorage === todo) {
            todos.splice(index, 1);
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))
};

function addTodo(event) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        // alert("You have not entered any text.")
        showAlert("warning", "Siz heç bir mətn daxil etməmisiniz")
    }
    else {
        //? add todo to UI
        addTodoToYI(inputText);
        //? added todo to Storage
        addTodoToStorage(inputText);
        showAlert("success", "Görüləcək işlər uğurla əlavə edildi")
    }
    // Yenilenmenin qarsisini almaq
    event.preventDefault();
};

function addTodoToYI(inputText) {
    const li = document.createElement("li");
    li.style = "display:flex; justify-content:space-between; align-items:center;";
    li.className = "list-group-item";

    const span = document.createElement("span");
    span.textContent = inputText;

    const buttonCheck = document.createElement("a");
    buttonCheck.className = "btn btn-warning check";
    buttonCheck.textContent = "#";
    buttonCheck.href = "#";

    const buttonRemove = document.createElement("a");
    buttonRemove.className = "btn btn-danger remove";
    buttonRemove.textContent = "X";
    buttonRemove.href = "#";
    buttonRemove.style = "margin-left:20px;"

    const div = document.createElement("div");
    div.append(buttonRemove);

    li.append(span, div);
    todoList.appendChild(li);

    addInput.value = "";
};

function addTodoToStorage(inputText) {
    checkTodoToStorage();
    todos.push(inputText);
    localStorage.setItem("todos", JSON.stringify(todos));
};

function checkTodoToStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
};

function showAlert(type, message) {
    //     <div class="alert alert-primary" role="alert">
    //   A simple primary alert—check it out!
    // </div>
    const div = document.createElement("div");
    // div.className = "alert alert-" + type;
    div.className = `alert alert-${type}`;
    div.style = "margin-top:10px;"
    div.textContent = message;
    cardBody.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 2000);
};

function clearAllTodos() {
    const listItem = document.querySelectorAll(".list-group-item");
    if (listItem.length > 0) {
        //* Storage den silme
        todos = [];
        localStorage.removeItem("todos");
        //TODO localStorage.setItem("todos",JSON.stringify([]));
        //* UI dan silme
        listItem.forEach(function (todoItem) {
            todoItem.remove();
        })
        // todoList.textContent = "";
    } else {
        showAlert("warning", "Görüləcək işlər mövcud deyil");
    }
};

function searchTodoUI(event) {
    checkTodoToStorage();
    //! 1ci usul
    const todoListItem = document.querySelectorAll(".list-group-item");
    if (todoListItem.length > 0) {
        todoListItem.forEach(function (todo) {
            if (todo.children[0].textContent.toLowerCase().includes(event.target.value.toLowerCase().trim())) {
                todo.style.display = "flex"
            } else {
                todo.style.display = "none"
            }
        })
    }
    else {
        showAlert("warning", "Siz heç bir mətn daxil etməmisiniz")
    }
    //! 2 ci usul
    // todoList.innerHTML = "";
    // const filteredTodos = todos.filter(function (todo) {
    //     return todo.toLowerCase().includes(event.target.value.toLowerCase().trim());
    // });

    // filteredTodos.forEach(function (todo) {
    //     addTodoToYI(todo);
    // });

};













// let messageNot = function () {
//     if (input.value.length == 0) {
//         list.textContent = " "
//         input.nextElementSibling.textContent = "Empty message is not included!!!";
//         input.nextElementSibling.style.color = "red"
//     }
// }
// let removeModal = function () {
//     body.classList.remove("modal-body");
//     modall.style.visibility = "hidden";
//     modall.style.opacity = "0";
//     modall.style.transform = "translate(-50%, -50%) scale(0)";
// }
// input.addEventListener("keyup", () => {
//     input.nextElementSibling.textContent = "Empty message is not included!!!";
//     input.nextElementSibling.style.color = "black"
// })

// input.addEventListener("click", () => {
//     messageNot()
// })

// form.addEventListener("submit", (e) => {
//     let array = []
//     messageNot()
//     if (input.value.length > 0) {
//         list.innerHTML += `<li style="display:flex; justify-content:space-between; align-items:center;" class="list-group-item">
//             <span>${input.value}</span>
//             <div>
//             <button class="btn btn-warning check"><i class="fa-solid fa-check"></i></button>
//             <button class="btn btn-danger remove"><i class="fa-solid fa-trash"></i></button>
//             </div>
//             </li>`;
//         input.value = " "
//         input.nextElementSibling.textContent = " "
//         array.push(input.value)
//     }
//     //check
//     let check = document.querySelectorAll(".check");;
//     check.forEach((value) => {
//         value.addEventListener("click", function () {
//             this.parentElement.previousElementSibling.style.textDecoration = "line-through";
//         })
//     })

//     //remove
//     let remove = Array.from(document.querySelectorAll(".remove"))
//     remove.forEach((value) => {
//         value.addEventListener("click", (e) => {
//             e.preventDefault()
//             body.classList.add("modal-body");
//             modall.style.visibility = "visible";
//             modall.style.opacity = "1";
//             modall.style.transform = "translate(-50%, -50%) scale(1)";
//         })
//     })

//     //
//     modall.children[1].children[0].addEventListener("click", () => {
//         removeModal()
//         input.parentElement.nextElementSibling.textContent = " "
//     })

//     modall.children[1].children[1].addEventListener("click", () => {
//         removeModal()

//     })


//     e.preventDefault()
// })


