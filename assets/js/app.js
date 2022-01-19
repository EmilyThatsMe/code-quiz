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
const highScore = document.getElementById('highscores');
const scoreSubmit = document.getElementById('submit');
const submitInitials = document.getElementById('initials');
const scoresPage = document.getElementById('all-scores');
const goBack = document.getElementById('go-back');
const viewScores = document.getElementById('view-scores');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let secondsLeft = 76;
let penalty = 10;
let holdInterval = 0;

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
  // start timer
  // If timer is set above zero then start countdown
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = 'Time: ' + secondsLeft;
      // if timer is less than zero, end quiz
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
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
  }
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
function selectAnswer(event) {
  const element = event.target;
  const correct = element.dataset.correct;
  // if the answer is correct add to score and show "correct"
  if (correct) {
    score++;
    answerResponse.innerText = 'correct';
    setNextQuestion();
    // if answer is incorrect deduct 10 seconds from time and show "wrong"
  } else {
    secondsLeft = secondsLeft - penalty;
    answerResponse.innerText = 'wrong';
    setNextQuestion();
  }
}

// end quiz
function endQuiz() {
  console.log('All done');
  // hide questions
  questionContainer.classList.add('hide');
  // show high score page
  highScore.classList.remove('hide');
  // calculates time remaining and score
  if (secondsLeft >= 0) {
    let timeRemaining = secondsLeft;
    const createP = document.createElement('p');
    clearInterval(holdInterval);
    createP.textContent = 'Your final score is: ' + timeRemaining;
    // appends calculated score to initials page
    highScore.appendChild(createP);
  }
}

// Save scores
scoreSubmit.addEventListener('click', function () {
  event.preventDefault();
  console.log('clicked');
  highScore.classList.add('hide');
  scoresPage.classList.remove('hide');
  // calculate final score
  const initials = submitInitials.value;
  let timeRemaining = secondsLeft;
  const finalScore = {
    initials: initials,
    score: timeRemaining,
  };
  console.log(finalScore);
  // save scores to localStorage
  let allScores = localStorage.getItem('allScores');
  if (allScores === null) {
    allScores = [];
  } else {
    allScores = JSON.parse(allScores);
  }
  allScores.push(finalScore);
  const savedScore = JSON.stringify(allScores);
  localStorage.setItem('allScores', savedScore);
  // render score to page
  renderScore();
});

// render score function
function renderScore() {
  // get score from localStorage
  let allScores = localStorage.getItem('allScores');
  allScores = JSON.parse(allScores);
  // render all scores to page as a list element
  for (var i = 0; i < allScores.length; i++) {
    const createLi = document.createElement('li');
    createLi.textContent = allScores[i].initials + ' ' + allScores[i].score;
    scoresPage.appendChild(createLi);
  }
}

// got back button returns to start page
goBack.addEventListener('click', function () {
  scoresPage.classList.add('hide');
  startPage.classList.remove('hide');
});

// view scores button functionality
viewScores.addEventListener('click', function () {
  scoresPage.classList.remove('hide');
  startPage.classList.add('hide');
  questionContainer.classList.add('hide');
  highScore.classList.add('hide');
});
