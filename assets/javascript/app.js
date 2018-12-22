// store html objects to manipulate in js
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

// Timer variables
var timerLimit = 91;
var intervalId;


// list of questions and answers
var questionList = [{
    question: "What is superman's weakness?",
    answers: {
      a: "Plutonium.",
      b: "Krytonite.",
      c: "The human spirit."
    },
    correctAnswer: "b"
  },
  {
    question: "What is batman's butlers' name?",
    answers: {
      a: "Alfred",
      b: "Woodhouse",
      c: "Jeeves"
    },
    correctAnswer: "a"
  },
  {
    question: "What animals' bite gave Peter Parker his super powers?",
    answers: {
      a: "Spider",
      b: "Wolf",
      c: "Hampster"
    },
    correctAnswer: "a"
  },
  {
    question: "What is Captain America's shield made out of?",
    answers: {
      a: "Adamantium",
      b: "Gold-Titanium Alloy",
      c: "Vibranium"
    },
    correctAnswer: "c"
  },
  {
    question: "What is the Hulks most common mind state?",
    answers: {
      a: "Angry",
      b: "Silly",
      c: "Hungry"
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
          </label><br>`
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
    }
  });
  // displays nubmer of correctly answered questions out of total
  resultsContainer.innerHTML ='You got '  + numCorrect + ' out of ' + questionList.length + ' questions correct!';
  // stops the timer
  timerLimit = 0;
  stop();
  clearInterval(intervalId);
}


function timer() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
}
function decrement() {
  timerLimit--;
  $("#show-timer").html("<h2>" + timerLimit + "</h2>");
  if (timerLimit === 0) {
    showResults();
    
  }
}
// run quiz
runQuiz();
// run timer
timer();
// display quiz results
submitButton.addEventListener('click', showResults);