

// store html objects to manipulate in js
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

// list of questions and answers
var questionList = [{
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
// function containing quiz logic
function runQuiz() {
  // stores html output in an array
  var output = [];
  questionList.forEach(
    (currentQuestion, questionNumber) => {
      var answers = [];
      // for each letter in answers array of currentQuestion, create a radio button with associated answer, pushing it into the variable array answers.
      for (letter in currentQuestion.answers) {
        answers.push(
          `<label class="multiChoice">
      <input type="radio"
name="question${questionNumber}" value="${letter}"> 
            ${letter} : 
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }
      // adds the html for this question and its answers to the output array
      // then joins the output array into a string with .join('')
      output.push(`<div class="question"> ${currentQuestion.question} </div>
<div class="answers"> ${answers.join('')} </div>`);
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