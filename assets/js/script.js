var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')

// click start = start game
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex ++
    advanceQuestion()
})

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
    // id what was clicked and assign value of correct to it
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (questionOrder.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart?'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// array of question objects with answers
var questions = [
    {
        question: 'The answer to this is 1',
        answers: [
            {text: '1', correct: true},
            {text: '2', correct: false},
            {text: '3', correct: false},
            {text: '4', correct: false}
        ]
    },

    {
        question: 'The answer to this is 2',
        answers: [
            {text: '1', correct: false},
            {text: '2', correct: true},
            {text: '3', correct: false},
            {text: '4', correct: false}
        ]
    },

    {
        question: 'The answer to this is 3',
        answers: [
            {text: '1', correct: false},
            {text: '2', correct: false},
            {text: '3', correct: true},
            {text: '4', correct: false}
        ]
    },

    {
        question: 'The answer to this is 4',
        answers: [
            {text: '1', correct: false},
            {text: '2', correct: false},
            {text: '3', correct: false},
            {text: '4', correct: true}
        ]
    }
]