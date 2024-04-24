const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Function to create a new todo item
function createTodoItem(todo) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.textContent = todo.text;
  if (todo.completed) {
    li.classList.add("completed");
  }
  li.addEventListener("click", () => {
    toggleTodoCompletion(todo._id, !todo.completed);
  });
  todoList.appendChild(li);
}

// Function to fetch todos from the server
async function fetchTodos() {
  const response = await fetch("/todos");
  const todos = await response.json();
  todos.forEach((todo) => {
    createTodoItem(todo);
  });
}

// Function to add a new todo
async function addTodo(text) {
  const response = await fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  const newTodo = await response.json();
  createTodoItem(newTodo);
}

// Function to toggle todo completion status
async function toggleTodoCompletion(id, completed) {
  const response = await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });
  if (response.ok) {
    const updatedTodo = await response.json();
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    todoItem.classList.toggle("completed", updatedTodo.completed);
  }
}

// Event listener for form submission
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  if (text !== "") {
    addTodo(text);
    todoInput.value = "";
  }
});

// Fetch todos when the page loads
fetchTodos();
