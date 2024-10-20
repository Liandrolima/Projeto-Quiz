const questions = [
    "São processos administrativos. Exceto:",
    "Função administrativa que consiste em verificar se as coisas estão sendo feitas de acordo com o plano adotado, as instruções transmitidas e os princípios estabelecidos.",
    "As funções do administrador e as funções básicas de uma empresa foram apresentadas no",
    "Estrutura organizacional baseada no modelo piramidal é conhecida como:",
    "São exemplos de princípios gerais de administração segundo Fayol",
    "São funções da ORT:",
    "A afirmativa que informa as três formas de autoridade e a forma de autoridade mais eficiente segundo Max Webber são:",
    "Segundo Henri Fayol, as funções básicas ou operações essenciais das empresas são:",
    "São princípios da burocracia:",
    "Princípios adotados por Ford:"
];

const options = [
    ["Planejamento e direção", "Organização e controle", "Planejamento e controle", "Coordenação e departamentalização"],
    ["Previsão", "Controle", "Coordenação", "Organização"],
    ["Taylorismo", "Fordismo", "Fayolismo", "Humanismo"],
    ["Staff", "Linear", "Organização formal", "Funcional"],
    ["Divisão do trabalho, autoridade e responsabilidade, disciplina, unidade de comando.", "Estabelecimento de recursos, unidade de direção", "Planejamento, controle e coordenação.", "Tempos e movimentos, liderança, efetividade e eficiência."],
    ["Divisão do trabalho e especialização do operário, estudo da fadiga humana, hierarquia e autoridade.", "Desenho de cargos e de tarefas, estudo da fadiga humana, conceito de homo economicus.", "Padronização de métodos e de máquinas, estudo da organização informal.", "Divisão do trabalho, incentivos salariais e prêmios de produção, ênfase na estrutura organizacional"],
    ["Tradicional, carismática, racional-legal", "Tradicional, carismática, racional-legal, racional-legal", "Tradicional, carismática, carismática, racional-legal", "Sinceramente não sei"],
    ["Produção, vendas, pessoal e finanças", "Planejamento, organização, direção e controle.", "Pesquisa, previsão, planejamento, organização e controle.", "Técnica, comercial, contábil, segurança e administração."],
    ["Hierarquia e autoridade, profissionalização dos participantes, especialização da administração, competência técnica e meritocracia, pessoalidade nas relações", "Rotinas e procedimentos padronizados, caráter informal das comunicações, especialização da administração.", "Completa previsibilidade do funcionamento, competência técnica e meritocracia,hierarquia e autoridade, profissionalismo dos participantes.", "Rotinas e procedimentos padronizados, competência técnica e antiguidade, hierarquia e autoridade, competência técnica e meritocracia, profissionalização dos participantes, caráter racional e divisão do trabalho "],
    ["Planejamento, intensificação, coordenação.", "Intensificação, economicidade, empregabilidade.", "Produtividade, economicidade, intensificação.", "Produtividade, economicidade, execução, intensificação."]
];

const correctAnswers = [3, 1, 2, 1, 0, 1, 1, 3, 2, 2];

let score = 0;  
let questionsDone = [];  
let correctQuestions = [];
let wrongQuestions = [];
let nowQuestion;
const roletaButton = document.querySelector('#roleta');
roletaButton.style.display = "none";

function submitName() {
    const name = document.querySelector('#nameInput').value;
    const greeting = document.querySelector('#greeting');
    const questionsContainer = document.querySelector('#questions');
    
    if (name) {
        greeting.innerHTML = `Olá, ${name}! Bem-vindo!`;
        greeting.style.color = '#4CAF50'; 
        questionsContainer.style.display = 'block';
        document.querySelector('.input-container').style.display = 'none';
        getRandomQuestion();
    } else {
        greeting.innerHTML = "Por favor, insira seu nome.";
        greeting.style.color = 'red';
    }
}

function getRandomQuestion() {
    if (questionsDone.length === questions.length) {
        showFinalScore();  // Exibe a pontuação final quando todas as perguntas forem feitas
        return;
    }

    do {
        nowQuestion = Math.floor(Math.random() * questions.length);
    } while (questionsDone.includes(nowQuestion));

    questionsDone.push(nowQuestion);
    
    document.querySelector("#question").innerHTML = questions[nowQuestion];
    const optionsContainer = document.querySelectorAll('.alternative');
    
    optionsContainer.forEach((element, index) => {
        element.textContent = options[nowQuestion][index];
        element.setAttribute('data-value', index);
        element.disabled = false;  // Certifica-se de que os botões estão habilitados
        element.style.pointerEvents = 'auto';  // Reativa os botões
        element.style.opacity = '1';  // Restabelece a aparência padrão
    });
}

