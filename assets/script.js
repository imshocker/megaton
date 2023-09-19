var currentQuestionIndex = 0
var score = 0
var timer
var timerCount = 30

var timerEl = document.querySelector(".timer-count")
var questionEl = document.getElementById('question')
var choicesEl = document.getElementById('choices')
var scoreEl = document.getElementById('score')
var resultEl = document.getElementById('result')
var questionNumberEl = document.getElementById('question-number')
var totalQuestionsEl = document.getElementById('total-questions')
var questionCounterEl = document.getElementById('question-counter')

var questions = [
    {
        title: 'How can a datatype be declared to be a constant type?',
        choices: ['const', 'var', 'let', 'constant'],
        answer: 'const',
    },
    {
        title: 'Arrays in JavaScript are defined by which of the following statements?',
        choices: ['It is an ordered list of values', 'It is an ordered list of objects', 'It is an ordered list of string', 'It is an ordered list of functions'],
        answer: 'It is an ordered list of values',
    },
    {
        title: 'JavaScript ignores _______.',
        choices: ['Newlines', 'Tabs', 'Spaces', 'All of the above'],
        answer: 'All of the above',
    },
    {
        title: 'Which JavaScript method is used to access an HTML element by id?',
        choices: ['getElementById()', 'getElement(id)', 'getElementById(id)', 'elementById(id)'],
        answer: 'getElementById()',
    },
    {
        title: 'Which JavaScript method is used to write on the browser console?',
        choices: ['console.write()', 'console.output()', 'console.log()', 'console.writeHTML()'],
        answer: 'console.log()',
    },
    {
        title: 'In JavaScript, multi-line comments start with __ and end with ___.',
        choices: ['/* and */', '<!-- and -->', '## and ##', '// and //'],
        answer: '/* and */',
    },
]

//Loads questions
function loadQuestion() {

    clearInterval(timer)

    var currentQuestion = questions[currentQuestionIndex]
    questionEl.textContent = currentQuestion.title
    choicesEl.innerHTML = ''

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i]
        var choiceItem = document.createElement('button')
        choiceItem.textContent = choice
        choiceItem.style.display = 'block'
        choiceItem.addEventListener('click', function () {
            checkAnswer(this.textContent)
        })
        choicesEl.appendChild(choiceItem)
    }

    questionNumberEl.textContent = currentQuestionIndex + 1
    totalQuestionsEl.textContent = questions.length
    startTimer()
}

//Starts timer 
function startTimer() {
    timer = setInterval(function () {
        timerCount--

        // Update the timer display
        var timerEl = document.querySelector('.timer-count')
        timerEl.textContent = timerCount

        // Check if time has run out
        if (timerCount <= 0) {
            // Clear interval and end the quiz
            clearInterval(timer)
            endQuiz()
            timerEl.textContent = " "
        }
    }, 1000)
}

//Displays Correct or Incorrect for choice
//Adds score if choice is Correct
function checkAnswer(selectedChoice) {
    var currentQuestion = questions[currentQuestionIndex]

    if (selectedChoice === currentQuestion.answer) {
        score++
        resultEl.textContent = 'Correct!'
    } else {
        resultEl.textContent = 'Incorrect!'
    }

    currentQuestionIndex++

    if (currentQuestionIndex < questions.length) {
        loadQuestion()
    } else {
        
        endQuiz()
    }
}

//Ends the quiz
function endQuiz() {
    timerEl.textContent = " "
    questionEl.textContent = 'Quiz Finished!'
    choicesEl.innerHTML = ''
    scoreEl.textContent = score + ' out of ' + questions.length
    if (questionCounterEl && resultEl){
        questionCounterEl.style.display = "none"
        resultEl.style.display = "none"
    }
    document.getElementById('high-score-button').style.display = "block"

}

loadQuestion()

//Displays High-scores on the right side of the High-score page
function displayHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || []

    var highScoresList = document.getElementById("high-scores-list")
    highScoresList.innerHTML = "" // Clear the previous list

    highScores.forEach((entry, index) => {
        const listItem = document.createElement("li")
        listItem.textContent = `${entry.initials}: ${entry.score}`
        highScoresList.appendChild(listItem)
    })
}

//Saves High-score to localStorage
function saveHighScore(initials, score) {
    var highScores = JSON.parse(localStorage.getItem('highScores')) || []
    var newHighScore = { initials: initials, score: score }
    highScores.push(newHighScore)
    highScores.sort(function (a, b) {
        return b.score - a.score
    })
    localStorage.setItem('highScores', JSON.stringify(highScores))
}

// Event listener for starting the quiz
document.getElementById('start-button').addEventListener('click', startQuiz)

// Event listener for submitting a high score
document.getElementById('submit-score').addEventListener('click', function () {
    var initials = document.getElementById('initials').value
    saveHighScore(initials, score)
    displayHighScores()
})

