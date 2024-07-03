document.addEventListener('DOMContentLoaded', function() {
    const faqs = document.querySelectorAll('.faq');
    const responseBox = document.getElementById('response-box');
    const userQuestionInput = document.getElementById('user-question');

    faqs.forEach(faq => {
        faq.addEventListener('click', function(event) {
            event.stopPropagation(); 
            let response = '';
            switch (faq.id) {
                case 'faq1':
                    response = 'O site FilmFlock é uma plataforma que foi feita para recomendar filmes para seus usuários com base em seu perfil.';
                    break;
                case 'faq2':
                    response = 'Film vêm de filmes e Flock significa rebanho em inglês, logo, o site é um acervo de filmes.';
                    break;
                case 'faq3':
                    response = 'Sim, todas as informações, tanto dos atores, quanto dos filmes e dos diretores são confiáveis.';
                    break;
                case 'faq4':
                    response = 'Não, no nosso site você não consegue assistir os filmes, apenas avaliá-los.';
                    break;
            }
            responseBox.innerText = response;
            responseBox.style.display = 'block';
        });
    });

    document.addEventListener('click', function() {
        responseBox.style.display = 'none';
    });

    userQuestionInput.addEventListener('click', function(event) {
        event.stopPropagation();  
        responseBox.style.display = 'none';
    });

    userQuestionInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const question = userQuestionInput.value.trim();
            if (question) {
                let questions = JSON.parse(localStorage.getItem('userQuestions')) || [];

                // Modifiquei para usar a chave 'pergunta' ao invés de 'question'
                questions.push({ pergunta: question });

                localStorage.setItem('userQuestions', JSON.stringify(questions));

                alert('Sua pergunta foi salva!');
                userQuestionInput.value = '';
            }
        }
    });
});
