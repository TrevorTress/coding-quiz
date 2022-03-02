var startButton = document.getElementById('start-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')

var questions = [
    {
        question: 'This is Question 1?',
        answers: [
            {text: '1', correct: true},
            {text: '2', correct: false},
            {text: '3', correct: false},
            {text: '4', correct: false}
        ]
    }
]

startButton.addEventListener('click', startGame)


function startGame() {
    startButton.classList.add('hide')
    questionOrder = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove('hide')
    advanceQuestion()
}

function advanceQuestion() {
    showQuestion(questionOrder[currentQuestionIndex])
}

function showQuestion (question) {
    questionEl.innerText = question.question
}

function selectAnswer() {

}