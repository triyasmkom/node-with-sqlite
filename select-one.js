const db = require("./db_config");

const sql = "SELECT * FROM favorite_songs WHERE title=?";
songTitle = "Umbrella";


db.get(sql, [songTitle], (err, row)=>{
    if(err) throw err;

    if(row){
        // cetak isi rows
         console.log(`[${row.id}] ${row.artist} - ${row.title}`);
    } else {
        console.log("tidak ada data");
    }
});

db.close();