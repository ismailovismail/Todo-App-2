const userInput = document.querySelector('.todo')
const form = document.querySelector('.todo-form')
const ul = document.querySelector('.liste').innerHTML
const li = document.querySelector('.liste li')
let todos = []
let todoId;
let todoIsEdit = false
let statusTodo = 'pending'
if (localStorage.getItem('todolist') === null) {
    todos = []
} else {
    todos = JSON.parse(localStorage.getItem('todolist'))
}

function add() {

    document.querySelector('.liste').innerHTML = ''
    todos.map((item) => {
        let status = item.status === 'completed' ? "completed" : "pending"
        let li = `<li><span onclick=(updateStatus(this)) id="${item.id}" class="${status}" >${item.title}</span> <div><button onclick=(deleteItem(${item.id})) class="remove-li" >Delete</button> <button onclick=(editItem(${item.id},"${item.title}"))>Edit</button></div> </li>`
        document.querySelector('.liste').innerHTML += li
    })

}
add()

form.onsubmit = (e) => {
    e.preventDefault()
    if (userInput.value === '') {
        alert('List is empty')

    } else {
        if (!todoIsEdit) {
            //add
            todos.push({ id: todos.length + 1, title: userInput.value, status: statusTodo })
        } else {
            //edit
            todos.find((item) => {
                if (item.id === todoId) {
                    item.title = userInput.value
                }
                todoIsEdit = false
            })
        }
        localStorage.setItem('todolist', JSON.stringify(todos))
        add()
        userInput.value = ''
    }
}

function deleteItem(id) {
    let deleteItem;
    deleteItem = todos.find((item) => {
        return item.id === id
    })
    todos.splice(deleteItem, 1)
    add()
    localStorage.setItem('todolist', JSON.stringify(todos))
}

function editItem(id, name) {
    todoId = id
    todoIsEdit = true
    userInput.value = name
    userInput.focus()
    localStorage.setItem('todolist', JSON.stringify(todos))
}

const clearBtn = document.querySelector('.clear')

const clearHandler = () => {
    todos.splice(0, todos.length)
    localStorage.setItem('todolist', JSON.stringify(todos))
    add()
}
clearBtn.addEventListener('click', clearHandler)

const updateStatus = (selectedTodo) => {

    if (selectedTodo.className === 'completed') {
        selectedTodo.className = 'pending'
        statusTodo = 'pending'
    } else {
        selectedTodo.className = 'completed'
        statusTodo = 'completed'
    }

    todos.map((item) => {
        if (item.id == selectedTodo.id) {
            item.status = statusTodo
        }
    })
    localStorage.setItem('todolist', JSON.stringify(todos))
    console.log(selectedTodo);
    console.log(todos);

}

