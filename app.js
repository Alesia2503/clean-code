let taskInput = document.getElementById("new-task");//Add a new task.
let addButton = document.querySelector(".add-btn");//first button
let incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incompleteTasks
let completedTasksHolder = document.getElementById("completed-tasks");//completed-tasks

//New task list item
let createNewTaskElement = function(taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");//checkbx
  let label = document.createElement("label");//label
  let editInput = document.createElement("input");//text
  let editButton = document.createElement("button");//edit button
  let deleteButton = document.createElement("button");//delete button
  let deleteButtonImg = document.createElement("img");//delete button image

  listItem.className = "tasks-item"
  label.innerText = taskString;
  label.className = 'tasks';
  checkBox.type = "checkbox";
  checkBox.className = "checkbox";
  editInput.type = "text";
  editInput.className = "input-task edit";
  editButton.innerText = "Edit"; 
  editButton.className = "edit-btn btn";
  deleteButton.className = "delete-btn btn";
  deleteButtonImg.className = "delete-btn-img";
  deleteButtonImg.src = 'remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



let addTask = function(){
  if (!taskInput.value) return;

  let listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value="";
}

//Edit an existing task.
let editTask = function() {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector('.input-task');
  let label = listItem.querySelector(".tasks");
  let editBtn = listItem.querySelector(".edit-btn");
  let containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
};

//Delete task.
let deleteTask = function(){
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
let taskCompleted = function(){
  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function(){
  //Append the task list item to the #incompleteTasks.
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

// let ajaxRequest = function() {
//     console.log("AJAX Request");
// }

//Set the click handler to the addTask function.
addButton.onclick = addTask;
// addButton.addEventListener("click",addTask);
// addButton.addEventListener("click",ajaxRequest);

let bindTaskEvents = function (taskListItem,checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector(".checkbox");
  let editButton = taskListItem.querySelector(".edit-btn");
  let deleteButton = taskListItem.querySelector(".delete-btn");
  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++) {
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}