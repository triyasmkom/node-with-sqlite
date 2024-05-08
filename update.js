const db = require("./db_config");

const sql = `UPDATE favorite_songs 
        SET title="Don't Matter"
        WHERE id=?`;

songId = 3;

db.run(sql, [songId], (err) => {
  if (!err) console.log("1 record updated");
});

db.close();