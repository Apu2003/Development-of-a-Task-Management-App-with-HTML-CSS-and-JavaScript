

document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const taskValue = taskInput.value.trim();
    const priorityValue = prioritySelect.value;

    if (taskValue) {
        const tasks = getTasksFromLocalStorage();
        const newTask = { id: Date.now(), task: taskValue, priority: priorityValue, completed: false };
        tasks.push(newTask);
        saveTasksToLocalStorage(tasks);
        appendTaskToDOM(newTask);
        taskInput.value = '';
    }
}

function appendTaskToDOM(task) {
    const tasksUl = document.getElementById('tasks-ul');
    const taskLi = document.createElement('li');
    taskLi.dataset.id = task.id;
    taskLi.className = `priority-${task.priority}`;

    const taskDiv = document.createElement('div');
    taskDiv.className = `task ${task.completed ? 'status-completed' : ''}`;
    taskDiv.textContent = task.task;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.addEventListener('click', () => toggleTaskCompletion(task.id));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', () => editTask(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    taskLi.appendChild(taskDiv);
    taskLi.appendChild(buttonsDiv);

    tasksUl.appendChild(taskLi);
}

function toggleTaskCompletion(taskId) {
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        saveTasksToLocalStorage(tasks);
        refreshTaskList();
    }
}

function editTask(taskId) {
    const taskInput = document.getElementById('task-input');
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        taskInput.value = tasks[taskIndex].task;
        deleteTask(taskId);
    }
}

function deleteTask(taskId) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(tasks);
    refreshTaskList();
}

function refreshTaskList() {
    const tasksUl = document.getElementById('tasks-ul');
    tasksUl.innerHTML = '';
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => appendTaskToDOM(task));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => appendTaskToDOM(task));
}
