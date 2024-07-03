document.getElementById('survey-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const favoriteActors = document.getElementById('favorite-actors-directors').value.trim();
    const favoriteMovies = document.getElementById('favorite-movies').value.trim();
    const genres = Array.from(document.querySelectorAll('input[name="genres"]:checked')).map(checkbox => checkbox.value);

    // Verificação de campos obrigatórios
    if (!favoriteActors || !favoriteMovies || genres.length === 0) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const response = {
        favoriteActors,
        favoriteMovies,
        genres
    };

    let responses = JSON.parse(localStorage.getItem('responses')) || [];
    responses.push(response);
    localStorage.setItem('responses', JSON.stringify(responses));

    document.getElementById('survey-form').reset();

    location.href = "FilmesRecomendados.html"
});

document.addEventListener('DOMContentLoaded', function() {
    const responses = JSON.parse(localStorage.getItem('responses')) || [];
    const storedResponsesDiv = document.getElementById('stored-responses');

    if (storedResponsesDiv) {
        storedResponsesDiv.innerHTML = '';

        responses.forEach(response => {
            const responseDiv = document.createElement('div');
            responseDiv.classList.add('response');

            responseDiv.innerHTML = `
                <p><strong>Atores e Diretores Favoritos:</strong> ${response.favoriteActors || 'Não respondido'}</p>
                <p><strong>Filmes Favoritos:</strong> ${response.favoriteMovies || 'Não respondido'}</p>
                <p><strong>Gêneros Favoritos:</strong> ${response.genres.length > 0 ? response.genres.join(', ') : 'Não respondido'}</p>
            `;

            storedResponsesDiv.appendChild(responseDiv);
        });
    }
});
