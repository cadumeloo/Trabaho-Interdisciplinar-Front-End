const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const cors = require('cors');

const app = express();
const router = jsonServer.router(path.join(__dirname, 'assets/db/db.json'));
const middlewares = jsonServer.defaults();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para servir arquivos estáticos do diretório 'assets'
app.use(express.static(path.join(__dirname, 'assets')));

// Middleware para servir o index.html para a rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware para servir arquivos HTML diretamente do diretório 'assets/pages'
app.use('/assets/pages', express.static(path.join(__dirname, 'assets/pages')));

// Middleware para as rotas da API JSON Server
app.use('/api', router);

// Iniciar o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
