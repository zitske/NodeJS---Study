const { json } = require('express');
const express = require('express');
const server = express();
server.use(express.json());
//npm run auto
//Query params = ?nome=NodeJS
//Route params = /cursos/2
//Request body = {nome: 'Nodejs', tipo: 'Backend'}
//CRUD = Createm, Read, Update, Delete

const cursos = ['NodeJS', 'Dart', 'JavaScript', 'Flutter'];

//Middleare Global
server.use((req, res, next) => {
    console.log(`URL CHAMADA ${req.url}`);

    return next();
});

function checkCurso(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: "O nome do curso e obrigatorio!" });
    }
    return next();
}

function checkIndexCurso(req, res, next) {
    const curso = cursos[req.params.index];
    if (!curso) {
        return res.status(400).json({ error: "O curso nao existe" });
    }
    return next();
}


server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

//localhost:300/cursos
server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;
    //return res.send('Hello World!');
    return res.json(cursos[index]);
});


//Criando um novo curso
server.post('/cursos', checkCurso, (req, res) => {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

//Atualizando um curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
});

//Deletando um curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;
    cursos.splice(index, 1);

    return res.json(cursos);
})

server.listen(3000);

