// Questions array

// Variables
const startButton = document.getElementById('start-btn');
const startPage = document.getElementById('quiz-start');
const questionContainer = document.getElementById('question-container');
// Set timer

// Start button event listener
startButton.addEventListener('click', startGame);

// Start the game
function startGame() {
  console.log('started');
  // hide start page
  startPage.classList.add('hide');
  // show questions
  questionContainer.classList.remove('hide');
}

// move to next question
function setNextQuestion() {}

// When the user selects an answer
function selectAnswer() {}
