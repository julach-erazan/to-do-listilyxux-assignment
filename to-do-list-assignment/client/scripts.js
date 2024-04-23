let arr = [
    {
        note: "Hello 1"
    },
    {
        note: "Hello 2"
    }
]

const tasksList = document.getElementById('tasksList');

arr.map(task => {
    const taskElement = document.createElement('div');
    // taskElement.textContent = task.note;
    // // tasksList.appendChild(taskElement);
    console.log(task.note)
})

const handleSubmit = (e) => {
    e.preventDefault();
}

const addTask = (newTask) => {
    //some codse here
    console.log(newTask);
}

const updateTask = () => {
    //some codse here
}

const deleteTask = () => {
    //some codse here
}