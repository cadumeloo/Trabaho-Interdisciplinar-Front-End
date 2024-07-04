document.addEventListener('DOMContentLoaded', () => {
    const moviesContainer = document.getElementById('movies-container');

    // Função para exibir os filmes
    function displayMovies(movies) {
        console.log("Exibindo filmes:", movies); // Log para depuração
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

            moviesContainer.appendChild(movieItem);
        });
    }

    // Função para buscar e filtrar os filmes
    function fetchAndFilterMovies() {
        // Buscar o JSON de filmes
        fetch('../../assets/db/filmes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar filmes: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log("Dados dos filmes:", data); // Log para depuração
                const movies = data.filme;
                const surveyData = JSON.parse(localStorage.getItem("responses"));
                console.log("Dados do questionário:", surveyData); // Log para depuração

                if (!surveyData) {
                    // Se não houver dados do questionário no local storage, exibir todos os filmes
                    displayMovies(movies);
                    return;
                }

                // Processar dados do questionário
                const favoriteMovies = surveyData.map(item => item.favoriteMovies);
                const favoriteCategories = surveyData.flatMap(item => item.genres);
                const favoriteActors = surveyData.map(item => item.favoriteActors);

                // Filtrar os filmes com base nas respostas do questionário
                const filteredMovies = movies.filter(movie => {
                    const actorNames = movie.atores.map(ator => ator.nome);

                    return favoriteMovies.includes(movie.titulo) ||
                           movie.categoria.some(cat => favoriteCategories.includes(cat)) ||
                           actorNames.some(name => favoriteActors.includes(name));
                });

                // Exibir os filmes filtrados
                displayMovies(filteredMovies);
            })
            .catch(error => console.error("Erro ao buscar filmes:", error));
    }

    // Chamar a função para buscar e filtrar os filmes ao carregar a página
    fetchAndFilterMovies();
});
