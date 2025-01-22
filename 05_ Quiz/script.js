//   document.addEventListener("DOMContentLoaded", () => {
//   const startBtn = document.getElementById("start-btn");
//   const restartBtn = document.getElementById("restart-btn");
//   const nextBtn = document.getElementById("next-btn");
//   const choicesList = document.getElementById("choices-list");
//   const questionText = document.getElementById("question-text");
//   const questionContainer = document.getElementById("question-container");
//   const resultContainer = document.getElementById("result-container");
//   const scoreDisplay = document.getElementById("score");

//   const questions = [
//     {
//       question: "what is the capital of India ? ",
//       choices: ["Mumbai", "Ahemdabad", "Pune", "Delhi"],
//       answer: "Delhi",
//       mark: 1,
//     },
//     {
//       question: "what is the capital of Maharashtra ? ",
//       choices: ["Mumbai", "Ahemdabad", "Pune", "Delhi"],
//       answer: "Mumbai",
//       mark: 1,
//     },
//     {
//       question: "Who is the gonna be the king of the Pirate ? ",
//       choices: ["Monkey D. Luffy", "Shanks", "Captain Kid", "trafalgar Law"],
//       answer: "Monkey D. Luffy",
//       mark: 1,
//     },
//   ];

//   let currentQuestionIndex = 0;
//   let score = 0;
//   let questionAnswered;
//   startBtn.addEventListener("click", startQuiz);

//   function startQuiz() {
//     startBtn.classList.add("hidden");
//     resultContainer.classList.add("hidden");
//     questionContainer.classList.remove("hidden");
//     showQuestion();
//   }

//   function showQuestion() {
//     nextBtn.classList.add("hidden");
//     questionAnswered = false;
//     questionText.textContent = questions[currentQuestionIndex].question;
//     choicesList.innerHTML = "";
//     questions[currentQuestionIndex].choices.forEach((choice) => {
//       const li = document.createElement("li");
//       li.textContent = choice;

//       li.addEventListener("click", () => {
//         clearSelected();
//         li.classList.add("selected");
//         selectAnswer(choice);
//       });

//       choicesList.appendChild(li);
//     });
//   }
//   function clearSelected() {
//     const items = document.querySelectorAll("li");
//     items.forEach((item) => item.classList.remove("selected"));
//   }
//   function selectAnswer(choice) {
//     const correctAnswer = questions[currentQuestionIndex].answer;
//     if(choice === correctAnswer){
//       if(!questionAnswered){
//         score += questions[currentQuestionIndex].mark;
//         questionAnswered = true;
//       }
//     }else{
//       if(questionAnswered){
//         score -= questions[currentQuestionIndex].mark;
//       }
//     }
//     console.log(score);

//     nextBtn.classList.remove("hidden");
//   }

//   nextBtn.addEventListener("click", nextQuesitons);

//   function nextQuesitons() {
//     currentQuestionIndex++;
//     if (currentQuestionIndex < questions.length) {
//       showQuestion();
//     } else {
//       showResult();
//     }
//   }

//   function showResult() {
//     questionContainer.classList.add("hidden");
//     resultContainer.classList.remove("hidden");
//     scoreDisplay.textContent = `${score} out of ${questions.length}`;
//   }
//   restartBtn.addEventListener("click", restartQuiz);

//   function restartQuiz() {
//     currentQuestionIndex = 0;
//     score = 0;
//     resultContainer.classList.add("hidden");
//     startBtn.classList.remove("hidden");
//     questionText.classList.remove("hidden");
//     choicesList.classList.remove("hidden");
//   }
// });

const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const startBtn = document.getElementById("start-btn");

const questionText = document.getElementById("question-text");
const questionContainer = document.getElementById("question-container");
const choicesList = document.getElementById("choices-list");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");

const questions = [
  {
    question: "what is the capital of India ? ",
    choices: ["Mumbai", "Ahemdabad", "Pune", "Delhi"],
    answer: "Delhi",
    mark: 1,
  },
  {
    question: "what is the capital of Maharashtra ? ",
    choices: ["Mumbai", "Ahemdabad", "Pune", "Delhi"],
    answer: "Mumbai",
    mark: 1,
  },
  {
    question: "Who is the gonna be the king of the Pirate ? ",
    choices: ["Monkey D. Luffy", "Shanks", "Captain Kid", "trafalgar Law"],
    answer: "Monkey D. Luffy",
    mark: 1,
  },
];

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startBtn.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  showQuestion();
}

let currentQuestionIndex = 0;
let score = 0;
let questionAnswered;
function showQuestion() {
  choicesList.innerHTML = "";
  questionAnswered = false;
  nextBtn.classList.add("hidden");
  questionText.textContent = questions[currentQuestionIndex].question;
  questions[currentQuestionIndex].choices.forEach((choice) => {
    const li = document.createElement("li");
    li.textContent = choice;

    li.addEventListener("click", () => {
      console.log(choice);
      removeSelect();
      li.classList.add("selected");
      selectAnswer(choice);
    });

    choicesList.appendChild(li);
  });
}

function removeSelect() {
  document.querySelectorAll("li").forEach((list) => {
    list.classList.remove("selected");
  });
}

function selectAnswer(choice) {
  let correctAnswer = questions[currentQuestionIndex].answer;

  if (choice === correctAnswer) {
    if (!questionAnswered) {
      score += questions[currentQuestionIndex].mark;
      questionAnswered = true;
    }
  } else {
    if (questionAnswered) {
      score -= questions[currentQuestionIndex].mark;
      questionAnswered = false;
    }
  }
  console.log(score);

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", nextQuesitons);

function nextQuesitons() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    // startBtn.classList.add("hidden");
    // questionContainer.classList.remove("hidden");
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  resultContainer.classList.remove("hidden");
  questionContainer.classList.add("hidden");
  scoreDisplay.textContent = `scored ${score} out of ${questions.length}`;
}

restartBtn.addEventListener("click", restartQuiz);
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questionContainer.classList.add("hidden");
  resultContainer.classList.add("hidden");
  startBtn.classList.remove("hidden");
}
