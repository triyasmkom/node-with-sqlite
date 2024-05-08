const db = require("./db_config");

const sql = `INSERT INTO favorite_songs (title, artist) VALUES (?,?)`;
const stmt = db.prepare(sql);
const songs = [
  ["Dear God", "Avenged Sevenfold"],
  ["No Matter", "Akon"],
  ["No Wonem No Cry", "Bob Marley"],
  ["Umbrella", "Rihana"],
];

songs.forEach((song) => {
  stmt.run(song, (err) => {
    if (err) throw err;
  });
});

console.log(`${songs.length} record inserted`);
stmt.finalize();

db.close();