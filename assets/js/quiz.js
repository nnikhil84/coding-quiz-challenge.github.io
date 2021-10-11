var startQuiz = true;
var questionNum = 0;
var answerNum = 0;
var score = 0;
var highScore = 50;
var lastResponse = 0;
var checkTimer = 1;
var highScoreBtn = document.getElementById('btn-high-score');
var timeRemain = document.getElementById('timeRemaining');
var mainCon = document.getElementById('mainContent');
var questionArea = document.createElement('areaIntroduction');
var finalScore = document.createElement('finalScore');
var entInitials = document.createElement('enterInitials');
var inText = document.createElement('initialsText');
var quizBegin = document.getElementById('begin');
var firstOption = document.getElementById('opt1');
var secondOption = document.getElementById('opt2');
var thirdOption = document.getElementById('opt3');
var fourthOption = document.getElementById('opt4');
var scoreSubmit = document.getElementById('submit')
var optionBoolean = document.getElementById('response');
var remainingTime = 60;


// display relevant content
firstOption.style.display = 'none';
secondOption.style.display = 'none';
thirdOption.style.display = 'none';
fourthOption.style.display = 'none';
scoreSubmit.style.display = 'none';
optionBoolean.style.display = 'none';
initialsText.style.display = 'none';

var questionsObject = { // object with questions
  correct: {
    0: "Inside which HTML element do we put JavaScript?",
    1: "How do you write Hello World in an alert box?",
    2: "How to write an IF statement in JavaScript?",
    3: "How to write an IF statement for executing some code if i is NOT equal to 5?",
    4: "Which event occurs when the user clicks on an HTML element?"
  }
};

// object with answers
var answersObject = {
  answers: {
    0: { // correct option 1
      0: "<script>",
      1: "<js>",
      2: "<javascript>",
      3: "<scripting>"
    },
    1: { // correct option 2
      0: "msg('Hello World')",
      1: "alert('Hello World')",
      2: "msgBox('Hello World')",
      3: "alertBox('Hello World')"
    },
    2: { // correct option 3
      0: "if i = 5",
      1: "if i = 5 then",
      2: "if (i == 5)",
      3: "if i == 5 then"
    },
    3: { // correct option 2
      0: "if i <> 5",
      1: "if (i !=5)",
      2: "if i =! 5 then",
      3: "if (i <> 5)"
    },
    4: { //correct option 4
      0: "onchange",
      1: "onmouseclick",
      2: "onmouseover",
      3: "onclick"
    },
  }
};

//dsplay initial time value
timeRemain.textContent = remainingTime;

highScoreBtn.addEventListener("click", function() {
  var quizTakers = "";
  var substringTest = "";
  var highScores = "";
  for (var i = 0; i < localStorage.length; i++) {
    var userValue = [];
    quizTakers = localStorage.getItem(localStorage.key(i));
    substringTest = quizTakers.substring(0, 4)
    if (substringTest == "quiz") {
      userValue = quizTakers.split(",");
      var userName = userValue[0]
      highScores += "User " + userName.substring(4) + " high score is: " + userValue[1] + "\n";
    }
  }
  window.alert(highScores);
});

scoreSubmit.addEventListener("click", function() {

  var localQuiz = "quiz";
  var userInfo = "";
  var value = [];

  userInfo = localQuiz + initialsText.value
  value = [userInfo, highScore]

  if (!localStorage.length) {
    localStorage.setItem("test", "test");
  }

  for (var i = 0; i < localStorage.length; i++) {

    var checkUser = "";
    var userValue = [];

    userInfo = localQuiz + initialsText.value;

    checkUser = localStorage.getItem(userInfo);

    if (checkUser == null) {
      localStorage.setItem(userInfo, value);
      window.alert("Your score of " + highScore + " has been submitted!")
      break;
    } else if (checkUser != null) {
      userValue = checkUser.split(",");
    }

    if (userInfo == userValue[0] && highScore == userValue[1]) {
      localStorage.setItem(userInfo, value);
      window.alert(highScore + " " + "is the latest entry for user initial " + initialsText.value + ". Entry will not be added.")
      break;
    } else if (initialsText.value == "") {
      window.alert("Please enter an initial");
      break;
    } else if (userInfo == userValue[0] && highScore > userValue[1]) {
      localStorage.setItem(userInfo, value);
      window.alert("New high score of " + highScore + " has been submitted!.\nYour previous score was " + userValue[1])
      break;
    } else if (userInfo == userValue[0] && highScore < userValue[1]) {
      localStorage.setItem(userInfo, value);
      window.alert("Your previous code of " + userValue[1] + " was higher. Entry will not be added.");
      break;
    } else {
      localStorage.setItem(userInfo, value);
      window.alert("Your score of " + highScore + " has been submitted!")
      break;
    }
  }
});

