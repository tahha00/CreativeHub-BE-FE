const fs = require('fs');
require('dotenv').config()

const db = require("./connect");

const sql = fs.readFileSync('./database/setup.sql').toString()

db.query(sql)
    .then(data => {
        db.end();
        console.log("Database has been seeded 🌱..");
    })
    .catch(error => console.log(error));
