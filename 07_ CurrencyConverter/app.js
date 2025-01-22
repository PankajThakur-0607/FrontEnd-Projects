// const apiURL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

// const dropdown = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");

// for (let select of dropdown) {
//   for (currCode in countryList) {
//     let newOption = document.createElement("option");
//     newOption.innerText = currCode;
//     newOption.value = currCode;
//     if (select.name === "from" && currCode === "USD") {
//       newOption.selected = "selected";
//     } else if (select.name === "to" && currCode === "INR") {
//       newOption.selected = "selected";
//     }
//     select.append(newOption);
//     // console.log(newOption);
//   }
//   select.addEventListener("change", (e) => {
//     console.log(e.target);

//     updateFlag(e.target);
//   });
// }

// const updateFlag = (element) => {
//   // console.log(element);
//   let currCode = element.value;
//   let countryCode = countryList[currCode];
//   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   let img = element.parentElement.querySelector("img");
//   img.src = newSrc;
// };

// btn.addEventListener("click", async (e) => {
//   e.preventDefault();
//   let amount = document.querySelector(".amount input");
//   let amtVal = amount.value;
//   if (amtVal === "" || amtVal < 1) {
//     amtVal = 1;
//     amount.value = "1";
//   }

//   let fromCurrency = fromCurr.value.toLowerCase();
//   console.log(fromCurrency);
//   let toCurrency = toCurr.value.toLowerCase();

//   console.log(toCurrency);
//   const URL = `${apiURL}/${fromCurrency}.json`;

//   let response = await fetch(URL);

//   let data = await response.json();
//   console.log(data);

//   let rate = data[fromCurrency][toCurrency];
//   console.log(rate);
//   let finalAmount = amount.value * rate;
//   console.log(finalAmount.toFixed(3));

//   msg.innerText = `The Amount is ${finalAmount.toFixed(3)}`;
// });

const dropdown = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const arrow = document.getElementById("arrow");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector(".amount input");
for (let select of dropdown) {
  for (let currCode in countryList) {
    // console.log(currCode , countryList[currCode]);

    const newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerHTML = currCode;
    // console.log(newOption);

    if (select.name === "from" && currCode == "USD") {
      newOption.selected = "selected";
      // console.log(newOption);
    } else if (select.name === "to" && currCode == "INR") {
      newOption.selected = "selected";
    }
    select.appendChild(newOption);
  }
  select.addEventListener("change", (e) => {
    // console.log(e.target);
    updateFlag(e.target);
  });
}

function updateFlag(element) {
  // console.log(element.value);
  let currCode = element.value;
  let countryCode = countryList[currCode];
  // console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = parseInt(amountInput.value);
  console.log(amount);
  if (amount === "" || amount < 0) {
    amount = 1;
  }

  let fromCurrency = fromCurr.value.toLowerCase();
  // console.log(fromCurrency);

  try {
    let currenciesData = await fetchData(fromCurrency);
    // console.log(currenciesData);

    showData(currenciesData, amount);
  } catch (error) {
    console.log({ message: error.message, name });
  }
  amountInput.value = 100;
});

async function fetchData(fromCurrency) {
  const url = `https://2024-03-06.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`;

  const response = await fetch(url);
  // console.log(response);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();
  // console.log(data);

  return data;
}

function showData(currencies, amount) {
  console.log(currencies);
  fromCurrency = fromCurr.value.toLowerCase();
  let toCurrency = toCurr.value.toLowerCase();
  let rate = currencies[fromCurrency][toCurrency];
  console.log(rate);

  console.log(amount);

  let totalCurrency = amount * rate;
  // console.log(totalCurrency.toFixed(2));

  msg.innerHTML = `
  <h5> The Amount is ${totalCurrency.toFixed(3)} ${toCurr.value}</h5>
  `;
}

arrow.addEventListener("click", (e) => {
  console.log("Arrow clicked");

  const fromValue = fromCurr.value;
  const toValue = toCurr.value;
  console.log(fromValue);
  console.log(toValue);

  fromCurr.value = toValue;
  toCurr.value = fromValue;

  updateFlag(fromCurr);
  updateFlag(toCurr);
});
