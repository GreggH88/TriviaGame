// store html objects to manipulate in js
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

// Timer variables
var timerLimit = 10;
var intervalId;


// list of questions and answers
var questionList = [{
    question: "Where is albaqerque?",
    answers: {
      a: "How should I know?",
      b: "Thataway <==>",
      c: "Back by that wrong turn."
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
  // gather all answers into answerContainer
  var answerContainers = quizContainer.querySelectorAll('.answers');
  // tracks number of correctly answered questions
  var numCorrect = 0;

  // for each question - 
  questionList.forEach((currentQuestion, questionNumber) => {
    // sets the value of userAnswer to the selector with an attribute of 'checked' (for chosen answer)
    var answerContainer = answerContainers[questionNumber];
    var selector = `input[name=question${questionNumber}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if the answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
      // increment correct answer counter by 1
      numCorrect++;
      // color the correct answer green
      answerContainers[questionNumber].getElementsByClassName.color = 'green';
    } else {
      // else color the incorrect or empty answer red
      answerContainers[questionNumber].getElementsByClassName.color = 'red';
    }
  });
  // displays nubmer of correctly answered questions out of total
  resultsContainer.innerHTML ='You got'  + numCorrect + ' out of ' + questionList.length + ' questions correct!';
}


function timer() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
}
function decrement() {
  timerLimit--;
  $("#show-timer").html("<h2>" + timerLimit + "</h2>");
  if (timerLimit === 0) {
    stop();
    clearInterval(intervalId);
    showResults();
    
  }
}
// run quiz
runQuiz();
// run timer
timer();
// display quiz results
submitButton.addEventListener('click', showResults);