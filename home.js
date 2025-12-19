import supabase from "./config.js";

let username = document.getElementById("username");
//  fetch data of current  user
async function userFetch() {
  try {
    const { data, error } = await supabase.auth.getUser();
    console.log(data);

    if (data) {
      username.innerHTML = data.user.user_metadata.name;
    }
  } catch (error) {
    console.log(error);
  }
}

userFetch();


let todoTitle = document.getElementById("todoTitle");
let todoPriority = document.getElementsByName("taskPriority");
let todoDesc = document.getElementById("todoDesc");
let btnAddTask = document.getElementById("btnAddTask");
let taskContainer = document.getElementById("taskContainer");
let editId = null;

//Manage data

async function manageData() {
  let selecPrio;

  for (let p of todoPriority) {
    if (p.checked) {
      selecPrio = p.value;
    }
  }

  if (!todoTitle || !todoDesc || !selecPrio) {
    alert("Please fill all fields");
    return;
  }

  //  Update/Edit data in tables/database

  if (editId) {
    const { data, error } = await supabase
      .from("Todos")
      .update({
        title: todoTitle.value,
        description: todoDesc.value,
        priority: selecPrio,
      })
      .eq("id", editId)
      .select("*");

    if (error) {
      console.log("Error in updating data in tables/db:", error);
    } else {
      Swal.fire({
        title:"Good job!",
        text: "Task Updated Successfully!",
        icon: "success"});
    
      editId = null;
      btnAddTask.innerHTML = "Add Task";

              //  Empty all inputs
      todoDesc.value = "";
      todoTitle.value = "";
      todoPriority.forEach(p => {
        p.checked = false
      }) 

          //  Fetch updated data from tables/db
      fetchData();
    }
  }

  //Add/insert data in tables/database
  else {
    const { error } = await supabase.from("Todos").insert({
      title: todoTitle.value,
      priority: selecPrio,
      description: todoDesc.value,
    });
    if (error) {
      console.log("Error in inserting data in tables:", error);
    } else {
      Swal.fire({
        title:"Good job!",
        text: "Task Added Successfully!",
        icon: "success"});
        
              //  Fetch updated data from tables/db
      fetchData();
      
            //  Empty all inputs
      todoDesc.value = "";
      todoTitle.value = "";
      todoPriority.forEach(p => {
        p.checked = false
      })
    }
  }
}
btnAddTask.addEventListener("click", manageData);

// Fetch data from tables/db

async function fetchData() {
  const { data, error } = await supabase
  .from("Todos")
  .select("*");

  if (error) {
    console.log("Error in fetching Data from tables/supabase", error);
    return;
  } else {
    ShowDAta(data);
    console.log("Fetched data from tables/supabase", data);
  }
}

//  Show data in UI
function ShowDAta(todos) {
  taskContainer.innerHTML = "";
  if (!todos.length) {
    taskContainer.innerHTML = `<div class="alert alert-info w-100 text-center">No tasks yet!</div>`;
    return;
  }

  todos.forEach((todo) => {
    let badgeClass = "";
    if (todo.priority === "High") {
      badgeClass = "bg-danger-subtle text-danger border border-danger";
    } else if (todo.priority === "Medium") {
      badgeClass = "bg-warning-subtle text-dark border border-warning";
    } else {
      badgeClass = "bg-success-subtle text-success border border-success";
    }

    taskContainer.innerHTML += `
   <div class="todo-card">
      <div class="card-body">
        
        <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="task-title" title="${todo.title}">${todo.title}</h5>
            <span class="badge ${badgeClass} rounded-pill px-3 py-2">${todo.priority}</span>
        </div>
        
        <p class="task-desc" title="${todo.description}">
            ${todo.description}
        </p>
        
        <div class="card-footer-custom">
            <button class="btn btn-outline-primary btn-sm"  onclick="editBtn('${todo.id}','${todo.title}','${todo.description}','${todo.priority}')">
                <i class="fa-solid fa-pen-to-square me-1"></i> Edit
            </button>
            <button class="btn btn-outline-danger btn-sm" onclick="dltBtn('${todo.id}')">
                <i class="fa-solid fa-trash-can me-1"></i> Delete
            </button>
        </div>

      </div>
    </div>
    `;
  });
}


      // Edit data

window.editBtn = function (id, title, descrip, prior) {   //use global fnx bcz in module scope onclick  doesnt work
  //  fill inputs with previous data

  todoTitle.value = title;
  todoDesc.value = descrip;

  for (let p of todoPriority) {
    if (p.value === prior) {
      p.checked = true;
    }
  }
  alert("You can now edit the task in the input fields.");
  editId = id;

  btnAddTask.innerHTML = "Update Task";
};

    //  Delete data

window.dltBtn = async function (id ){
 
  editId = id;
  alert("Are you sure you want to delete this task?");
  
  const { data, error } = await supabase
  .from('Todos')
  .delete()
  .eq('id', editId)
  .select('*')

  if(error){
    console.log("Error in deleting data from tables/db:", error)
  }else{
    Swal.fire({
      title:"Good job!",
      text: "Task Deleted Successfully!",
      icon: "success"});
        //  Fetch updated data from tables/db
    fetchData();}
}


fetchData();
