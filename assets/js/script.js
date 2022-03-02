var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')

// click start = start game
startButton.addEventListener('click', startGame)

function startGame() {
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

function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
}

// array of question objects with answers
var questions = [
    {
        question: 'This is Question 1?',
        answers: [
            {text: '1', correct: true},
            {text: '2', correct: false},
            {text: '3', correct: false},
            {text: '4', correct: false}
        ]
    },

    {
        question: 'This is Question 2?',
        answers: [
            {text: '1', correct: true},
            {text: '2', correct: false},
            {text: '3', correct: false},
            {text: '4', correct: false}
        ]
    },

    {
        question: 'This is Question 3?',
        answers: [
            {text: '1', correct: true},
            {text: '2', correct: false},
            {text: '3', correct: false},
            {text: '4', correct: false}
        ]
    },

    {
        question: 'This is Question 4?',
        answers: [
            {text: '1', correct: true},
            {text: '2', correct: false},
            {text: '3', correct: false},
            {text: '4', correct: false}
        ]
    }
]