async function lerJson() {
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));

    if (selectedMovie) {
        const titulo = document.getElementById('titulo');
        titulo.textContent = selectedMovie.titulo;

        const sinopse = document.getElementById('sinopse');
        sinopse.textContent = "Sinopse: " + selectedMovie.sinopse;

        const categorias = document.getElementById('categorias');
        categorias.textContent = selectedMovie.categoria.join(", ");

        const lancamento = document.getElementById('lancamento');
        lancamento.textContent = selectedMovie.lancamento;

        const ondeencontrar = document.getElementById('ondeencontrar');
        selectedMovie.streaming.forEach(element => {
            ondeencontrar.textContent += element.nome + ", ";
        });

        const diretor = document.getElementById('diretor');
        diretor.textContent = selectedMovie.diretor;

        const atores = document.getElementById('atores');
        selectedMovie.atores.forEach(element => {
            atores.textContent += element.nome + ", ";
        });

        const imdb = document.getElementById('imdb');
        imdb.textContent += selectedMovie.imdb;

        const rotten = document.getElementById('rotten');
        rotten.textContent += selectedMovie.rotten;

        const movieImage = document.getElementById('movie-image');
        movieImage.src = selectedMovie.imagem;
        movieImage.alt = `Imagem do filme ${selectedMovie.titulo}`;
    } else {
        console.error('No movie selected');
    }
}

document.addEventListener('DOMContentLoaded', lerJson);
