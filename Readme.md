# NODE JS with SQLite

## 1. Install SQLite

Install sqlite di komputer. Dengan perintah berikut ini.

```bash
    sudo apt install sqlite3
```


## 2. Install SQLite pada NodeJs

Tujuannya untu menghubungkan SQLite dengan NodeJs.

Silakan buat project terlebih dahulu.

```bash
mkdir nodejs-sqlite
cd nodejs-sqlite
npm init -y
```

Install package sqlite3 pada node js.

```bash
npm install sqlite3
```

## 3. Membuat Database SQLite

Pertama buat folder db di folder project ini.

```bash
mkdir db
```

buat databasenya:

```bash
sqlite3 db/playlist.db
```

coba list filenya:

```bash
tree db
```

## 4. Connection Database

Buat file ```db_config.js```

```js
const sqlite3 = require('sqlite3').verbose();
const dbFile = __dirname + "/db/playlist.db";

const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if(err) throw err;
});

module.exports = db;
```

## 5. Membuat Table SQLite

Buat file ```create_table.js```


```js
const db = require("./db_config");

let sql = `CREATE TABLE IF NOT EXISTS favorite_songs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(64),
        artist VARCHAR(64)
    );`;
db.run(sql, (err, result) => {
  if (err) throw err;
  console.log("Table created");
});

db.close()

```

Check Table:

```bash
sqlite3 db/playlist.db
.tables
.schema favorite_songs
```

## 6. Menambahkan Data ke SQLite

Buat file ```insert.js```

```js
const db = require("./db_config");

let sql = `INSERT INTO favorite_songs (title, artist) 
            VALUES ('First Love', 'Utada Hikaru')`;

db.run(sql, (err) => {
  if (err) throw err;
  console.log("1 record inserted");
});

db.close();
```

```js
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
```

## 7. Membaca Data dari SQLite

```js
const db = require("./db_config");

const sql = "SELECT * FROM favorite_songs";

db.all(sql, (err, rows) => {
  if (err) throw err;

  if (rows.length > 1) {
    // cetak isi rows
    rows.forEach((song) => {
      console.log(`[${song.id}] ${song.artist} - ${song.title}`);
    });
  } else {
    console.log("tidak ada data/hasil");
  }
});

db.close();
```

## 8. Update Data SQLite

```js
const db = require("./db_config");

const sql = `UPDATE favorite_songs 
        SET title="Don't Matter"
        WHERE id=?`;

songId = 3;

db.run(sql, [songId], (err) => {
  if (!err) console.log("1 record updated");
});

db.close();
```

## 9. Hapus Data SQLite dengan Nodejs

```js
const db = require("./db_config");

const sql = `DELETE FROM favorite_songs WHERE id=?`;
const songId = 3;

db.run(sql, [songId], (err) => {
  if (!err) console.log("Data deleted");
});

db.close();
```
