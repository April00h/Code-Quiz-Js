const totalTime = 300; // Total time for the entire quiz in seconds (adjust as needed)
let timeLeft = totalTime; // Initialize timeLeft with the total time
let currentQuestionIndex = 0; // To keep track of the current question
let score = 0; // To keep track of the user's score

const timerElement = document.getElementById("timer");
const feedbackElement = document.getElementById("feedback");
const feedbackTextElement = document.getElementById("feedback-text");

// Sample questions array
const questions = [
  {
    question: "What does 'JS' stand for?",
    options: ["JavaScript", "JustScript", "JavaSource", "JScript"],
    answer: "JavaScript",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "string", "variable"],
    answer: "var",
  },
  {
    question: "What is ",
    options: ["needed", "int", "string", "variable"],
    answer: "needed",
  },
  // Add more questions here
];


// start the quiz

document.addEventListener('DOMContentLoaded', function() {
    const startQuizButton = document.getElementById('start-quiz');
    const introSection = document.getElementById('intro');
    const quizContainer = document.getElementById('quiz-container');

    startQuizButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag

        // Hide the intro section
        introSection.classList.add('hidden');
        
        // Show the quiz container
        quizContainer.classList.remove('hidden');

        // Call a function to start the quiz, e.g., displayQuestion(questions[0]);
        // Ensure your questions and quiz logic are properly implemented in your JavaScript
        
    });
});


// Function to update the timer display
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  if (timeLeft === 0) {
    // The time has run out, handle quiz completion here
    clearInterval(timerInterval);
    endQuiz();
  } else {
    timeLeft--;
  }
}

// Start the timer when the quiz begins
const timerInterval = setInterval(updateTimer, 1000);

// Function to display a question
function displayQuestion(questionObj) {
  const quizSection = document.getElementById("quiz");
  quizSection.innerHTML = ""; // Clear previous question
  // Clear the feedback text when displaying a new question
  feedbackTextElement.textContent = ""; // Add this line to clear the feedback text

  // Create question element
  const questionElement = document.createElement("h2");
  questionElement.textContent = questionObj.question;

  // Create options elements
  const optionsList = document.createElement("ul");
  questionObj.options.forEach((option) => {
    const optionItem = document.createElement("li");
    optionItem.textContent = option;

    // Add a click event listener to check the answer
    optionItem.addEventListener("click", () => {
      checkAnswer(option, questionObj.answer);
    });

    optionsList.appendChild(optionItem);
  });

  // Append question and options to the quiz section
  quizSection.appendChild(questionElement);
  quizSection.appendChild(optionsList);
}

// Function to check the selected answer
function checkAnswer(selectedAnswer, correctAnswer) {
  // Disable click events on options while displaying feedback
  const optionsList = document.querySelectorAll("ul li");
  optionsList.forEach((optionItem) => {
    optionItem.style.pointerEvents = "none";
  });

  if (selectedAnswer === correctAnswer) {
    // If the answer is correct
    feedbackTextElement.textContent = "Correct!";
    feedbackElement.classList.add("correct"); // Apply a CSS class for correct answer
    score++; // Increase the score
  } else {
    // If the answer is wrong
    feedbackTextElement.textContent = "Wrong!";
    feedbackElement.classList.add("wrong"); // Apply a CSS class for wrong answer
  }

  // Display the feedback
  feedbackElement.classList.remove("hidden");

  // Wait for 1 seconds and then proceed to the next question
  setTimeout(() => {
    feedbackElement.classList.add("hidden");
    feedbackElement.classList.remove("correct", "wrong"); // Remove answer-specific classes

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion(questions[currentQuestionIndex]);

      // Re-enable click events on options
      optionsList.forEach((optionItem) => {
        optionItem.style.pointerEvents = "auto";
      });
    } else {
      // All questions have been answered, end the quiz
      endQuiz();
    }
  }, 1000); // 1000 milliseconds (1 seconds)
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);

  // Display "All done" message
  const allDoneMessage = document.createElement("h2");
  allDoneMessage.textContent = "All done!";
  const quizSection = document.getElementById("quiz");
  quizSection.innerHTML = ""; // Clear quiz questions and options
  quizSection.appendChild(allDoneMessage);

  // Display final score
  const finalScore = document.createElement("p");
  finalScore.textContent = `Your final score is ${score}`;
  quizSection.appendChild(finalScore);

  // Ask for the user's name for high score
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "Enter your name");
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";

  // Event listener for the submit button
  submitButton.addEventListener("click", () => {
    const playerName = nameInput.value;

    // Get existing high scores from local storage or initialize an empty array
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Store the current player's score and initials as an object
    const playerData = {
      name: playerName,
      score: score,
    };

    // Add the player's data to the high scores array
    highScores.push(playerData);

    // Sort the high scores array in descending order based on score
    highScores.sort((a, b) => b.score - a.score);

    // Store the updated high scores array in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Optionally, you can redirect the user to a high score page or perform other actions here
    // Display high scores after submitting the form
    displayHighScores();
  });

  // Append name input and submit button to the quiz section
  quizSection.appendChild(nameInput);
  quizSection.appendChild(submitButton);

  // Hide the feedback element
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.classList.add("hidden");
}

// Call the function to display the first question when the quiz starts
displayQuestion(questions[0]);
// Function to display high scores
function displayHighScores() {
  const highScoresSection = document.getElementById("high-scores");
  const highScoresList = document.getElementById("high-scores-list");
  const formSection = document.getElementById("quiz"); // Assuming your form is inside a section with id 'quiz'
  const clearScoresButton = document.getElementById("clear-scores-button");

  // Get high scores from local storage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Clear previous high scores
  highScoresList.innerHTML = "";

  // Populate and display high scores
  highScores.forEach((playerData) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${playerData.name}: ${playerData.score}`;
    highScoresList.appendChild(listItem);
  });

  // Show the high scores section
  highScoresSection.classList.remove("hidden");
  // Hide the form section
  formSection.classList.add("hidden");
  // Add event listener for the Clear High Scores button
  clearScoresButton.addEventListener("click", () => {
    // Clear high scores from local storage
    localStorage.removeItem("highScores");
    // Clear the displayed high scores
    highScoresList.innerHTML = "";
        // Redirect the user back to index.html
        window.location.href = 'index.html';
  });
}
