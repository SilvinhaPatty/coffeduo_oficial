import sqlite3 from 'sqlite3';
sqlite3.verbose();

// SQLite Database setup
export const db = new sqlite3.Database('./local.db', (err) => {
  if (err) {
    console.error("Could not connect to the SQLite database", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

export async function createTables() {
  const table1 = `
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      valor REAL NOT NULL
    );
  `;
  const table2 = `
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      itens TEXT NOT NULL,
      total REAL NOT NULL,
      data DATE NOT NULL
    )
  `
  await run(table1)
  await run(table2)

  console.log('Tabelas pedido e produtos inicializadas')
}
export async function run(sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, (err) => {
      if (err) {
        reject("Error running command:" + err);
      } else {
        console.log("Command ran successfully.");
        resolve()
      }
    });
  })
}
export async function query(sql, params) {
  return new Promise((resolve, reject) => {
    return db.all(sql, params, function (err, row) {
      if (err) {
        console.error("DB Error: get failed: ", err.message);
        return reject(err.message);
      }
      return resolve(row);
    });
  });
}

export async function insert(sql, params) {
  return new Promise((resolve, reject) => {
    return db.run(sql, params, function (err) {
      if (err) {
        console.error("DB Error: insert failed: ", err.message);
        return reject(err.message);
      }
      // The 'this' keyword refers to the statement that was executed
      return resolve({ id: this.lastID }); // Return the last inserted ID
    });
  });
}


