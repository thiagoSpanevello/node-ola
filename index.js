const bodyparser = require("body-parser");
const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(bodyparser.json());
const cors = require('cors');
app.use(bodyparser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "employees"

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

app.get('/enviar', function(req, res){
    connection.query(`select avg(salary) as media, Year(from_date) as ano from salaries group by Year(from_date)`, function(error, results, fields){
        if(error)
        res.json(error);
        else
        res.json(results)
    })
})

    



app.listen(80, function () { console.log('example app listening on port 80  ') });


