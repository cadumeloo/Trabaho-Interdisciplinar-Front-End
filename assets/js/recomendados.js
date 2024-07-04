document.addEventListener('DOMContentLoaded', () => {
    const moviesContainer = document.getElementById('movies-container');

    // Function to display movies
    function displayMovies(movies) {
        moviesContainer.innerHTML = ''; // Clear existing movies
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            
            const movieImg = document.createElement('img');
            movieImg.src = movie.imagem;
            movieImg.alt = `Imagem do filme ${movie.titulo}`;
            
            const movieName = document.createElement('div');
            movieName.classList.add('movie-name');
            movieName.textContent = movie.titulo;

            movieItem.appendChild(movieImg);
            movieItem.appendChild(movieName);

            movieItem.addEventListener('click', () => {
                localStorage.setItem('selectedMovie', JSON.stringify(movie));
                window.location.href = 'exibirfilme.html';
            });

            moviesContainer.appendChild(movieItem);
        });
    }

    // Function to fetch and filter movies
    function fetchAndFilterMovies() {
        // Fetch the JSON of movies
        fetch('../../assets/db/filmes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar filmes: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const movies = data.filme;
                const surveyData = JSON.parse(localStorage.getItem("responses"));

                if (!surveyData) {
                    // If no survey data, display all movies
                    displayMovies(movies);
                    return;
                }

                // Process survey data
                const favoriteMovies = surveyData.map(item => item.favoriteMovies);
                const favoriteCategories = surveyData.flatMap(item => item.genres);
                const favoriteActors = surveyData.map(item => item.favoriteActors);

                // Filter movies based on survey responses
                const filteredMovies = movies.filter(movie => {
                    const actorNames = movie.atores.map(ator => ator.nome);

                    return favoriteMovies.includes(movie.titulo) ||
                           movie.categoria.some(cat => favoriteCategories.includes(cat)) ||
                           actorNames.some(name => favoriteActors.includes(name));
                });

                // Display filtered movies
                displayMovies(filteredMovies);
            })
            .catch(error => console.error("Erro ao buscar filmes:", error));
    }

    // Call function to fetch and filter movies on page load
    fetchAndFilterMovies();
});
