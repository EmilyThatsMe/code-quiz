// Questions array
const questions = [
  {
    question: 'Commonly used data types DO NOT include:',
    answers: [
      { text: 'strings', correct: false },
      { text: 'booleans', correct: false },
      { text: 'alerts', correct: true },
      { text: 'numbers', correct: false },
    ],
  },
  {
    question:
      'The condition in an if / else statement is enclosed within ____.',
    answers: [
      { text: 'quotes', correct: false },
      { text: 'curly brackets', correct: false },
      { text: 'parentheses', correct: true },
      { text: 'square brackets', correct: false },
    ],
  },
  {
    question: 'Arrays in Javascript can be used to store ____.',
    answers: [
      { text: 'numbers and strings', correct: false },
      { text: 'other arrays', correct: false },
      { text: 'booleans', correct: false },
      { text: 'all of the above', correct: true },
    ],
  },
  {
    question:
      'String values must be enclosed within ____ when being assigned to variables.',
    answers: [
      { text: 'commas', correct: false },
      { text: 'curly brackets', correct: false },
      { text: 'quotes', correct: true },
      { text: 'parenthesis', correct: false },
    ],
  },
  {
    question:
      'A very useful tool for used during development and debugging for printing content to the debugger is:',
    answers: [
      { text: 'javascript', correct: false },
      { text: 'terminal/bash', correct: false },
      { text: 'for loop', correct: false },
      { text: 'console log', correct: true },
    ],
  },
];
// Variables
const startButton = document.getElementById('start-btn');
const startPage = document.getElementById('quiz-start');
const questionContainer = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerBtnEl = document.getElementById('answer-container');
const answerResponse = document.getElementById('answer-response');
const timer = document.getElementById('timer');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let secondsLeft = 76;
let penalty = 10;
let holdInterval = 0;

// Set timer

// Start button event listener
startButton.addEventListener('click', startGame);

// Start the game
function startGame() {
  console.log('started');
  // hide start page
  startPage.classList.add('hide');
  // shuffle questions
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  // show questions
  questionContainer.classList.remove('hide');
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = 'Time: ' + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        endQuiz();
        timer.textContent = "Time's up!";
      }
    }, 1000);
  }
  // set next question
  setNextQuestion();
}

// move to next question
function setNextQuestion() {
  // reset questions
  resetQuestion();
  // show current question
  showQuestion(shuffledQuestions[currentQuestionIndex++]);
}

// Populate question and answers in question container
function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerBtnEl.appendChild(button);
  });
}

// reset question
function resetQuestion() {
  // remove any children of answer button
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}

// When the user selects an answer
function selectAnswer() {
  // check if answer is correct
  answerBtnEl.addEventListener('click', setNextQuestion);
}

function endQuiz() {
  console.log('All done');
}
