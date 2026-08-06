// Verbindungsdaten für die sequelize-cli (Migrationen und Seeds).
// Gleiche Defaults wie src/db.js — eine .env ist nur nötig, wenn du davon abweichst.
require('dotenv').config();

const verbindung = {
  dialect: 'postgres',
  host: process.env.PGHOST ?? 'localhost',
  port: Number(process.env.PGPORT ?? 5432),
  database: process.env.PGDATABASE ?? 'klienten_db',
  username: process.env.PGUSER ?? 'probetag',
  password: process.env.PGPASSWORD ?? 'probetag',
};

// Die CLI erwartet Einträge pro Umgebung. Hier gibt es nur die eine.
module.exports = {
  development: verbindung,
  test: verbindung,
  production: verbindung,
};
