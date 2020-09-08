const express = require("express");

const server = express();

const Projetos = [];
let contador = 0;

server.use(express.json());

server.use((req, res, next) => {
  contador += 1;

  console.log(`Numero de requisições: ${contador}`);
  return next();
});

function checaExistenciaProjeto(req, res, next) {
  const { index } = req.params;

  if (!Projetos[index]) {
    return res.status(400).json({ error: "Projeto não encontrado" });
  }

  return next();
}

server.get("/projetos", (req, res) => {
  return res.json(Projetos);
});

server.post("/projetos", (req, res) => {
  Projetos.push(req.body);

  return res.json(Projetos);
});

server.put("/projetos/:index", checaExistenciaProjeto, (req, res) => {
  const { index } = req.params;
  const { titulo } = req.body;

  const projeto = Projetos[index];
  projeto.titulo = titulo;

  return res.json(Projetos);
});

server.delete("/projetos/:index", checaExistenciaProjeto, (req, res) => {
  const { index } = req.params;

  Projetos.splice(index, 1);

  return res.json({ ok: true });
});

server.post("/projetos/:index/tarefas", checaExistenciaProjeto, (req, res) => {
  const { index } = req.params;
  const { tarefas } = req.body;

  const projeto = Projetos[index];
  const listaTarefas = projeto.tarefas;

  listaTarefas.push(tarefas);

  return res.json(Projetos);
});

server.listen(3334);
