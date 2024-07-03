document.addEventListener("DOMContentLoaded", function() {
    const filmes = {
        "categorias": [
            {
                "genero": "Ficção Científica",
                "filmes": [
                    { "titulo": "Invocação do Mal", "nota": "7,5/10" },
                    { "titulo": "O Senhor dos Anéis: A Sociedade do Anel", "nota": "8,8/10" }
                ]
            },
            {
                "nome": "Drama",
                "filmes": [
                    { "titulo": "Pulp Fiction: Tempo de Violência", "nota": "8,9/10" },
                    { "titulo": "Interestelar", "nota": "8,6/10" }
                ]
            },
            {
                "nome": "Ação",
                "filmes": [
                    { "titulo": "Matrix", "nota": "8,7/10" },
                    { "titulo": "O Rei Leão", "nota": "8,5/10" }
                ]
            },
            
        ]
    };

    const moviesTable = document.getElementById("moviesTable").getElementsByTagName("tbody")[0];
    const profileModal = document.getElementById("profileModal");
    const profileImage = document.getElementById("profileImage");
    const profileOptionsContainer = document.getElementById("profileOptionsContainer");
    const changeProfileButton = document.getElementById("changeProfileButton");
    const closeModal = document.getElementById("closeModal");

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
    changeProfileButton.onclick = function() {
        loadProfileOptions();
        profileModal.style.display = "block";
    };

    closeModal.onclick = function() {
        profileModal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == profileModal) {
            profileModal.style.display = "none";
        }
    };

    function loadProfileOptions() {
        const profileImages = [
            '../images/avatar1.jpeg',
            '../images/avatar2.png',
            '../images/avatar3.png'
        ];

        profileOptionsContainer.innerHTML = '';
        profileImages.forEach((imageUrl, index) => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.className = 'profile-option';
            img.onclick = () => {
                profileImage.src = imageUrl;
                saveProfileImage(imageUrl);
                profileModal.style.display = "none";
            };
            profileOptionsContainer.appendChild(img);
        });
    }

    function saveProfileImage(url) {
        localStorage.setItem('profileImage', url);
    }

    function loadProfileImage() {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            profileImage.src = storedImage;
        }
    }

    loadProfileImage();
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