const questionElement = document.querySelector('.question');
const questionNumberElement = document.querySelector('.question-number');
const questionTextElement = document.querySelector('.question-text');
const optionsElements = document.querySelectorAll('.option');
const scoreElement = document.querySelector('.score');
const nextButton = document.querySelector('.next-button');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=40&category=23&difficulty=easy&type=multiple');
        const data = await response.json();
        questions = data.results;
        showQuestion(currentQuestionIndex);
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    questionElement.textContent = 'Quiz';
    questionTextElement.textContent = question.question;

    const allOptions = [...question.incorrect_answers, question.correct_answer];
    shuffleArray(allOptions);

    for (let i = 0; i < optionsElements.length; i++) {
        optionsElements[i].textContent = allOptions[i];
        optionsElements[i].addEventListener('click', () => checkAnswer(allOptions[i], question.correct_answer));
    }
}

function checkAnswer(selectedOption, correctOption) {
    if (selectedOption === correctOption) {
        score++;
    }

    optionsElements.forEach((option) => {
        option.removeEventListener('click', () => checkAnswer());
    });

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.textContent = 'Quiz Finished!';
    questionNumberElement.textContent = '';
    questionTextElement.textContent = '';
    optionsElements.forEach((option) => {
        option.style.display = 'none';
    });
    scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
    nextButton.style.display = 'none';
}

function shuffleArray(array) {
    for (let i = 0; i < array; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

nextButton.addEventListener('click', () => {
    optionsElements.forEach((option) => {
        option.addEventListener('click', () => {});
    });
    showQuestion(currentQuestionIndex);
});

// Start the quiz by fetching questions
fetchQuestions();
