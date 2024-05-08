const db = require("./db_config");

const sql = `DELETE FROM favorite_songs WHERE id=?`;
const songId = 3;

db.run(sql, [songId], (err) => {
  if (!err) console.log("Data deleted");
});

db.close();