import { Sequelize } from 'sequelize';

// Defaults passen zum docker-compose.yml — eine .env ist nur nötig, wenn du davon abweichst.
// Dieselben Werte nutzt die sequelize-cli über db/config.js.
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PGHOST ?? 'localhost',
  port: Number(process.env.PGPORT ?? 5432),
  database: process.env.PGDATABASE ?? 'klienten_db',
  username: process.env.PGUSER ?? 'probetag',
  password: process.env.PGPASSWORD ?? 'probetag',
  logging: false, // auf console.log stellen, wenn du die erzeugten SQL-Statements sehen willst
});

// Beim Start kann der Docker-Container noch hochfahren — deshalb kurz warten statt sofort abbrechen.
export async function waitForDb(versuche = 15) {
  for (let i = 1; i <= versuche; i += 1) {
    try {
      await sequelize.authenticate();
      return;
    } catch (fehler) {
      if (i === versuche) {
        throw new Error(
          `Keine Verbindung zur Datenbank (${fehler.message}). Läuft die Datenbank? Start: docker compose up -d`
        );
      }
      console.log(`Warte auf Datenbank … (Versuch ${i}/${versuche})`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

export default sequelize;
