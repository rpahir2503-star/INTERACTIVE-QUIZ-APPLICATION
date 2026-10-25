const questions = [
    {
        question: "What does a large language model actually predict?",
        options: [
            "The next token",
            "The entire paragraph",
            "The final answer",
            "The user's intention"
        ],
        answer: "The next token"
    },
    {
        question: "In the commit-message format used in this course, what comes before the colon?",
        options: [
            "The type, such as feat or fix",
            "The filename",
            "The programmer name",
            "The date"
        ],
        answer: "The type, such as feat or fix"
    },
    {
        question: "What must a unit test do before the bug is fixed?",
        options: [
            "Fail",
            "Pass",
            "Stop running",
            "Delete the code"
        ],
        answer: "Fail"
    },
    {
        question: "Where should the styling for a webpage live?",
        options: [
            "In a separate CSS file",
            "Inside Python",
            "Inside the browser console",
            "Inside a text file"
        ],
        answer: "In a separate CSS file"
    },
    {
        question: "What does a loop inside another loop usually mean for time complexity?",
        options: [
            "It is quadratic",
            "It is constant",
            "It is logarithmic",
            "It has no complexity"
        ],
        answer: "It is quadratic"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const progressElement = document.getElementById("quiz-progress");
const scoreElement = document.getElementById("quiz-score");
const actionsElement = document.getElementById("quiz-actions");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
    answered = false;
    const q = questions[currentQuestion];

    if (progressElement) {
        progressElement.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    }
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }

    questionElement.textContent = q.question;
    optionsElement.innerHTML = "";
    resultElement.textContent = "";

    q.options.forEach(function (option) {
        const button = document.createElement("button");
        button.textContent = option;
        button.setAttribute("type", "button");

        button.addEventListener("click", function () {
            checkAnswer(button, option);
        });

        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedButton, selectedOption) {
    if (answered) return;
    answered = true;

    const currentCorrect = questions[currentQuestion].answer;
    const isCorrect = selectedOption === currentCorrect;

    const allButtons = optionsElement.querySelectorAll("button");
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = "default";
        if (btn.textContent === currentCorrect) {
            btn.style.borderColor = "#4ade80";
            btn.style.color = "#4ade80";
            btn.style.background = "rgba(74, 222, 128, 0.12)";
        }
    });

    if (isCorrect) {
        score++;
        if (scoreElement) scoreElement.textContent = `Score: ${score}`;
        resultElement.style.color = "#4ade80";
        resultElement.textContent = "Correct! Well done.";
    } else {
        selectedButton.style.borderColor = "#f87171";
        selectedButton.style.color = "#f87171";
        selectedButton.style.background = "rgba(248, 113, 113, 0.12)";
        resultElement.style.color = "#f87171";
        resultElement.textContent = `Incorrect. Correct answer: "${currentCorrect}"`;
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            finishQuiz();
        }
    }, 1100);
}

function finishQuiz() {
    if (progressElement) progressElement.textContent = "Quiz Completed";
    if (scoreElement) scoreElement.textContent = `Final Score: ${score}/${questions.length}`;

    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = "";

    const percentage = Math.round((score / questions.length) * 100);
    resultElement.style.color = "var(--gold-bright)";
    resultElement.innerHTML = `You scored <strong>${score} out of ${questions.length}</strong> (${percentage}%).<br><span style="font-size: 0.95rem; color: var(--muted);">${getFeedbackMessage(percentage)}</span>`;

    if (actionsElement) actionsElement.style.display = "block";
}

function getFeedbackMessage(pct) {
    if (pct === 100) return "Outstanding! Perfect score on course concepts.";
    if (pct >= 80) return "Great job! Strong understanding of lecture materials.";
    if (pct >= 60) return "Good attempt! Review the lecture slides to brush up on missed topics.";
    return "Keep practicing! Revisit Lecture 10 fundamentals to reinforce these concepts.";
}

if (restartBtn) {
    restartBtn.addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        if (actionsElement) actionsElement.style.display = "none";
        showQuestion();
    });
}

// Initial start
showQuestion();
