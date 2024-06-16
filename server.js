const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Voici la reponse du serveur !");
});

server.listen(process.env.PORT || 3000);
