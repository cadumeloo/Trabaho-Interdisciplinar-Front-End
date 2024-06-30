document.addEventListener('DOMContentLoaded', () => {
    const moviesContainer = document.getElementById('movies-container');

    const moviesData = [
        {
            "nome": "Filme X",
            "imagem": "https://via.placeholder.com/50",
            "link": "https://example.com/filme-x"
        },
        {
            "nome": "Filme Y",
            "imagem": "https://via.placeholder.com/50",
            "link": "https://example.com/filme-y"
        },
        {
            "nome": "Filme Z",
            "imagem": "https://via.placeholder.com/50",
            "link": "https://example.com/filme-z"
        }
    ];

    function displayMovies(movies) {
        moviesContainer.innerHTML = ''; // Limpa os filmes existentes
        movies.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            
            const movieImg = document.createElement('img');
            movieImg.src = movie.imagem;
            movieImg.alt = `Imagem do filme ${movie.nome}`;
            
            const movieName = document.createElement('div');
            movieName.classList.add('movie-name');
            movieName.textContent = movie.nome;

            movieItem.appendChild(movieImg);
            movieItem.appendChild(movieName);
            movieItem.addEventListener('click', () => {
                window.location.href = movie.link;
            });

            moviesContainer.appendChild(movieItem);
        });
    }

    // Exibição inicial
    displayMovies(moviesData);

    // Simula o recebimento de novos dados
    setTimeout(() => {
        const newMovie = {
            "nome": "Filme Novo",
            "imagem": "https://via.placeholder.com/50",
            "link": "https://example.com/filme-novo"
        };
        moviesData.push(newMovie);
        displayMovies(moviesData);
    }, 5000); // Adiciona um novo filme após 5 segundos
});
