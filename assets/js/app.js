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
];
// Variables
const startButton = document.getElementById('start-btn');
const startPage = document.getElementById('quiz-start');
const questionContainer = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerBtnEl = document.getElementById('answer-container');

let shuffledQuestions, currentQuestionIndex;

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
  // set next question
  setNextQuestion();
}

// move to next question
function setNextQuestion() {
  // reset questions
  resetQuestion();
  // show current question
  showQuestion(shuffledQuestions[currentQuestionIndex]);
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
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}

// When the user selects an answer
function selectAnswer() {}
