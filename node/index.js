const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db_mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql2');
const connection = mysql.createConnection(config);

connection.query(
    `INSERT INTO people (name) VALUES ('Full Cycle')`
);
connection.query(
    `INSERT INTO people (name) VALUES ('Vinicius')`
);

app.get("/", (req, res) => {
  
    connection.query("SELECT name FROM people", (err, results) => {
      if (err) {
        res.status(500).send("Erro ao buscar nomes");
        return;
      }
  
      let namesList = results.map(row => `<li>${row.name}</li>`).join("");
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
    });
  });
  
  

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
