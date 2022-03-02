var startButton = document.getElementById('start-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')

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

// click start = start game
startButton.addEventListener('click', startGame)

function startGame() {
    // hide the start button
    startButton.classList.add('hide')

    // sort the questions with random array
    questionOrder = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0

    // show the first question in array
    questionContainerEl.classList.remove('hide')
    advanceQuestion()
}

// run the show question function pertaining to the current item in the array
function advanceQuestion() {
    showQuestion(questionOrder[currentQuestionIndex])
}

function showQuestion (question) {
    // question text = nested question in question array
    questionEl.innerText = question.question

    // for each answer in the question of the question array
    question.answers.forEach(answer => {
        // create a button with answer text and add class
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        // if answer is correct in array
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button)
    })
}

function selectAnswer(event) {

}