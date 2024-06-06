document.addEventListener("DOMContentLoaded", function() {
    const filmes = {
        "categorias": [
            {
                "genero": "Ficção Científica",
                "filmes": [
                    { "titulo": "Interestelar", "nota": "9.5/10" },
                    { "titulo": "A Origem", "nota": "9.3/10" }
                ]
            },
            {
                "nome": "Drama",
                "filmes": [
                    { "titulo": "Um Sonho de Liberdade", "nota": "9.2/10" },
                    { "titulo": "A Lista de Schindler", "nota": "9.0/10" }
                ]
            },
            {
                "nome": "Ação",
                "filmes": [
                    { "titulo": "O Cavaleiro das Trevas", "nota": "9.3/10" },
                    { "titulo": "Gladiador", "nota": "8.8/10" }
                ]
            },
            {
                "nome": "Crime",
                "filmes": [
                    { "titulo": "O Poderoso Chefão", "nota": "9.5/10" },
                    { "titulo": "Pulp Fiction", "nota": "9.0/10" }
                ]
            },
            {
                "nome": "Suspense",
                "filmes": [
                    { "titulo": "Seven - Os Sete Crimes Capitais", "nota": "8.6/10" },
                    { "titulo": "Clube da Luta", "nota": "8.8/10" }
                ]
            }
        ]
    };

    const moviesTable = document.getElementById("moviesTable").getElementsByTagName("tbody")[0];

    for (let i = 0; i < moviesTable.rows.length; i++) {
        moviesTable.rows[i].onclick = function(event) {
            if (event.target.classList.contains('remove-button')) {
                removeMovieFromRow(this);
            } else {
                displayAllMovies(filmes, this);
            }
        };
    }

    loadStoredMovies();
});

function displayAllMovies(filmes, row) {
    const allMoviesContainer = document.getElementById('allMoviesContainer');
    const allMoviesList = document.getElementById('allMoviesList');
    allMoviesList.innerHTML = ''; 

    filmes.categorias.forEach(categoria => {
        categoria.filmes.forEach(filme => {
            const movieItem = document.createElement('div');
            movieItem.className = 'movie-item';
            movieItem.textContent = filme.titulo;
            movieItem.onclick = () => {
                addMovieToRow(filme, row);
                allMoviesContainer.style.display = 'none'; 
            };

            allMoviesList.appendChild(movieItem);
        });
    });

    allMoviesContainer.style.display = 'block'; 
}

function addMovieToRow(filme, row) {
    row.cells[1].textContent = filme.titulo;
    row.cells[2].textContent = filme.nota;
    saveRowToStorage(row);
}

function removeMovieFromRow(row) {
    row.cells[1].textContent = "Adicionar filme";
    row.cells[2].textContent = "";
    removeRowFromStorage(row);
}

function saveRowToStorage(row) {
    let storedMovies = JSON.parse(localStorage.getItem('storedMovies')) || {};
    storedMovies[row.cells[0].textContent] = {
        title: row.cells[1].textContent,
        rating: row.cells[2].textContent
    };
    localStorage.setItem('storedMovies', JSON.stringify(storedMovies));
}

function removeRowFromStorage(row) {
    let storedMovies = JSON.parse(localStorage.getItem('storedMovies')) || {};
    delete storedMovies[row.cells[0].textContent];
    localStorage.setItem('storedMovies', JSON.stringify(storedMovies));
}

function loadStoredMovies() {
    const storedMovies = JSON.parse(localStorage.getItem('storedMovies')) || {};
    const moviesTable = document.getElementById("moviesTable").getElementsByTagName("tbody")[0];

    for (let i = 0; i < moviesTable.rows.length; i++) {
        const row = moviesTable.rows[i];
        const movieData = storedMovies[row.cells[0].textContent];
        if (movieData) {
            row.cells[1].textContent = movieData.title;
            row.cells[2].textContent = movieData.rating;
        }
    }
}