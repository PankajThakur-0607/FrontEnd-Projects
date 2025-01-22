// document.addEventListener("DOMContentLoaded", () => {
//   const expenseForm = document.getElementById("expense-form");
//   const expenseNameInput = document.getElementById("expense-name");
//   const expenseAmountInput = document.getElementById("expense-amount");
//   const expenseList = document.getElementById("expense-list");
//   const totalAmountDisplay = document.getElementById("total-amount");

//   let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
//   renderExpenses();
//   let totalAmount = calculateTotal();
//   updateTotal();

//   expenseForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const name = expenseNameInput.value.trim();
//     const amount = parseFloat(expenseAmountInput.value);

//     if (name !== "" && !isNaN(amount) && amount > 0) {
//       const newExpense = {
//         id: Date.now(),
//         name, // name : name
//         amount, // amount : amount
//       };

//       expenses.push(newExpense);
//       //   console.log(expenses);
//       saveExpenseTLocal();
//       renderExpenses();
//       updateTotal();
//     }

//     // clear inputs
//     expenseAmountInput.value = "";
//     expenseNameInput.value = "";
//   });

//   function calculateTotal() {
//     return expenses.reduce((sum, expense) => sum + expense.amount, 0);
//   }

//   function saveExpenseTLocal() {
//     localStorage.setItem("expenses", JSON.stringify(expenses));
//   }

//   function updateTotal() {
//     totalAmount = calculateTotal();

//     totalAmountDisplay.textContent = totalAmount.toFixed(2);
//   }

//   function renderExpenses() {
//     expenseList.innerHTML = "";
//     expenses.forEach((expense , index) => {
//       const li = document.createElement("li");
//       li.innerHTML = `
//         <span>${expense.name} - $${expense.amount}</span>
//         <button data-id="${expense.id}"> delete </button>
//         `;
//       expenseList.appendChild(li);
//     });
//   }

//   expenseList.addEventListener("click", (e) => {
//     if (e.target.tagName === "BUTTON") {
//       const buttonId = parseInt(e.target.getAttribute("data-id"));
//         console.log(buttonId);

//       // Update the expenses array with the filtered result
//       expenses = expenses.filter((expense) => expense.id !== buttonId);

//     // expenses.splice(buttonId , 1);

//       // Save updated expenses to localStorage
//       saveExpenseTLocal();

//       // Re-render the list and update the total amount
//       renderExpenses();
//       updateTotal();
//     }
//   });
// });

document.addEventListener('DOMContentLoaded' , () => {
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  renderExpenses();
  let totalAmount = calculateTotal();
  updateAmount();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = expenseNameInput.value.trim();
    const amount = parseInt(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        name,
        amount,
        id: Date.now(),
      };

      addExpenses(newExpense);
      saveExpenses();
      renderExpenses();
      updateAmount();
      // console.log(expenses);
      expenseAmountInput.value = "";
      expenseNameInput.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
    <span> ${expense.name} - $${expense.amount}</span>
    <button delete-id="${expense.id}" > delete </button>
    `;
      expenseList.appendChild(li);
    });
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let buttonId = parseInt(e.target.getAttribute("delete-id"));
      console.log(typeof buttonId);

      expenses = expenses.filter((expense) => expense.id !== buttonId);
      renderExpenses();
      saveExpenses();
      updateAmount();
    }
  });

  function addExpenses(newExpense) {
    expenses.push(newExpense);
  }

  function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculateTotal() {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }

  function updateAmount() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

})