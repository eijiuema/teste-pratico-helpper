const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors')
const fs = require('fs');

const db = new sqlite3.Database(':memory:');
const schema = fs.readFileSync('./schema.sql').toString();

db.serialize(() => {
    db.run(schema);
});

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/api/clientes', (req, res) => {
    db.all('SELECT * FROM clientes', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.json(rows.map(row => {
                return {
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cpf_cnpj: row.cpf_cnpj,
                    telefone: row.telefone,
                    cep: row.cep,
                    logradouro: row.logradouro,
                    numero: row.numero,
                    bairro: row.bairro,
                    cidade: row.cidade,
                    estado: row.estado,
                }
            }));
        }
    });
});

app.get('/api/clientes/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM clientes WHERE id = $id', { $id: id }, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else if (typeof row === 'undefined') {
            res.status(404).send();
            return;
        } else {
            res.send(row);
        }
    });
});

app.post('/api/clientes', (req, res) => {
    const { nome, email, cpf_cnpj, telefone, cep, logradouro, numero, bairro, cidade, estado } = req.body;

    db.run('INSERT INTO clientes (nome, email, cpf_cnpj, telefone, cep, logradouro, numero, bairro, cidade, estado) VALUES ($nome, $email, $cpf_cnpj, $telefone, $cep, $logradouro, $numero, $bairro, $cidade, $estado)', {
        $nome: nome,
        $email: email,
        $cpf_cnpj: cpf_cnpj,
        $telefone: telefone,
        $cep: cep,
        $logradouro: logradouro,
        $numero: numero,
        $bairro: bairro,
        $cidade: cidade,
        $estado: estado,
    }, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.set('Location', `http://localhost:${port}/api/clientes/${this.lastID}`).status(201).send();
        }
    });
});

app.delete('/api/clientes/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM clientes WHERE id = $id', { $id: id }, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            this.changes > 0 ? res.status(204).send() : res.status(404).send();
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));