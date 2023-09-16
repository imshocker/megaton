var currentQuestionIndex = 0
var score = 0

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

function startQuiz() {
    if (questionCounterEl && totalQuestionsEl && choicesEl && scoreEl){
        questionCounterEl.style.display = "none"
        totalQuestionsEl.style.display = "none"
        choicesEl.style.display = "none"
        scoreEl.style.display = "none"
    }
}

function loadQuestion() {
    var currentQuestion = questions[currentQuestionIndex]
    questionEl.textContent = currentQuestion.title
    choicesEl.innerHTML = ''

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i]
        var choiceItem = document.createElement('button')
        choiceItem.textContent = choice
        choiceItem.style.display = 'block';
        choiceItem.addEventListener('click', function () {
            checkAnswer(this.textContent)
        })
        choicesEl.appendChild(choiceItem)
    }

    questionNumberEl.textContent = currentQuestionIndex + 1
    totalQuestionsEl.textContent = questions.length
}

function checkAnswer(selectedChoice) {
    var currentQuestion = questions[currentQuestionIndex]

    if (selectedChoice === currentQuestion.answer) {
        score++
        resultEl.textContent = 'Correct!'
    } else {
        resultEl.textContent = 'Incorrect!'
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion()
    } else {
        // Quiz is finished
        endQuiz()
    }
}

function endQuiz() {
    questionEl.textContent = 'Quiz Finished!'
    choicesEl.innerHTML = ''
    scoreEl.textContent = score + ' out of ' + questions.length
    if (questionCounterEl && resultEl){
        questionCounterEl.style.display = "none"
        resultEl.style.display = "none"
    }

}

loadQuestion()