import { db } from "../db/database.js";


function produtoExist(callback) {
  const query = `SELECT COUNT(*) AS count FROM produtos`;
  db.get(query, (err, row) => {
    if (err) {
      console.error("Error checking for produtos:", err);
      callback(err);
    } else {
      callback(null, row.count > 0);
    }
  });
}

export default async function seedDatabase() {
  return new Promise((resolve, reject) => {
    produtoExist((err, exists) => {
      if (err) {
        reject("Error while checking produtos:" + err);
        return;
      }
      if (exists) {
        console.log(`Produtos exists. Skipping.`);
        resolve()
      } else {
        const insertQuery = `
        INSERT INTO produtos (nome, valor) VALUES 
        ('café', 3.50),
        ('mocha', 7),
        ('cappuccino', 7),
        ('chá', 3.50);
        `;

        db.run(insertQuery, function (err) {
          if (err) {
            reject("Error inserting data:" + err);
          } else {
            console.log('Produtos inseridos!')
            resolve()
          }
        });
      }
    })
  })



}

