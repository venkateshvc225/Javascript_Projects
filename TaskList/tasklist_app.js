//create UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//create global events funtion
loadEvents();

//declaring loadEvents
function loadEvents(){
    //DOM reload event
    document.addEventListener('DOMContentLoaded',getTasks)
    //add task
    form.addEventListener('submit', addTask);
    //remove task
    taskList.addEventListener('click', deleteTask);
    //clear all tasks
    clearBtn.addEventListener('click',clearTasks);
    //filter task list
    filter.addEventListener('keyup',filterTasks)
}
//Dom reload get exiting tasks from Localstorage
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task){
        //create li items
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        //create text node and append to li
        const textNode = document.createTextNode(task);
        li.appendChild(textNode);
        //create anchor tag link element
        const link = document.createElement('a');
        //Add Class
        link.className = 'delete-item secondary-content';
        // Add delete icon of html
        link.innerHTML = '<i class="fa fa-remove" style = "color: orange"></i>';
        //append link to li
        li.appendChild(link);
        //append/insert li to ul in the HTML
        taskList.appendChild(li);
    });
}
//add Task event
function addTask(e){
    if(taskInput.value === ''){
        alert("Enter Task");
    }

    //create li items
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    //create text node and append to li
    const textNode = document.createTextNode(taskInput.value);
    li.appendChild(textNode);
    //create anchor tag link element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    // Add delete icon of html
    link.innerHTML = '<i class="fa fa-remove" style = "color: orange"></i>';
    //append link to li
    li.appendChild(link);
    //append/insert li to ul in the HTML
    taskList.appendChild(li);
    //Add tasks to localstorage
    storeTaskLocalStorage(taskInput.value);
    taskInput.value = '';
    //prevent form redirect behavior
    e.preventDefault();
}
//Defining storeTask to localstorage
function storeTaskLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Delete item event
function deleteTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure you want to delete'))
        {
            e.target.parentElement.parentElement.remove();
        }
        //Remove from LS
        removeTaskFromLS(e.target.parentElement.parentElement);
        //console.log(e.target);
    }    
    
}
//remove task from LS
function removeTaskFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//clear all tasks
function clearTasks(e)
{
    //taskList.innerHTML = "";
    //better way and faster way is
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }
    //clear tasks from local storage
    clearTasksFromLS();

}

//Clear tasks from LS
function clearTasksFromLS(){
    localStorage.clear();
}
//Filter tasks based on search
function filterTasks(e)
{
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent; 
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
}