// Quiz Data
const quizData = [
    {
        question: "Mi az a mesterséges intelligencia?",
        options: [
            "Emberekhez hasonló gondolkodásra képes gép",
            "Algoritmusok, amelyek adatokból tanulnak és döntéseket hoznak",
            "Csak játékokhoz használható technológia",
            "A tudomány fikciójában létezik, valóságban nem"
        ],
        correct: 1
    },
    {
        question: "Melyik az AI tanulásának alapja?",
        options: [
            "Intuitív gondolkodás",
            "Adatok és matematikai modellek",
            "Emberi közvetítés",
            "Véletlen döntések"
        ],
        correct: 1
    },
    {
        question: "Mit csinál a neurális hálózat?",
        options: [
            "Elektromosságot vezet",
            "Utánozza az emberi agy működését",
            "Vezetékeket csatornáz",
            "Csak orvosságok készítésében hasznos"
        ],
        correct: 1
    },
    {
        question: "Milyen adatokra van szüksége az AI-nak tanuláshoz?",
        options: [
            "Szörnyűen sok, rossz minőségű adat",
            "Kevés, de kiváló minőségű adat",
            "Egyáltalán nem kell adat",
            "Csak videóadatok"
        ],
        correct: 1
    },
    {
        question: "Mit jelent az 'deep learning' vagy mélytanulás?",
        options: [
            "Hosszú ideig tanulmányozni valamit",
            "Több rétegű neurális hálózatok használata",
            "A fejből tanulni",
            "Nem létezik valódi fogalom"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answers = [];

// Initialize Quiz
function initQuiz() {
    document.getElementById('totalQuestions').textContent = quizData.length;
    showQuestion();
}

// Show current question
function showQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });

    updateProgress();
}

// Handle answer selection
function selectAnswer(index) {
    const question = quizData[currentQuestion];
    answers[currentQuestion] = index;
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((btn, i) => {
        btn.disabled = true;
        if (i === question.correct) {
            btn.classList.add('correct');
        } else if (i === index && index !== question.correct) {
            btn.classList.add('incorrect');
        }
    });

    if (index === question.correct) {
        score++;
    }

    setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
}

// Show results
function showResults() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';
    
    const percentage = (score / quizData.length) * 100;
    let title, icon, resultText;

    if (percentage === 100) {
        title = "Tökéletes! 🌟";
        icon = "🏆";
        resultText = "Kiváló! Valóban szakértő vagy az AI-ban!";
    } else if (percentage >= 80) {
        title = "Nagyon jó! 👏";
        icon = "🎯";
        resultText = "Szinte tökéletes! Valóban jól ismered az AI-t.";
    } else if (percentage >= 60) {
        title = "Jó teljesítmény! ✨";
        icon = "⭐";
        resultText = "Jó alapismereteid vannak, de tanulhatsz még!";
    } else {
        title = "Kicsit több gyakorlat kell! 📚";
        icon = "📖";
        resultText = "Ne aggódj! A tanulás folyamatos folyamat.";
    }

    document.getElementById('resultsIcon').textContent = icon;
    document.getElementById('resultsTitle').textContent = title;
    document.getElementById('resultsText').innerHTML = `
        <p><strong>${resultText}</strong></p>
        <p style="margin-top: 1rem; font-size: 1.5rem;">
            <span style="color: var(--primary); font-weight: bold;">${score}/${quizData.length}</span> helyes válasz
        </p>
    `;

    let resultsList = '<h4 style="margin-bottom: 1rem;">Válaszaid:</h4>';
    quizData.forEach((q, i) => {
        const isCorrect = answers[i] === q.correct;
        const itemClass = isCorrect ? '' : ' wrong';
        resultsList += `
            <div class="result-item${itemClass}">
                <strong>${i + 1}. ${q.question}</strong>
                <p style="margin-top: 0.5rem; color: var(--slate-400);">
                    Válaszod: ${q.options[answers[i]]} ${isCorrect ? '✓' : '✗'}
                </p>
            </div>
        `;
    });
    document.getElementById('resultsList').innerHTML = resultsList;
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = [];
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    showQuestion();
}

// Smooth scroll for navigation links
function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Button interactions
function setupButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupButtons();
    initQuiz();
});
