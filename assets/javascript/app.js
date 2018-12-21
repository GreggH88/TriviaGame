var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var questionList = [
  {
    question: "Where is albaqerque?",
    answers: {
      a: "How should I know?",
      b: "Thataway <==>",
      c: "Back by that left turn."
    },
    correctAnswer: "c"
  },
  {
    question: "Question2?",
    answers: {
      a: "A",
      b: "B",
      c: "C"
    },
    correctAnswer: "c"
  },
  {
    question: "Question3?",
    answers: {
      a: "A",
      b: "B",
      c: "C"
    },
    correctAnswer: "c"
  }
];

function runQuiz() {
var output = [];
questionList.forEach(
  (currentQuestion, questionNumber) => {
var answers = [];
for(letter in currentQuestion.answers){
  answers.push(
    `<label>
      <input type="radio"
name="question${questionNumber}"
value="${letter}"> ${letter} : ${currentQuestion.answers[letter]}
</label>`
);
}
output.push(`<div class="question"> ${currentQuestion.question} </div>
<div class="answers"> ${answers.join('')} </div>`
);
  }
);
quizContainer.innerHTML = output.join('');
}

function showResults() {
  var answerContainers = quizContainer.querySelectorAll('.answers');
  var numCorrect = 0;

  questionList.forEach((currentQuestion, questionNumber) => {
    var answerContainer = answerContainers[questionNumber];
    var selector = `input[name=question${questionNumber}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].getElementsByClassName.color = 'lightgreen';
    } else {
      answerContainers[questionNumber].getElementsByClassName.color = 'red';
    }
  });
  resultsContainer.innerHTML = numCorrect + ' out of ' + questionList.length;
}
// run quiz
runQuiz();

// display quiz results
submitButton.addEventListener('click', showResults);