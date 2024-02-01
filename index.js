const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ' + err.message);
    } else {
        console.log('Conexão ao MySQL estabelecida');
    }
});

// Configuração do Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para lidar com o envio do formulário
app.post('/send', (req, res) => {
    const { name, email, telephone } = req.body;
name
    const sql = 'INSERT INTO doctype.site_leads (name, email, telephone) VALUES (?, ?, ?)';
    db.query(sql, [name, email, telephone], (err, result) => {
        if (err) {
            console.error('Erro ao inserir registro: ' + err.message);
            res.status(500).send('Erro interno ao processar o formulário!');
        } else {
            console.log('Registro inserido com sucesso!');
            res.send('Formulário enviado com sucesso!');
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});