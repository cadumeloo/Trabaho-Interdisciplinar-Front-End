
$(document).ready(function() {
    $('#movieForm').submit(function(event) {
        event.preventDefault();
        var fileInput = $('#foto')[0];
        if (fileInput.files.length === 0) {
            alert('Por favor, selecione uma imagem.');
            return;
        }

        var uniqueID = 'movie-' + Date.now();

        var formData = new FormData(this);
        var movieData = {
            id: uniqueID,
            nome: formData.get("nome"),
            sinopse: formData.get("sinopse"),
            categorias: [$("#categorias").val()],
            data: formData.get("data"),
            ondeEncontrar: formData.get("ondeEncontrar").split(',').map(item => item.trim()),
            fotofilme: formData.get("fotofilme"),
            atores: formData.get("atores").split(',').map(item => item.trim()),
            imdb: formData.get("imdb"),
            rotten: formData.get("rottenTomatoes"),
        };

        // Converte a imagem para base64
        getBase64(fileInput.files[0]).then(fotoData => {
            movieData.foto = fotoData;

            // Envia os dados para o servidor
            $.ajax({
                url: 'https://74d72406-59af-43c7-8b17-8a57fb527e10-00-1ffcuaryhf96y.worf.replit.dev/filmes',
                type: 'POST',
                data: JSON.stringify(movieData),
                contentType: "application/json",
                success: function(response) {
                    console.log("Filme cadastrado com sucesso", response);
                    $('#movieForm')[0].reset();
                },
                error: function(error) {
                    console.log("Falha ao cadastrar filme", error);
                }
            });
        });
    });

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
});


var choices = new Choices('#categorias', {
    allowHTML: true,
    removeItemButton: false,
    searchEnabled: true,
    placeholder: true,
    placeholderValue: 'Selecione as categorias',
    searchPlaceholderValue: 'Pesquise um esporte',
    itemSelectText: 'Pressione para selecionar',
    maxItemCount: 10,
    renderChoiceLimit: 10
});
