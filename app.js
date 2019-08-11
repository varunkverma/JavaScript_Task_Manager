// Define UI variables

const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const filter=document.querySelector('#filter');
const clearBtn=document.querySelector('.clear-tasks');
const taskInput=document.querySelector('#task');

//load all event handlers
loadEventListeners();

function loadEventListeners(){
    //DOM Content load event
    document.addEventListener('DOMContentLoaded',getTasks);

    // add task event
    form.addEventListener('submit',addTask);

    //Remove task event
    taskList.addEventListener('click',removeTask);

    //Clear all tasks event
    clearBtn.addEventListener('click',clearAllTasks);

    //Filter task event
    filter.addEventListener('keyup',filterTasks);

}

function getTasks(e)
{
    //Getting tasks from localStorage and JSONifying them to be used.
    tasks=JSON.parse(localStorage.getItem('tasks'));

    if(tasks != null)
    {
        // Iterating through all the tasks
        tasks.forEach(function(task){

            //Creating a li element
            let liTask=document.createElement('li');

            //Adding a class to li element
            liTask.className='collection-item';

            //Adding text to li
            liTask.textContent=task;

            // Creating a link element
            let link=document.createElement('a');

            //adding class to the link
            link.className ='delete-item secondary-content'; 
            //secondary-content puts stuff at the right of the content

            //Add icon html
            link.innerHTML='<i class="fa fa-remove"></i>';

            //append link to li
            liTask.appendChild(link);

            //adding li to ui
            taskList.appendChild(liTask);
        });
        
    }
}

function addTask(e)
{
    //Check for valid input
    let taskName=taskInput.value;
    if(taskName === '')
    {
        alert('Add a task'); 
    } 
    else{
        //Create li element
        let li=document.createElement('li');
        //Add class to li element
        li.classList.add('collection-item')
        
        //Create text node and append to li
        let textNode=document.createTextNode(taskInput.value);
        //alert(textNode);
        li.appendChild(textNode);
        
        //Create a link element

        let link=document.createElement('a');
        link.className ='delete-item secondary-content'; 
        //secondary-content puts stuff at the right of the content

        //Add icon html
        link.innerHTML='<i class="fa fa-remove"></i>';

        //append link to li
        li.appendChild(link);

        //apped li to ul
        taskList.appendChild(li);
        
        //Store task in local storage

        storeTaskInLocalStorage(taskInput.value);
        
        // Clear task after adding it
        taskInput.value='';

    }
    e.preventDefault();
}

function storeTaskInLocalStorage(task)
{
    let tasks=localStorage.getItem('tasks');
    if(tasks === null)
    {
        tasks=[];
    }
    else{
        tasks=JSON.parse(tasks);
    }
    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
    
}

function removeTask(e)
{
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure?'))
        {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement.textContent);
        }
    }
}

function removeTaskFromLocalStorage(taskName)
{
    let tasks=JSON.parse(localStorage.getItem('tasks'));

    tasks.splice(tasks.indexOf(taskName),1);
    
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function clearAllTasks(e)
{
    if(confirm('Delete all tasks?'))
    {
        // let tasks=taskList.children;
        // let tasksArr=Array.from(tasks);
        // tasksArr.forEach(function(task){
        //     task.remove();
        // });

        while(taskList.firstChild)
        {

            //removeTaskFromLocalStorage(taskList.firstChild.value);
            //OR
            clearAllTasksFromLocalStorage();
            taskList.removeChild(taskList.firstChild);

        }
        
    }
    
}

function clearAllTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e)
{
    let text=e.target.value;
    let allTasks=document.querySelectorAll('.collection-item');
    allTasks.forEach(function(task){
        if(task.firstChild.textContent.toLowerCase().indexOf(text) != -1){
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }
    })
    
}