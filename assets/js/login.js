const apiURL = '/Users';

async function pegarUsuarios() {
    try {
        let response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log(data);
        // Processar os dados como necessário
    } catch (error) {
        console.error('Erro ao pegar usuários:', error);
    }
}

// Chame a função para pegar os usuários
pegarUsuarios();




function logar() {
    var pegaUsuario = document.getElementById('usuario').value;
    var pegaSenha = document.getElementById('senha').value;
    let validaLogin = false;
  
    // Obter os dados do localStorage
    var armazenadoItens = JSON.parse(localStorage.getItem("login"));
  
    // Verificar se os dados do usuário estão corretos
    for (let i = 0; i < armazenadoItens.length; i++) {
      if (pegaUsuario === armazenadoItens[i].nome && pegaSenha === armazenadoItens[i].senha) {
        validaLogin = true;
        break;
      }
    }
    user = {
            "User": pegaUsuario,
          }

    user = JSON.stringify(user)
  
    if (validaLogin = true) {
      alert("sucesso");
      sessionStorage.setItem("UserLogado", user)
      location.href = '../../index.html';
    } else {
      alert("Usuário ou senha incorreta");
    }
  }