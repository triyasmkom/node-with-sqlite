const db = require("./db_config");

let sql = `INSERT INTO favorite_songs(title, artist)
            VALUES ('First Love', 'Utada Hikaru')`;

const insert = db.run(sql, (err)=>{
    if(err) throw err;
    console.log("Inserted")
});

console.log(insert);

db.close();