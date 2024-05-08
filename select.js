const db = require("./db_config");

const sql = "SELECT * FROM favorite_songs";


db.all(sql, (err, rows)=>{
    if(err) throw err;

    if(rows.length > 0){
        // cetak isi rows
        rows.forEach((item) =>{
            console.log(`[${item.id}] ${item.artist} - ${item.title}`);
        });
    } else {
        console.log("tidak ada data");
    }
});

db.close();