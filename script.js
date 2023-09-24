const questions =[
    {
        questions:"In what country was Elon Musk born?",
        answers:[
            {text:"England",correct: false},
            {text:"America",correct: false},
            {text:"South Africa",correct: true},
            {text:"New Zealand",correct:false}
        ]

    },
    {
        questions:"what is the Chemical symbol for gold",
    answers:[
        {text:"Ag",correct: false},
        {text:"Mg",correct: false},
        {text:"Cl",correct: false},
        {text:"Au",correct:true}
    ]

    },
    {
        questions:"Which planet is often referred to as the 'Red planet'?",
        answers:[
            {text:"Mars",correct: true},
            {text:"Earth",correct: false},
            {text:"Jupiter",correct: false},
            {text:"kepler",correct:false}
        ]
    },
    {
        questions:"Capital of INDIA",
        answers:[
            {text:"Chennai",correct: false},
            {text:"Delhi",correct: true},
            {text:"Mumbai",correct: false},
            {text:"Kerela",correct:false}
        ]
    },
    {
        questions:"How many Gold Medals has India won at Olympics?",
        answers:[
            {text:"12",correct: false},
            {text:"10",correct: true},
            {text:"8",correct: false},
            {text:"32",correct:false}
        ]
    },

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbuttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    questions;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();