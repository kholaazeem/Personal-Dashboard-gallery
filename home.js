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

// //             ADD INSERT DATA

// let todoTitle = document.getElementById("todoTitle");
// let todoPriority = document.getElementsByName("taskPriority");
// let todoDesc = document.getElementById("todoDesc");
// let btnAddTask = document.getElementById("btnAddTask");
// let taskContainer = document.getElementById("taskContainer")

// let editId = null;

// async function _addTodo() {
//   let selectedPriority;

//   for (let p of todoPriority) {
//     if (p.checked) {
//       selectedPriority = p.value;
//     }
//   }

//   if (!todoTitle.value || !todoDesc.value || !selectedPriority) {
//     Swal.fire({
//       title: "Missing Information",
//       text: "Please fill all fields and select a priority.",
//       icon: "warning",
//     });
//     return;
//   }

//   if (editId) {
//     try {
//       const { error } = await supabase
//         .from("Todos")
//         .update({
//           title: todoTitle.value,
//           priority: selectedPriority,
//           description: todoDesc.value,
//         })
//         .eq("id", editId);

//       if (error) {
//         console.log("Error updating data ", error);
//       } else {
//         Swal.fire({
//           title: "Updated!",
//           text: "Task updated successfully.",
//           icon: "success",
//         });
//         editId = null;
//       }
//     } catch (err) {
//       console.log("Error while updating ", err);
//     }
//   }

//   else {
//     try {
//       const { error } = await supabase.from("Todos").insert({
//         title: todoTitle.value,
//         priority: selectedPriority,
//         description: todoDesc.value,
//       });

//       if (error) {
//         console.log("Error in inserting data →", error);
//         Swal.fire({
//           title: "Error!",
//           text: "Something went wrong while adding the task.",
//           icon: "error",
//         });
//       } else {
//         Swal.fire({
//           title: "Added!",
//           text: "Task added successfully.",
//           icon: "success",
//         });

//       }
//     } catch (err) {
//       console.log("Error while inserting ", err);
//     }
//   }
// }

// btnAddTask.addEventListener("click", _addTodo);

// //       Fetch data

// async function fetchTodos() {
//   try {
//     const { data, error } = await supabase.from("Todos").select("*");
//     if (error) console.log(error);
//     else displayTodos(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// function displayTodos(todos) {
//   taskContainer.innerHTML = "";
//   if (!todos.length) {
//     taskContainer.innerHTML = `<div class="alert alert-info w-100 text-center">No tasks yet!</div>`;
//     return;
//   }

//   todos.forEach(todo => {
//     const color =
//       todo.priority === "High"
//         ? "danger"
//         : todo.priority === "Medium"
//           ? "warning text-dark"
//           : "success";

//     taskContainer.innerHTML += `
//      <div class="card todo-card shadow-sm border-0">
//   <div class="card-body d-flex flex-column justify-content-between h-100">
//     <h5 class="card-title text-primary fw-bold text-truncate" title="${todo.title}">${todo.title}</h5>
//     <p class="card-text flex-grow-1 text-truncate-2" title="${todo.description}">${todo.description}</p>
//     <span class="badge bg-${color} mb-2">${todo.priority}</span>
//     <div class="d-flex justify-content-between mt-auto">
//       <button class="btn btn-outline-secondary btn-sm" onclick="editTodo(${todo.id},'${todo.title}','${todo.description}','${todo.priority}')">Edit</button>
//       <button class="btn btn-outline-secondary btn-sm" onclick="dltTodo(${todo.id},'${todo.title}','${todo.description}','${todo.priority}')">Delete</button>
//     </div>
//   </div>
// </div>
// `;

//   });
// }

// window.editTodo = function (id, titl, desc,prio  ) {

//   todoDesc.value = desc;
//   todoTitle.value = titl

//   // console.log(selectedPriority);
//   // radio.forEach(onepri => {
//   //   if (onepri.value == prio) {
//   //     onepri.checked = onepri.value == prio
//   //   }
//   // })

//   let todoPriority = document.getElementsByName("taskPriority");

//   // Loop through all the radio buttons and check the one that matches 'prio'
//   for (let p of todoPriority) {
//     if (p.value === prio) {
//       p.checked = true;  // Set the matching radio button to checked
//     } else {
//       p.checked = false; // Uncheck the others
//     }
//   }

// }

// fetchTodos();

              

let todoTitle = document.getElementById("todoTitle");
let todoPriority = document.getElementsByName("taskPriority");
let todoDesc = document.getElementById("todoDesc");
let btnAddTask = document.getElementById("btnAddTask");
let taskContainer = document.getElementById("taskContainer");

                 //Add/insert data in tables/database

async function insertData(){
             
  let selecPrio;

  for (let p of todoPriority) {
    if(p.checked){
      selecPrio = p.value
    }
  }

if(!todoTitle || !todoDesc || !selecPrio){
  alert("Please fill all fields")
  return;
}


const { error } = await supabase
.from('Todos')
.insert({ 
  title: todoTitle.value,
  priority: selecPrio,
  description: todoDesc.value
})
 if(error){
  console.log("Error in inserting data in tables:", error)
 }else{
  alert("successfully added data  in tables/Database")
 }

  


} 

btnAddTask.addEventListener("click",insertData)


                  // Fetch data from tables/db 

async function fetchData(){
 
  const { data, error } = await supabase
  .from('Todos')
  .select("*");

  if(error){
    console.log("Error in fetching Data from tables/supabase",error)
    return
  }else{
    alert("Data fetch succefully",data)
    taskContainer.innerHTML += 
    `
          <div class="card todo-card shadow-sm border-0">
       <div class="card-body d-flex flex-column justify-content-between h-100">
         <h5 class="card-title text-primary fw-bold text-truncate" title="${todoTitle.title}">${todoTitle.title}</h5>
         <p class="card-text flex-grow-1 text-truncate-2" title="${todoDesc.description}">${todoDesc.description}</p>
         <span class="badge bg- mb-2">${todoPriority.priority}</span>
        <div class="d-flex justify-content-between mt-auto">
          <button class="btn btn-outline-secondary btn-sm" onclick="editTodo(${todoTitle.id},'${todoTitle.title}','${todoDesc.description}','${todoPriority.priority}')">Edit</button>
          <button class="btn btn-outline-secondary btn-sm" onclick="dltTodo(${todoTitle.id},'${todoTitle.title}','${todoDesc.description}','${todoPriority.priority}')">Delete</button>
        </div>
      </div>
    </div>;
  `

}                  
          
}
fetchData()