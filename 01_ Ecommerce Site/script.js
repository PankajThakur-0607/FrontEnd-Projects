// document.addEventListener("DOMContentLoaded", () => {
//   const productList = document.getElementById("product-list");
//   const cartItems = document.getElementById("cart-items");
//   const cardTotalMessage = document.getElementById("cart-total");
//   const totalPriceDisplay = document.getElementById("total-price");
//   const checkOutBtn = document.getElementById("checkout-btn");
//   const emptyCartMessage = document.getElementById("empty-cart");

//   const products = [
//     { id: 1, name: "product 1", price: 19.99 },
//     { id: 2, name: "product 2", price: 89.99 },
//     { id: 3, name: "product 3", price: 59.99 },
//   ];

//   products.forEach((item, index) => {
//     const productDiv = document.createElement("div");
//     productDiv.classList.add("product");
//     productDiv.innerHTML = `
//     <span>${item.name} - ${item.price.toFixed(2)} </span>
//     <button data-id = "${item.id}"> Add to cart </button>
//     `;
//     productList.appendChild(productDiv);
//   });

//   productList.addEventListener("click", (e) => {
//     if (e.target.tagName === "BUTTON") {
//       let productId = parseInt(e.target.getAttribute("data-id"));
//       let product = products.find((p) => p.id === productId);
//       // console.log(product);
//       addTask(product);
//     }
//   });

//   let carts = JSON.parse(localStorage.getItem("carts")) || [];
//   if (carts.length > 0) {
//     renderCart();
//   }
//   function addTask(product) {
//     carts.push(product);
//     console.log(carts);
//     renderCart();
//     saveTask();
//   }

//   function renderCart() {
//     cartItems.innerHTML = "";
//     let totalPrice = 0;
//     if (carts.length > 0) {
//       cardTotalMessage.classList.remove("hidden");
//       // emptyCartMessage.classList.add("hidden");
//       carts.forEach((item, index) => {
//         totalPrice += item.price;

//         const itemsPrice = document.createElement("div");
//         itemsPrice.classList.add("product");
//         itemsPrice.innerHTML = `
//         <span> ${item.name} - ${item.price.toFixed(2)}</span>
//         <button delete-id = "${index}"> delete </button>
//         `;
//         cartItems.appendChild(itemsPrice);
//       });
//       totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
//     } else {
//       cardTotalMessage.classList.add("hidden");

//       const p = document.createElement("p");
//       p.textContent = `Your Cart is Empty`;
//       cartItems.appendChild(p);
//     }
//   }

//   checkOutBtn.addEventListener("click", () => {
//     alert("Chekout Completed");
//     carts.length = 0;
//     renderCart();
//     saveTask();
//   });

//   cartItems.addEventListener("click", (e) => {
//     if (e.target.tagName === "BUTTON") {
//       const deleteId = parseInt(e.target.getAttribute("delete-id"));
//       carts.splice(deleteId, 1);
//       renderCart();
//       saveTask();

//     }
//   });

//   function saveTask() {
//     localStorage.setItem("carts", JSON.stringify(carts));
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const cardTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  const products = [
    { id: 1, name: "product 1", price: 19.99 },
    { id: 2, name: "product 2", price: 89.99 },
    { id: 3, name: "product 3", price: 59.99 },
  ];

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
   <span> ${product.name} - ${product.price} </span>
   <button data-id = "${product.id}">Add to cart </button> 
   `;
    productList.appendChild(div);
  });

  let carts = JSON.parse(localStorage.getItem("carts")) || [];
  renderCartItem();
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let productId = parseInt(e.target.getAttribute("data-id"));
      let product = products.find((p) => p.id === productId);
      addTask(product);
      console.log(carts);
      renderCartItem();
      saveCart();
    }
  });

  function addTask(task) {
    carts.push(task);
    console.log(task);
  }

  function renderCartItem() {
    cartItems.innerHTML = "";
    if (carts.length > 0) {
      cardTotalMessage.classList.remove("hidden");
      let totalPrice = 0;
      carts.forEach((cart, index) => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
      <span> ${cart.name} - ${cart.price.toFixed(2)} </span>
      <button delete-id = "${cart.id}">delete task</button>
      `;

        totalPrice += cart.price;
        cartItems.appendChild(div);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      cartItems.innerHTML = `
    <p>Your Cart is Empty.</p>
    `;
      cardTotalMessage.classList.add("hidden");
    }
  }

  function saveCart() {
    localStorage.setItem("carts", JSON.stringify(carts));
  }

  checkOutBtn.addEventListener("click", () => {
    alert("The order has been shiped");
    carts.length = 0;
    saveCart();
    renderCartItem();
    totalPriceDisplay.textContent = `$0.00`;
    cardTotalMessage.classList.add("hidden");
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      let deleteId = parseInt(e.target.getAttribute("delete-id"));
      // console.log(deleteId);
      // carts.splice(deleteId, 1);
      carts = carts.filter((cart) => cart.id !== deleteId);
      renderCartItem();
      saveCart();
    }
  });
});
