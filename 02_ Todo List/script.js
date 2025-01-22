// document.addEventListener("DOMContentLoaded", (e) => {
//   const todoInput = document.getElementById("todo-input");
//   const addTaskButton = document.getElementById("add-task-button");
//   const addListButton = document.getElementById("todo-list");

//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   tasks.forEach((task) => {
//     renderTask(task);
//   });
//   addTaskButton.addEventListener("click", () => {
//     let taskInput = todoInput.value.trim();
//     if (taskInput === "") return;

//     const newTask = {
//       id: Date.now(),
//       text: taskInput,
//       completed: false,
//     };

//     tasks.push(newTask);
//     renderTask(newTask);
//     savetask();
//     todoInput.value = "";
//     console.log(tasks);
//   });

//   function savetask() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }

//   function renderTask(task) {
//     let li = document.createElement("li");
//     if (task.completed) li.classList.add("completed");
//     li.innerHTML = `
//     <span>${task.text}</span>
//     <button> delete </button>
//     `;

//     li.addEventListener("click", (e) => {
//       if (e.target.tagName === "BUTTON") return;

//       task.completed = !task.completed;
//       li.classList.toggle("completed");
//       savetask();
//     });
//     li.querySelector("button").addEventListener("click", (e) => {
//       e.stopPropagation();
//       tasks = tasks.filter((t) => {
//         return t.id !== task.id;
//       });
//       li.remove();
//       savetask();
//     });
//     addListButton.appendChild(li);
//   }
// });

// // document.addEventListener("DOMContentLoaded", () => {
// //   const todoInput = document.getElementById("todo-input");
// //   const addTaskButton = document.getElementById("add-task-button");
// //   const todoList = document.getElementById("todo-list");

// //   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// //   tasks.forEach((task) => {
// //     renderTask(task);
// //   });

// //   addTaskButton.addEventListener("click", () => {
// //     let taskText = todoInput.value.trim();
// //     if (taskText === "") return;

// //     const newTask = {
// //       id: Date.now(),
// //       text: taskText,
// //       completed: false,
// //     };

// //     tasks.push(newTask);
// //     savetask(newTask);
// //     renderTask(newTask);
// //     todoInput.value = "";
// //     console.log(tasks);
// //   });

// // function renderTask(task) {
// //   const li = document.createElement("li");
// //   li.setAttribute("data-id", task.id);
// //   if (task.completed) li.classList.add("completed");
// //   li.innerHTML = `
// //   <span>${task.text} </span>
// //   <button> delete </button>
// //   `;

// //   li.addEventListener("click", (e) => {
// //     if (e.target.tagName === "BUTTON") return;
// //     task.completed = !task.completed;
// //     li.classList.toggle("completed");
// //     savetask();
// //   });

// //   li.querySelector("button").addEventListener("click", (e) => {
// //     e.stopPropagation();
// //     tasks = tasks.filter((t) => {
// //       return t.id !== task.id;
// //     });
// //     li.remove();
// //     savetask();
// //   });
// //   todoList.appendChild(li);
// // }

// //   function savetask() {
// //     localStorage.setItem("tasks", JSON.stringify(tasks));
// //   }
// // });

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-button");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTask();
  addTaskButton.addEventListener("click", () => {
    let taskInput = todoInput.value.trim();
    if (taskInput === "") return;

    todoInput.value = "";
    console.log(taskInput);

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };
    addTask(newTask);
    saveTask();
    renderTask();
    console.log(tasks);
  });

  function renderTask() {
    todoList.textContent = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      if (task.completed) li.classList.add("completed");

      li.innerHTML = `
   <span > ${task.text} </span>
   <button data-id="${task.id}"> delete</button>
   `;

      li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTask();
      });

      li.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        tasks = tasks.filter((t) => task.id !== t.id);
        li.remove();
        saveTask();
      });
      todoList.appendChild(li);
    });
  }

  function addTask(task) {
    tasks.push(task);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
