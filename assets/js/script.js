var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var submitButton = document.getElementById('submit-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')
var submitContainerEl = document.getElementById('submit-box')
var usernameEl = document.getElementById('name-input')
var saveButtonEl = document.getElementById('save-btn')
var leaderboardEl = document.getElementById('leaderboard')

const startingMins = 1
let time = startingMins * 60
var countdownEl = document.getElementById('countdown')

let points = 0
const highScores = JSON.parse(localStorage.getItem('highscores')) || []

function updateCountdown() {
    const minutes = Math.floor(time/60)
    let seconds = time % 60
    seconds = seconds < 10 ? '0' + seconds : seconds

    if (time >= 0) {
        countdownEl.innerHTML = `${minutes}:${seconds}`
        time --
    } else {
        clearInterval(updateCountdown)
        submitButton.classList.remove('hide')
    }
    
}

// click start = start game
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex ++
    advanceQuestion()
})

function startGame() {
    setInterval(updateCountdown, 1000)
    // hide the start button
    startButton.classList.add('hide')

    // sort the questions with random array
    questionOrder = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0

    // unhide question element and advance the question to #1
    questionContainerEl.classList.remove('hide')
    advanceQuestion()
}

// run the show question function pertaining to the current item in the array
function advanceQuestion() {
    showQuestion(questionOrder[currentQuestionIndex])
}

function showQuestion (question) {
    // reset the question before starting next one
    resetQuestion()
    // question text = nested question in question array
    questionEl.innerText = question.question

    // for each answer in the question of the question array:
    question.answers.forEach(answer => {
        // create a button with answer text and add class
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        // if answer is correct in array, assign that data to the button
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        // if button is clicked, run selectAnswer function
        button.addEventListener('click', selectAnswer)
        // append answer button to question
        answerButtonsEl.appendChild(button)
    })
}


function resetQuestion() {
    // remove next button
    nextButton.classList.add('hide')
    // while answer buttons element has children, remove that child
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

// id what was clicked and assign value of correct to it
function selectAnswer(event) {    
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (questionOrder.length > currentQuestionIndex + 1 && time >= 0) {
        nextButton.classList.remove('hide')
    } else {
        submitButton.classList.remove('hide')
        clearInterval(updateCountdown)
    }
    if (correct) {
        points += 10
        console.log(points)
    } else {time-10}
}

// adds correct/wrong classes to buttons
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

// resets correct/wrong between questions
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

submitButton.addEventListener('click', submitScore)

function submitScore() {
    submitContainerEl.classList.remove('hide')
    clearInterval(updateCountdown)
}

saveButtonEl.addEventListener('click', saveScore)

function saveScore() {
    var submittedScore = 
    {
        score: points,
        name: usernameEl.value
    }

    highScores.push(submittedScore)
    localStorage.setItem('submittedScore', JSON.stringify(submittedScore))
    
    var leaderboardEntry = document.createElement('li')
    leaderboardEntry.className = 'leaderboard-entry'
    leaderboardEntry.innerHTML = JSON.stringify(submittedScore)
}



// array of question objects with answers
var questions = [
    {
        question: 'What language makes up the foundation of all web pages?',
        answers: [
            {text: 'HTML', correct: true},
            {text: 'CSS', correct: false},
            {text: 'Javascript', correct: false},
            {text: 'Spanish', correct: false}
        ]
    },

    {
        question: 'What language is used primarily for styling a webpage?',
        answers: [
            {text: 'HTML', correct: false},
            {text: 'CSS', correct: true},
            {text: 'Javascript', correct: false},
            {text: 'Klingon', correct: false}
        ]
    },

    {
        question: 'What language is used primarily for making a web page do things?',
        answers: [
            {text: 'HTML', correct: false},
            {text: 'CSS', correct: false},
            {text: 'Javascript', correct: true},
            {text: 'Elvish', correct: false}
        ]
    },

    {
        question: 'What was Harry Potters second language?',
        answers: [
            {text: 'HTML', correct: false},
            {text: 'CSS', correct: false},
            {text: 'Javascript', correct: false},
            {text: 'Parseltongue', correct: true}
        ]
    },
    
    {
        question: 'TEST QUESTION 1',
        answers: [
            {text: 'INCORRECT', correct: false},
            {text: 'INCORRECT', correct: false},
            {text: 'CORRECT', correct: true},
            {text: 'INCORRECT', correct: false}
        ]
    },

    {
        question: 'TEST QUESTION 2',
        answers: [
            {text: 'CORRECT', correct: true},
            {text: 'INCORRECT', correct: false},
            {text: 'INCORRECT', correct: false},
            {text: 'INCORRECT', correct: false}
        ]
    },

    {
        question: 'TEST QUESTION 3',
            answers: [
                {text: 'INCORRECT', correct: false},
                {text: 'INCORRECT', correct: false},
                {text: 'INCORRECT', correct: false},
                {text: 'CORRECT', correct: true}
        ]
    }
]

/*
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
*/