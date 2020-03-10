const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const moment = require("moment");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "mydb"

});

connection.connect(function (err) {
    if (err) {
        console.error("erro conectando banco: " + err.stack)
        return;
    }
    console.log("Banco conectado")
});
app.use(cors());

//rotas
app.post('/inputar', function(req, res) {
    console.log(req.body);
    let data = moment(req.body.aniversario, 'DD-MM-YYYY').format('YYYY-MM-DD');
    console.log(data);
    
    connection.query(`insert into alun(nome, aniversario) values ('${req.body.nome}', '${data}')`, function(error, results, fields) {       
        if(error)
        res.json(error);
        else
        res.json({"valor": "1"})
    });
});

app.get('/listar', function(req, res){
    connection.query("select * from alun ", function(error, results, fields){
        if (error)
            res.json(error)
        else
        res.json(results)
    });
});
app.listen(3000, function () { console.log('example app listening on port 3000') });


