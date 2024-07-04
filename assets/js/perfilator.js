document.addEventListener('DOMContentLoaded', () => {
 carregarPagina('http://localhost:3000/Ator');
});

function carregarPagina(apiUrl) {
  fetch(apiUrl) // Caminho para o arquivo JSON local
    .then(response => response.json())
    .then(data => {
      const nome = data.nome;
      const foto = data.foto;
      const nascimento = data.nascimento;
      const cidade = data.cidade;
      const nacionalidade = data.nacionalidade;
      const atividade = data.atividade;
      const biografia = data.biografia;
      const filmes = data.filmes;
      const redesSociais = data.redessociais;

      // Construir conteúdo dinâmico
      const mainContent = document.getElementById('main-content');

      // Criar div do ator
      const atorDiv = document.createElement('div');
      atorDiv.classList.add('ator'); // Adicionar a classe 'ator'

      // Criar div de informações do ator
      const atorInfoDiv = document.createElement('div');
      atorInfoDiv.classList.add('ator-info'); // Adicionar a classe 'ator-info'

      // Inserir imagem do ator
      const fotoAtor = document.createElement('img');
      fotoAtor.src = foto;
      fotoAtor.alt = nome;
      atorInfoDiv.appendChild(fotoAtor);

      // Inserir redes sociais do ator
      const redesSociaisDiv = document.createElement('div');
      redesSociaisDiv.classList.add('redes-sociais');

      // Instagram
      const instagramLink = document.createElement('a');
      instagramLink.href = redesSociais.instagram;
      instagramLink.target = "_blank";
      const instagramImg = document.createElement('img');
      instagramImg.src = "../images/instagram.png"; // Coloque o caminho correto para a imagem do Instagram
      instagramImg.alt = "Instagram";
      instagramLink.appendChild(instagramImg);
      redesSociaisDiv.appendChild(instagramLink);

      // Twitter
      const twitterLink = document.createElement('a');
      twitterLink.href = redesSociais.twitter;
      twitterLink.target = "_blank";
      const twitterImg = document.createElement('img');
      twitterImg.src = "../images/twitter.png"; // Coloque o caminho correto para a imagem do Twitter
      twitterImg.alt = "Twitter";
      twitterLink.appendChild(twitterImg);
      redesSociaisDiv.appendChild(twitterLink);

      // Facebook
      const facebookLink = document.createElement('a');
      facebookLink.href = redesSociais.facebook;
      facebookLink.target = "_blank";
      const facebookImg = document.createElement('img');
      facebookImg.src = "../images/facebook.png"; // Coloque o caminho correto para a imagem do Facebook
      facebookImg.alt = "Facebook";
      facebookLink.appendChild(facebookImg);
      redesSociaisDiv.appendChild(facebookLink);

      atorInfoDiv.appendChild(redesSociaisDiv);


      // Inserir outras informações do ator
      const infoP = document.createElement('p');
      infoP.innerHTML = `<strong>Nascimento:</strong><br class="nascimento">${nascimento}<br><br>
                          <strong>Nacionalidade:</strong><br class="nacionalidade">${cidade}, ${nacionalidade}<br><br>
                          <strong>Atividade:</strong><br class="atividade">${atividade}`;
      atorInfoDiv.appendChild(infoP);


      atorDiv.appendChild(atorInfoDiv);

      // Adicionar div do ator ao conteúdo principal
      mainContent.appendChild(atorDiv);

      // Criar div de detalhes do ator (onde os filmes podem ser exibidos)
      const detalhesDiv = document.createElement('div');
      detalhesDiv.classList.add('detalhes');

      // Criar título do ator
      const nomeAtor = document.createElement('h1');
      nomeAtor.textContent = nome; // Adicionar nome do ator
      detalhesDiv.appendChild(nomeAtor);

      // Inserir biografia do ator
      const biografiaP = document.createElement('p');
      biografiaP.innerHTML = biografia;
      detalhesDiv.appendChild(biografiaP);

      // Criar subtítulo de filmes
      const filmesSubtitulo = document.createElement('h2');
      filmesSubtitulo.textContent = "Filmes"; // Adicionar subtítulo "Filmes"
      detalhesDiv.appendChild(filmesSubtitulo);
      filmesSubtitulo.classList.add('branco')

      // Inserir filmes do ator
      const filmesDiv = document.createElement('div');
      filmesDiv.classList.add('filmes');
      filmes.forEach(filme => {
        const filmeLink = document.createElement('a');
        filmeLink.href = filme.urlFilme;
        filmeLink.target = "_blank";
        const filmeImg = document.createElement('img');
        filmeImg.src = filme.poster;
        filmeImg.alt = filme.titulo;
        filmeLink.appendChild(filmeImg);
        filmesDiv.appendChild(filmeLink);
      });
      
      detalhesDiv.appendChild(filmesDiv);

      // Adicionar div de detalhes ao conteúdo principal
      mainContent.appendChild(detalhesDiv);
    })
    .catch(error => console.error('Erro ao carregar dados do JSON modelo:', error));
}

carregarPagina(); 

// Chamada da função para carregar página com dados do JSON modelo
//carregarPagina('http://localhost:3000/Ator');


