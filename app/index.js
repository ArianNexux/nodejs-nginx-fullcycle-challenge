const express = require('express')
const mysql = require('mysql2')

const app = express();
app.use(express.json())
const conn = mysql.createConnection({
    host: 'db_server',
    user: 'root',
    password: 'root',
    database: 'node-challenge'
})

conn.query("CREATE TABLE IF NOT EXISTS people(id int auto_increment, name varchar(2550), primary key(id))")
app.get('/', (req, res) => {
    const queryToInsert = "INSERT INTO people(name) VALUES('Arian D.') "
    conn.query(queryToInsert, function (err) {
        let listName = "<h1>Full Cycle Rocks!</h1>";
        listName += "<ul>";
        const queryToFetch = "SELECT * FROM people";
        conn.query(queryToFetch, function (err, result, fields) {
            if (err) throw err;
            result.map(e => {
                listName += `<li> ${e.id}  -  ${e.name}</li>`
            })
            listName += "</ul>"
            res.send(listName)
        });
    })
})

app.listen(3000, () => {
    console.log("RUNNING ON PORT 3000")
})