function selectButton() {
    const alternativas = document.querySelectorAll('.alternative');
    
    alternativas.forEach(button => {
        button.addEventListener('click', () => {
            const answer = parseInt(button.getAttribute('data-value'));
            checkAnswer(answer);
            disableButtons();
        });
    });
}

function disableButtons() {
    const alternativas = document.querySelectorAll('.alternative');
    alternativas.forEach(button => {
        button.style.pointerEvents = 'none';  // Desabilita o clique
        button.style.opacity = '0.6';  // Muda a aparência para indicar desativado
    });
}

function checkAnswer(answer) {
    const statusAnswer = document.querySelector("#statusAnswer");
    
    if (answer === correctAnswers[nowQuestion]) {
        statusAnswer.innerHTML = "Acertou!!!";
        score++;  
        correctQuestions.push(questions[nowQuestion]);
    } else {
        statusAnswer.innerHTML = `Errou! Resposta correta: ${options[nowQuestion][correctAnswers[nowQuestion]]}`;
        wrongQuestions.push(questions[nowQuestion]);
    }
    
    roletaButton.style.display = "block";  
}

function showFinalScore() {
    const totalQuestions = questions.length;
    const finalScore = score;
    const name = document.querySelector('#nameInput').value;

    // Enviar os dados para o servidor aqui
    sendResultsToDatabase(name, finalScore, "Sua mensagem", questions);

    document.body.innerHTML = "";  

    const questionDiv = document.createElement('div');
    questionDiv.id = "question";
    questionDiv.innerHTML = "Você respondeu todas as perguntas!";

    const statusAnswerDiv = document.createElement('div');
    statusAnswerDiv.id = "statusAnswer";
    statusAnswerDiv.innerHTML = `Você acertou ${finalScore} de ${totalQuestions} perguntas.<br>Sua nota final é: ${finalScore}.`;

    const resultMessage = document.createElement('p');
    if (finalScore === 10) {
        resultMessage.innerHTML = "Excelente! Sua nota foi " + finalScore;
    } else if (finalScore === 9) {
        resultMessage.innerHTML = "Ótimo! Sua nota foi " + finalScore;
    } else if (finalScore === 7 || finalScore === 8) {
        resultMessage.innerHTML = "Bom! Sua nota foi " + finalScore;
    } else if (finalScore === 5 || finalScore === 6) {
        resultMessage.innerHTML = "Regular! Sua nota foi " + finalScore;
    } else if (finalScore <= 4) {
        resultMessage.innerHTML = "Precisa melhorar.";
    }

    const correctDiv = document.createElement('div');
    correctDiv.innerHTML = `<strong>Questões corretas:</strong> <br> ${correctQuestions.join('<br>')}`;

    const wrongDiv = document.createElement('div');
    wrongDiv.innerHTML = `<strong>Questões erradas:</strong> <br> ${wrongQuestions.join('<br>')}`;

    document.body.appendChild(questionDiv);
    document.body.appendChild(statusAnswerDiv);
    document.body.appendChild(correctDiv);
    document.body.appendChild(wrongDiv);
    document.body.appendChild(resultMessage);
}

roletaButton.addEventListener('click', () => {
    getRandomQuestion();
    roletaButton.style.display = "none";
    document.querySelector("#statusAnswer").innerHTML = '';
});

selectButton();

// Função para enviar os resultados para o banco de dados
const sendResultsToDatabase = (name, score, resultMessage, answers) => {
    console.log("Enviando resultados ao servidor...");  // Log para verificar chamada da função
    
    fetch('http://localhost:3000/resultados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: name,
            acertos: score,
            total: answers.length // Total de respostas
        })
    })
    .then(response => {
        console.log("Resposta recebida:", response);  // Log da resposta do servidor
        return response.json();
    })
    .then(data => {
        console.log("Dados retornados pelo servidor:", data);  // Log dos dados retornados
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);  // Log de erro
    });
};