firstOption.addEventListener("mouseover", function() {
  optionBoolean.style.display = 'none';
});
secondOption.addEventListener("mouseover", function() {
  optionBoolean.style.display = 'none';
});
thirdOption.addEventListener("mouseover", function() {
  optionBoolean.style.display = 'none';
});
fourthOption.addEventListener("mouseover", function() {
  optionBoolean.style.display = 'none';
});
scoreSubmit.addEventListener("mouseover", function() {
  optionBoolean.style.display = 'none';
});

quizBegin.addEventListener("click", function() {

  quizBegin.style.display = 'none';
  areaIntroduction.style.display = 'none';
  finalScore.style.display = 'none';
  enterInitials.style.display = 'none';
  score = 0;
  remainingTime = 60;
  timeRemain.textContent = remainingTime;
  lastResponse = 0;
  checkTimer = 1;

  var timeInterval = setInterval(function() {
    //incorrect answer penalty
    if (score === 1) {
      highScore -= 10;
      remainingTime -= 10;
    }
    score = 0;
    if (remainingTime >= 1 && lastResponse !== 1) {
      areaIntroduction.textContent = questionsObject.correct[questionNum];
      areaIntroduction.style.display = "";
      firstOption.style.display = "";
      secondOption.style.display = "";
      thirdOption.style.display = "";
      fourthOption.style.display = "";

      //Display asnwers to the question
      firstOption.textContent = answersObject.answers[answerNum][0];
      secondOption.textContent = answersObject.answers[answerNum][1];
      thirdOption.textContent = answersObject.answers[answerNum][2];
      fourthOption.textContent = answersObject.answers[answerNum][3];

      gridContainer.appendChild(questionArea);
      gridContainer.appendChild(firstOption);
      gridContainer.appendChild(finalScore);
      remainingTime -= 1;
      timeRemain.textContent = remainingTime;

      //for first option, if correct then award 10 points else deduct 10 seconds and 10 points off high score
      firstOption.addEventListener("click", function() {
        if (areaIntroduction.textContent === "Inside which HTML element do we put JavaScript?" && firstOption.textContent === "<script>") {
          optionBoolean.style.display = "";
          optionBoolean.textContent = "Correct!";
          optionBoolean.style.borderTop = "solid #A06EE1";
          questionNum = 1;
          answerNum = 1;
          responseGrid.appendChild(optionBoolean);
        } else {
          switch (firstOption.textContent) {
            case "msg('Hello World')":
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 1;
              answerNum = 1;
              break;

            case "if i = 5":
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 2;
              answerNum = 2;
              break;

            case "if i <> 5":
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 3;
              answerNum = 3;
              break;

            case "onchange":
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Correct!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              responseGrid.appendChild(optionBoolean);
              questionNum = 0;
              answerNum = 0;

              firstOption.style.display = 'none';
              secondOption.style.display = 'none';
              thirdOption.style.display = 'none';
              fourthOption.style.display = 'none';
              optionBoolean.style.display = 'none';
              quizBegin.style.display = 'none';
              areaIntroduction.textContent = "You have finished the quiz!";
              finalScore.style.display = "";
              enterInitials.style.display = "";
              initialsText.style.display = "";
              lastResponse = 1;
              lastQuestionWrong();
              finalScore.textContent = "Your final score is: " + highScore;
              enterInitials.textContent = "Enter initials: "
              scoreSubmit.style.display = "";
              scoreSubmit.textContent = "Submit";
              clearInterval(timeInterval);
              break;
          }
        }
      });

      //for second option, if correct then award 10 points else deduct 10 seconds and 10 points off high score
      secondOption.addEventListener("click", function() {

        if (areaIntroduction.textContent === "How do you write Hello World in an alert box?" && secondOption.textContent === "alert('Hello World')") {
          console.log("Correct");
          optionBoolean.style.display = "";
          optionBoolean.textContent = "Correct!";
          optionBoolean.style.borderTop = "solid #A06EE1";
          questionNum = 2;
          answerNum = 2;
          responseGrid.appendChild(optionBoolean);
        } else if
          (areaIntroduction.textContent === "How to write an IF statement for executing some code if i is NOT equal to 5?" && secondOption.textContent === "if i =! 5 then") {
          optionBoolean.style.display = "";
          optionBoolean.textContent = "Correct!";
          optionBoolean.style.borderTop = "solid #A06EE1";
          questionNum = 4;
          answerNum = 4;
          responseGrid.appendChild(optionBoolean);

        } else {
          switch (secondOption.textContent) {
            case "<js>":
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 2;
              answerNum = 2;
              break;

            case "if i = 5 then":
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 4;
              answerNum = 4;
              break;

            case "onmouseclick":
              console.log("Inside the case now");
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 0;
              answerNum = 0;

              firstOption.style.display = 'none';
              secondOption.style.display = 'none';
              thirdOption.style.display = 'none';
              fourthOption.style.display = 'none';
              optionBoolean.style.display = 'none';
              quizBegin.style.display = 'none';
              areaIntroduction.textContent = "You have finished the quiz!";
              finalScore.style.display = "";
              enterInitials.style.display = "";
              initialsText.style.display = "";
              lastResponse = 1;
              lastQuestionWrong();
              finalScore.textContent = "Your final score is: " + highScore;
              enterInitials.textContent = "Enter initials: "
              scoreSubmit.style.display = "";
              scoreSubmit.textContent = "Submit";
              clearInterval(timeInterval);
              break;
          }
        }
      });


      thirdOption.addEventListener("click", function() {
        if (areaIntroduction.textContent === "How to write an IF statement in JavaScript?" && thirdOption.textContent === "if (i == 5)") {
          optionBoolean.style.display = "";
          optionBoolean.textContent = "Correct!";
          optionBoolean.style.borderTop = "solid #A06EE1";
          questionNum = 1;
          answerNum = 1;
          responseGrid.appendChild(optionBoolean);
        } else {
          switch (thirdOption.textContent) {
            case "<javascript>":
              console.log("Inside the case now");
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 1;
              answerNum = 1;
              break;

            case "msgBox('Hello World')":
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 3;
              answerNum = 3;
              break;

            case "if i =! 5 then":
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 4;
              answerNum = 4;
              break;

            case "onmouseover":
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 0;
              answerNum = 0;

              firstOption.style.display = 'none';
              secondOption.style.display = 'none';
              thirdOption.style.display = 'none';
              fourthOption.style.display = 'none';
              optionBoolean.style.display = 'none';
              quizBegin.style.display = 'none';
              areaIntroduction.textContent = "You have finished the quiz!";
              finalScore.style.display = "";
              enterInitials.style.display = "";
              initialsText.style.display = "";
              lastResponse = 1;
              lastQuestionWrong();
              finalScore.textContent = "Your final score is: " + highScore;
              enterInitials.textContent = "Enter initials: "
              scoreSubmit.style.display = "";
              scoreSubmit.textContent = "Submit";
              clearInterval(timeInterval);
              break;
          }
        }
      });

      //for fourth option, if correct then award 10 points else deduct 10 seconds and 10 points off high score
      fourthOption.addEventListener("click", function() {
        if (areaIntroduction.textContent === "Which event occurs when the user clicks on an HTML element?" && fourthOption.textContent === "onclick") {
          optionBoolean.style.display = "";
          optionBoolean.textContent = "Correct!"
          optionBoolean.style.borderTop = "solid #A06EE1";
          questionNum = 0;
          answerNum = 0;
          responseGrid.appendChild(optionBoolean);

          firstOption.style.display = 'none';
          secondOption.style.display = 'none';
          thirdOption.style.display = 'none';
          fourthOption.style.display = 'none';
          optionBoolean.style.display = 'none';
          quizBegin.style.display = 'none';
          areaIntroduction.textContent = "You have finished the quiz!";
          finalScore.style.display = "";
          enterInitials.style.display = "";
          initialsText.style.display = "";
          finalScore.textContent = "Your final score is: " + highScore;
          enterInitials.textContent = "Enter initials: "
          scoreSubmit.style.display = "";
          scoreSubmit.textContent = "Submit";
          clearInterval(timeInterval);
        } else {

          switch (fourthOption.textContent) {
            case "<scripting>":
              console.log("Inside the case now");
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 1;
              answerNum = 1;
              break;
            case "alertBox('Hello World')":
              console.log("Inside the case now");
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 2;
              answerNum = 2;
              break;
            case "if i == 5 then":
              console.log("Inside the case now");
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 3;
              answerNum = 3;
              break;
            case "if (i <> 5)":
              console.log("Inside the case now");
              optionBoolean.style.display = "";
              optionBoolean.textContent = "Wrong!";
              optionBoolean.style.borderTop = "solid #A06EE1";
              score = 1;
              questionNum = 4;
              answerNum = 4;
          }
        }
      });

    } else if (remainingTime === 0) {

      questionNum = 0;
      answerNum = 0;
      firstOption.style.display = 'none';
      secondOption.style.display = 'none';
      thirdOption.style.display = 'none';
      fourthOption.style.display = 'none';
      optionBoolean.style.display = 'none';
      areaIntroduction.textContent = "Game Over!. Try again by clicking on \"Click Start Quiz\"";
      quizBegin.style.display = "";
      clearInterval(timeInterval);
    }
  }, 1000)
});

function lastQuestionWrong() {
  if (lastResponse === 1 && checkTimer === 1) {
    highScore -= 10;
    checkTimer = 2;
    return highScore
  }
}
