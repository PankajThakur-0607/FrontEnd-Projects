// let randomNumber = parseInt(Math.random() * 100 + 1);
// console.log(randomNumber);

// const submit = document.querySelector("#subt");
// const userInput = document.querySelector("#guessField");
// const guessSlot = document.querySelector(".guesses");
// const remaining = document.querySelector(".lastResult");
// const lowOrHi = document.querySelector(".lowOrHi");
// const startOver = document.querySelector(".resultParas");

// const button = document.createElement("button");
// let numGuess = 1;
// let playGame = true;
// let prevGuess = [];

// if (playGame) {
//   submit.addEventListener("click", function (e) {
//     e.preventDefault();
//     const guess = parseInt(userInput.value);
//     console.log(guess);
//     ValidateGuess(guess);
//   });
// }

// function ValidateGuess(guess) {
//   if (isNaN(guess)) {
//     alert("Enter the Valid Number");
//   } else if (guess < 1) {
//     alert("Enter the Number Greater than 1");
//   } else if (guess > 100) {
//     alert("Enter the number Less than 100");
//   } else {
//     prevGuess.push(guess);
//     console.log(prevGuess);
//     if (numGuess === 11) {
//       displayMessage(
//         `Game Over Bro Better Luck next Time! Random Number was ${randomNumber}`
//       );
//       endGame();
//     } else {
//       displayGuess(guess);
//       checkGuess(guess);
//     }
//   }
// }

// function checkGuess(guess) {
//   if (guess == randomNumber) {
//     displayMessage(`Horraaay You Guesses it right`);
//     endGame();
//   } else if (guess < randomNumber) {
//     displayMessage(`oopss ... The number is tooo Low`);
//   } else {
//     displayMessage(`oopss the Number is too high`);
//   }
// }

// function displayGuess(guess) {
//   userInput.value = "";
//   guessSlot.innerHTML += `  ${guess}`;
//   // console.log(guessSlot);
//   remaining.innerHTML = `${10 - numGuess}`;
//   numGuess++;
// }

// function displayMessage(message) {
//   lowOrHi.innerHTML = ` <h2> ${message} </h2>`;
// }

// function endGame() {
//   userInput.value = "";
//   userInput.setAttribute("disabled", "");
//   button.classList.add("button");
//   button.id = "newGame";
//   button.innerHTML = "Start new Game";
//   startOver.appendChild(button);
//   playGame = false;

//   newGame();
// }

// function newGame() {
//   const newGameButton = document.querySelector("#newGame");
//   newGameButton.addEventListener("click", function () {
//     playGame = true;
//     userInput.removeAttribute("disabled");
//     guessSlot.innerHTML = "";
//     prevGuess = [];
//     numGuess = 1;
//     remaining.innerHTML = `${10 - numGuess}`;
//     randomNumber = parseInt(Math.random() * 100 + 1);
//     startOver.removeChild(newGameButton);
//   });
// }

let randomNumber = parseInt(Math.random() * 100 + 1);
let prevGuess = [];
let numGuessed = 1;
let playGame = true;

const guessField = document.getElementById("guessField");
const submitBtn = document.getElementById("subt");
const guessSlot = document.querySelector(".guesses");
const remainingGuess = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const newGameBtn = document.getElementById("newGame");

if (playGame) {
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const userInput = parseInt(guessField.value.trim());
    console.log(userInput);
    guessField.value = "";
    validateUser(userInput);
  });
}

function validateUser(user) {
  if (isNaN(user)) {
    alert("please type the number only ");
  } else if (user < 1) {
    alert("please type above 1 ");
  } else if (user > 100) {
    alert("please type below 100");
  } else {
    prevGuess.push(user);
    console.log(prevGuess);
    if (numGuessed === 11) {
      displayMessage(`You Lost , The Number was : ${randomNumber}`);
      endGame();
    } else {
      displayGuess(user);
      checkGuess(user);
    }
  }
}

function checkGuess(user) {
  if (user === randomNumber) {
    displayMessage(`Horray You Guessed the correct Number`);
    endGame();
  } else if (user < randomNumber) {
    displayMessage(`OOPS The Number is Too Low`);
  } else {
    displayMessage(`OOPS The Number is Too High`);
  }
}

function displayGuess(user) {
  guessSlot.textContent += `${user}  `;
  console.log(numGuessed);

  remainingGuess.textContent = `${10 - numGuessed}`;
  numGuessed++;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  playGame = false;
  guessField.setAttribute("disabled", "");
  newGameBtn.classList.remove("hidden");
}

newGameBtn.addEventListener("click", () => {
  playGame = true;
  prevGuess.length = 0;
  guessSlot.textContent = "";
  remainingGuess.textContent = 10;
  lowOrHi.innerHTML = "";
  numGuessed = 1;
  guessField.removeAttribute("disabled");
  newGameBtn.classList.add("hidden");
  randomNumber = parseInt(Math.random() * 100 + 1);
});
