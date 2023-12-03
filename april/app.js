const totalTime = 300; // Total time for the entire quiz in seconds (adjust as needed)
let timeLeft = totalTime; // Initialize timeLeft with the total time
let currentQuestionIndex = 0; // To keep track of the current question
let score = 0; // To keep track of the user's score

const timerElement = document.getElementById('timer');
const feedbackElement = document.getElementById('feedback');
const feedbackTextElement = document.getElementById('feedback-text');

// Sample questions array
const questions = [
    {
        question: "What does 'JS' stand for?",
        options: ["JavaScript", "JustScript", "JavaSource", "JScript"],
        answer: "JavaScript"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "variable"],
        answer: "var"
    },
    {
        question: "What allows the variable value to be reassigned? ",
        options: ["let", "int", "string", "const"],
        answer: "let"
    },
        {
        question: "What is the difference between null and undefined? ",
        options: ["null is a no value object", "null is a defined object", "undefined is a declared but no assigned value yet", "undefined is a no value but declared", "A and C", "B and D"],
        answer: "A and C"
    },
    {
        question: "What is a loop?",
        options: ["Allows code to handle events and callbacks once triggered", "The same code repeated", " A design", " Allows code to trigger a 404"],
        answer: "Allows code ro handle events and callbacks once triggered"
    },

];

// Function to update the timer display
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

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
    const quizSection = document.getElementById('quiz');
    quizSection.innerHTML = ''; // Clear previous question
    // Clear the feedback text when displaying a new question
    feedbackTextElement.textContent = ""; // Add this line to clear the feedback text


    // Create question element
    const questionElement = document.createElement('h2');
    questionElement.textContent = questionObj.question;
    
    // Create options elements
    const optionsList = document.createElement('ul');
    questionObj.options.forEach((option) => {
        const optionItem = document.createElement('li');
        optionItem.textContent = option;

        // Add a click event listener to check the answer
        optionItem.addEventListener('click', () => {
            checkAnswer(option, questionObj.answer);
        });

        optionsList.appendChild(optionItem);
    });
    
    // Append question and options to the quiz section
    quizSection.appendChild(questionElement);
    quizSection.appendChild(optionsList);
}

// Function to check the selected answer
// Function to check the selected answer
function checkAnswer(selectedAnswer, correctAnswer) {
    // Disable click events on options while displaying feedback
    const optionsList = document.querySelectorAll('ul li');
    optionsList.forEach((optionItem) => {
        optionItem.style.pointerEvents = 'none';
    });

    if (selectedAnswer === correctAnswer) {
        // If the answer is correct
        feedbackTextElement.textContent = "Correct!";
        feedbackElement.classList.add('correct'); // Apply a CSS class for correct answer
        score++; // Increase the score
    } else {
        // If the answer is wrong
        feedbackTextElement.textContent = "Wrong!";
        feedbackElement.classList.add('wrong'); // Apply a CSS class for wrong answer
    }

    // Display the feedback
    feedbackElement.classList.remove('hidden');

    // Wait for 1 seconds and then proceed to the next question
    setTimeout(() => {
        feedbackElement.classList.add('hidden');
        feedbackElement.classList.remove('correct', 'wrong'); // Remove answer-specific classes

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(questions[currentQuestionIndex]);

            // Re-enable click events on options
            optionsList.forEach((optionItem) => {
                optionItem.style.pointerEvents = 'auto';
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
    const allDoneMessage = document.createElement('h2');
    allDoneMessage.textContent = 'All done!';
    const quizSection = document.getElementById('quiz');
    quizSection.innerHTML = ''; // Clear quiz questions and options
    quizSection.appendChild(allDoneMessage);

    // Display final score
    const finalScore = document.createElement('p');
    finalScore.textContent = `Your final score is ${score}`;
    quizSection.appendChild(finalScore);

    // Ask for the user's name for high score
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('placeholder', 'Enter your name');
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';

    // Event listener for the submit button
    submitButton.addEventListener('click', () => {
        const playerName = nameInput.value;
        // Store the score and playerName in localStorage or send it to a server-side script to handle high scores
        // Example using localStorage:
        localStorage.setItem('highScore', score);
        localStorage.setItem('playerName', playerName);
        // Optionally, you can redirect the user to a high score page or perform other actions here
        
    });

    // Append name input and submit button to the quiz section
    quizSection.appendChild(nameInput);
    quizSection.appendChild(submitButton);

    // Hide the feedback element
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.classList.add('hidden');
}


// Call the function to display the first question when the quiz starts
displayQuestion(questions[0]);
// Not displaying the scores and a player chart in local storage please rview. 
