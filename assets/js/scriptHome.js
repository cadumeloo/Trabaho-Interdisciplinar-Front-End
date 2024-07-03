

function navigateTo(page) {
    window.location.href = page;
}



function verificaLogado(){
    userLogado = sessionStorage.getItem("UserLogado")
    console.log("foi")
    if(userLogado){
        let cad = document.getElementById("botao")
        cad.innerHTML = '<button id="questionario" onclick="navigateTo(\'assets/pages/questionario.html\')">Fazer questionário</button>';
        fetchJsonData(url);
    }
}

async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao tentar acessar ${url}, status ${response.status}`);
        }
        const data = await response.json();
        console.log('Dados recebidos:', data);
        return data;
    } catch (error) {
        console.error('Erro durante o fetch:', error);
        throw error; // Lança o erro novamente para que possa ser tratado externamente, se necessário
    }
  }
  
  // Exemplo de uso da função fetchJsonData com a URL do arquivo JSON
  const url = '../../assets/db/filmes.json';
  fetchJsonData(url)
    .then(data => {
        // Aqui você pode trabalhar com os dados recebidos
        console.log('Dados recebidos dentro do then do fetchJsonData:', data);
        let html = '';
        // Elemento onde os cards serão inseridos
        const cad = document.getElementById('divCards');
        data.filme.forEach(filme => {
            html += criarCardFilme(filme);
        });
        cad.innerHTML = html;
    })
    .catch(error => {
      // Tratamento de erro caso ocorra algum problema no fetchJsonData
      console.error('Erro no uso da função fetchJsonData:', error);
    });
  


// Função para criar o HTML de cada card de filme
function criarCardFilme(filme) {
    // Codificar o título do filme para ser usado na URL
    const tituloCodificado = encodeURIComponent(filme.titulo);
    
    return `
      <div class="col-md-6">
        <a href="./assets/pages/sistema_de_avaliaçao.html?filme=${tituloCodificado}">
          <div class="card">
            <img src="${filme.imagem}" class="card-img-top" alt="${filme.titulo}">
            <div class="card-body">
              <h5 class="card-title">${filme.titulo}</h5>
              <p class="card-text">${filme.sinopse}</p>
              <p><strong>Diretor:</strong> ${filme.diretor}</p>
              <p><strong>Lançamento:</strong> ${filme.lancamento}</p>
              <p><strong>IMDB:</strong> ${filme.imdb}</p>
              <p><strong>Rotten Tomatoes:</strong> ${filme.rotten}</p>
              <p><strong>Categoria:</strong> ${filme.categoria.join(', ')}</p>
              <a href="${filme.trailers[0].link}" class="btn btn-primary" target="_blank">${filme.trailers[0].nome}</a>
            </div>
          </div>
        </a>
      </div>
    `;
  }
  