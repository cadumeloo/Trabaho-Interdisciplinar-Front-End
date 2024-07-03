// Função para adicionar estrelas de avaliação
function adicionarEstrelas(nota) {
    const estrelas = document.querySelectorAll('.estrela');
    estrelas.forEach((estrela, index) => {
        if (index < nota) {
            estrela.classList.add('ativa');
        } else {
            estrela.classList.remove('ativa');
        }
    });
  }
  
  // Função para curtir o filme
  function curtirFilme() {
    const coracao = document.querySelector('.coracao');
    coracao.classList.toggle("ativo");
  }
  
  // Função para salvar a publicação
  function salvarPublicacao() {
    const texto = document.getElementById('texto').value;
    const nota = document.querySelectorAll('.estrela.ativa').length;
    const curtida = document.querySelector('.coracao').classList.contains('ativo');
    const data = document.getElementById('data').value;
    const plataforma = document.getElementById('plataforma').value;
    const imagem = "oppenhaimer_poster_4k.png"; // Nome do arquivo de imagem
    const filme = document.querySelector('.main-title').innerText; // Pega o texto do elemento com a classe .main-title
  
    const publicacao = {
        filme: filme,
        texto: texto,
        nota: nota,
        curtida: curtida,
        data: data,
        plataforma: plataforma,
        imagem: imagem
    };
  
    // Verifica se o localStorage está disponível no navegador
    if (typeof(Storage) !== "undefined") {
        // Obtém as publicações já armazenadas ou inicializa um array vazio se não houver
        let publicacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
      console.log(publicacao)
        // Adiciona a nova publicação ao array
        publicacoes.push(publicacao);
  
        // Atualiza o localStorage com o novo array de publicações
        localStorage.setItem('avaliacoes', JSON.stringify(publicacoes));
        console.log(publicacoes)
  
        console.log('Publicação salva no localStorage:', publicacao);
  
        // Limpar campos do formulário após salvar
        limparCampos();
  
        // Exemplo de feedback para o usuário
        alert('Avaliação salva com sucesso!');
    } else {
        console.error('LocalStorage não suportado pelo navegador.');
    }
  }
  
  // Função para limpar os campos do formulário após salvar
  function limparCampos() {
    document.getElementById('texto').value = '';
    document.querySelectorAll('.estrela').forEach(estrela => estrela.classList.remove('ativa'));
    document.querySelector('.coracao').classList.remove('ativo');
    document.getElementById('data').value = '';
    document.getElementById('plataforma').value = '';
  }
  
  // Função para formatar a data
  function formatarData(input) {
    const valor = input.value.replace(/\D/g, '');
    const partes = [];
    if (valor.length > 0) partes.push(valor.substring(0, 2));
    if (valor.length > 2) partes.push(valor.substring(2, 4));
    if (valor.length > 4) partes.push(valor.substring(4, 8));
    input.value = partes.join('/');
  }
  
  // Event listener para botão de salvar publicação
  document.getElementById('salvar').addEventListener('click', salvarPublicacao);
  
  // Event listeners para estrelas de avaliação
  document.querySelectorAll('.estrela').forEach((estrela, index) => {
    estrela.addEventListener('click', () => {
        if (estrela.classList.contains('ativa')) {
            adicionarEstrelas(index);
        } else {
            adicionarEstrelas(index + 1);
        }
    });
  });
  
  // Event listener para botão de curtir
  document.querySelector('.coracao').addEventListener('click', () => {
    curtirFilme(document.querySelector('.coracao'));
  });
  
  // Event listener para botão de curtir
  document.querySelector('.coracao').addEventListener('click', () => {
  curtirFilme(document.querySelector('.coracao'));
  });
  
  
  
  function mostraInfo(){
    let titulo  = document.getElementById('title')
    // Obter o nome do filme da URL
    const nomeFilmeCodificado = obterParametroURL('filme');
    const nomeFilme = decodeURIComponent(nomeFilmeCodificado);
  
    // Exemplo de uso: imprimir o nome do filme
    console.log(nomeFilme); // Saída: Invocação do Mal
    fetchJsonData(url,nomeFilme);
  }
  
  // Função para obter parâmetros da URL
  function obterParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
  }
  
  // Função para buscar e processar dados do JSON
  async function fetchJsonData(url, nomeFilme) {
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
  
  // Função para mostrar informações do filme
  function mostraInfo() {
    const titulo = document.getElementById('title');
    const nomeFilmeCodificado = obterParametroURL('filme');
    const nomeFilme = decodeURIComponent(nomeFilmeCodificado);
  
    // Exemplo de uso: imprimir o nome do filme
    console.log(nomeFilme); // Saída: Invocação do Mal
  
    // URL do arquivo JSON
    const url = '../../assets/db/filmes.json';
  
    // Chamada para buscar os dados do JSON
    fetchJsonData(url, nomeFilme)
      .then(data => {
        // Verificar se o nome do filme corresponde e processar os dados
        let html = '';
        data.filme.forEach(filme => {
          if (filme.titulo === nomeFilme) {
            console.log('Filme encontrado:', filme);
            // Aqui você pode fazer o que precisa com o filme encontrado
            // Por exemplo, adicionar informações do filme à página
            titulo.innerText = filme.titulo; // Exemplo de uso para mostrar título na página
            // Outras operações conforme necessário
          }
        });
      })
      .catch(error => {
        // Tratamento de erro caso ocorra algum problema no fetchJsonData
        console.error('Erro no uso da função fetchJsonData:', error);
      });
  }
  
  // Event listener para chamar mostraInfo ao carregar a página
  document.addEventListener('DOMContentLoaded', mostraInfo);
  