const express = require("express");

const server = express();

server.use(express.json());

//Middleware global
server.use((req, res, next) => {
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);

  return next();
});

//Middleware local
function checarUsuarioExiste(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "nome é requerido" });
  }

  return next();
}

function checarUsuarioDentroArray(req, res, next) {
  const user = [req.params.userId];

  if (!user) {
    return res.status(400).json({ error: "Usuario nao existe" });
  }

  req.user = user;

  return next();
}

const user = [];

server.get("/api", (req, res) => {
  return res.json({ ok: true });
});

server.get("/api/user", (req, res) => {
  return res.json(user);
});

server.get("/api/user/:userId", checarUsuarioDentroArray, (req, res) => {
  return res.json(req.user);
});

server.post("/api/user", checarUsuarioExiste, (req, res) => {
  const { name } = req.body;

  user.push(name);

  return res.json(user);
});

server.put(
  "/api/user/:userId",
  checarUsuarioExiste,
  checarUsuarioDentroArray,
  (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    user[userId] = name;

    return res.json(user);
  }
);

server.delete("/api/user/:userId", checarUsuarioDentroArray, (req, res) => {
  const { userId } = req.params;

  user.splice(userId, 1);

  return res.json({ ok: true });
});

server.listen(3333);
