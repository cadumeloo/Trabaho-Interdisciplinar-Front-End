document.addEventListener('DOMContentLoaded', () => {
    const moviesContainer = document.getElementById('movies-container');

    // Função para exibir os filmes
    function displayMovies(movies) {
        moviesContainer.innerHTML = ''; // Limpa os filmes existentes
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
                window.location.href = movie.link;
            });

            moviesContainer.appendChild(movieItem);
        });
    }

    // Função para buscar e filtrar os filmes
    function fetchAndFilterMovies() {
        // Buscar o JSON de filmes
        fetch('../../assets/db/filmes.json')
            .then(response => response.json())
            .then(data => {
                const movies = data.filme;
                const surveyData = JSON.parse(localStorage.getItem("responses"));

                if (!surveyData) {
                    // Se não houver dados do questionário no local storage, exibir todos os filmes
                    displayMovies(movies);
                    return;
                }

                // Filtrar os filmes com base nas respostas do questionário
                const filteredMovies = movies.filter(movie => {
                    return surveyData.some(response => response.favoriteMovies.includes(movie.titulo));
                });

                // Exibir os filmes filtrados
                displayMovies(filteredMovies);
            })
            .catch(error => console.error("Erro ao buscar filmes:", error));
    }

    // Chamar a função para buscar e filtrar os filmes ao carregar a página
    fetchAndFilterMovies();
});
