 var questions = [
    {
        question: "Which of the following adds style to a webpage?",
        choices: ["a. HTML", "b. Java", "c. CSS", "d. Javascript"],
        answer: "c. CSS"
    },
    {
        question: "HTML does which of the following for a webpage?",
        choices: ["a. adds content", "b. adds user interactivity", "c. nothing", "d. adds style"],
        answer: "a. adds content"
    },
    {
        question: "Which method adds user prompts to a webpage?",
        choices: ["a. function", "b. prompt", "c. alert", "d. string"],
        answer: "b. prompt"
    },
    {
        question: "How do you change the color of text in CSS?",
        choices: ["a. color: chosencolor;", "b. text-color: chosencolor;", "c. background-color: chosencolor;", "d. text-decoration: chosencolor;"],
        answer: "a. color: chosencolor;"
    },
];

var timer = document.querySelector("#timer");
var timeLeft = document.querySelector("#timeLeft");
var timesUp = document.querySelector("#timesUp");

var startDiv = document.querySelector("#start");
var startQuizBtn = document.querySelector("#start-quiz-button");

var questionDiv = document.querySelector("#questionDiv");
var questionTitle = document.querySelector("#questionTitle");
var choiceA = document.querySelector("#btn0");
var choiceB = document.querySelector("#btn1");
var choiceC = document.querySelector("#btn2");
var choiceD = document.querySelector("#btn3");
var answerCheck = document.querySelector("#answerCheck");

var summary = document.querySelector("#summary");
var submitInitialBtn = document.querySelector("#submitInitialBtn");
var initialInput = document.querySelector("#initialInput");
var everything = document.querySelector("#everything");

var highScoreSection = document.querySelector("#highScoreSection");
var finalScore = document.querySelector("#finalScore");

var goBackBtn = document.querySelector("#goBackBtn");
var clearHighScoreBtn = document.querySelector("#clearHighScoreBtn"); 
var viewHighScore = document.querySelector("#viewHighScore");
var listOfHighScores = document.querySelector("#listOfHighScores");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

var totalTime = 61;
function newQuiz() {
    questionIndex = 0;
    totalTime = 60;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};

function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
    
        correctAns++;
        answerCheck.textContent = "Correct!";
    } else {
        totalTime -= 3;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Incorrect! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
        gameOver();
    }
}

function chooseA() { 
    checkAnswer(0); 
}

function chooseB() { 
    checkAnswer(1); 
}

function chooseC() { 
    checkAnswer(2); 
}

function chooseD() { 
    checkAnswer(3); 
}

function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

    finalScore.textContent = correctAns;
}


function storeHighScores(event) {
    event.preventDefault();

    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    showHighScores();
}

var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});