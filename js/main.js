var startBtn = document.getElementById("start-btn");
var instructions = document.getElementById('instructions');
var title = document.getElementById('title');
var questionBox = document.getElementById("question-area");
var questionEl = document.getElementById("question");
var choiceContatiner = document.getElementById('choices');
var timeLeft = 60;
var timer = document.getElementById("timer");
var time;
var submit = document.getElementById('submit');
var highScoreContainer = document.getElementById('highScoreContainer')
var highScoresList = document.getElementById('highScore')
var restartBtn = document.getElementById('restart-btn')
var questionBankIndex = 0;
var questionBank = [
    {
        question: "Choose the correct HTML element for the largest heading:",
        choices: [
            "<h6>",
            "<h1>",
            "<heading>",
            "<head>"
        ],
        answer: "<h1>"
    },
    {
        question: "what does HTML stand for?",
        choices: [
            "HyperText Markup Language",
            "High time micro leters",
            "HyperActive Micro Language",
            "Hectic Tetris Mega Legs"
        ],
        answer: "HyperText Markup Language"
    },
    {
        question: "Choose the correct HTML element to define important text",
        choices: [
            "<important>",
            "<i>",
            "<strong>",
            "<b>"
        ],
        answer: "<strong>"
    },
    {
        question: "Which CSS property controls the text size?",
        choices: [
            "text-size",
            "text-style",
            "font-style",
            "font-size"
        ],
        answer: "font-size"
    },
    {
        question: "How does a FOR loop start?",
        choices: [
            "for (i = 0; i <= 5; i++)",
            "for (i <= 5; i++)",
            "for (i = 0; i <= 5)",
            "for i = 1 to 5"
        ],
        answer: "for (i = 0; i <= 5; i++)"
    },
]

//starting the game when clicking the start btn
var startGame = function () {
    timer.textContent = timeLeft
    startBtn.classList.add("hide");
    instructions.classList.add('hide');
    title.classList.add('hide')
    questionBox.classList.remove("hide");
    makeQuestion();
    timer.classList.remove("hide");
    time = setInterval(updateTimer, 1000);
};

//creating the questions and aswers
var makeQuestion = function () {
    var currentQuestion = questionBank[questionBankIndex];
    questionEl.innerHTML = currentQuestion.question;
    choiceContatiner.innerHTML = '';
    currentQuestion.choices.forEach(function (choice) {
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choice btn');
        choiceBtn.setAttribute('value', choice);
        choiceBtn.textContent = choice;
        choiceBtn.onclick = answerCheck;
        choiceContatiner.appendChild(choiceBtn);
    })
}

// checking the asnswers and change your time
var answerCheck = function () {
    if (this.value !== questionBank[questionBankIndex].answer) {
        timeLeft -= 5
        if (timeLeft < 0) {
            time = 0
        }
        timer.textContent = timeLeft
    }
    questionBankIndex++
    if (questionBankIndex === questionBank.length) {
        endGame()
    } else {
        makeQuestion()
    }
    
};

//ending the timer and questions and displaying scores and restart btn
function endGame() {
    clearInterval(time);
    questionBox.classList.add('hide');
    var endScreen = document.getElementById('endScreen');
    endScreen.classList.remove('hide');
    var score = document.getElementById('finalScore');
    score.textContent = timeLeft;
    timer.innerHTML = "Game Over"
    highScoresScreen();
    highScoreContainer.classList.remove('hide');
    restartBtn.classList.remove('hide');
};

// saving the scores based on the timer
function saveScore() {
    var initials = document.getElementById('initials').value;
    var highScores = JSON.parse(localStorage.getItem('scores')) || [];
    console.log(highScores);
    var yourScore = {
        initials: initials,
        score: timeLeft
    };
    highScores.push(yourScore);
    localStorage.setItem("scores", JSON.stringify(highScores));
}

//displaying high scores at the end
var highScoresScreen = function () {
    var highScores = JSON.parse(localStorage.getItem('scores')) || [];
    console.log(highScores);

    for (let i = 0; i < highScores.length; i++) {
        var scoreLi = document.createElement('li');
        scoreLi.setAttribute('class', 'score');
        scoreLi.innerHTML = JSON.stringify(highScores[i]);
        highScoresList.appendChild(scoreLi);
    };

};

//restart btn to restart the game
var restart = function () {
    location.reload()
};

//timer going down
function updateTimer() {
    // console.log(timeLeft);
    timeLeft--;
    timer.textContent = timeLeft;
    //  console.log(timeLeft);
    if (timeLeft <= 0) {
        endGame();
    }
};

startBtn.addEventListener("click", startGame);
submit.addEventListener('click', saveScore);
restartBtn.addEventListener("click", restart);