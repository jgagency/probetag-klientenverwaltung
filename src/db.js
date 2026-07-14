import pg from 'pg';

// Defaults passen zum docker-compose.yml — eine .env ist nur nötig, wenn du davon abweichst.
const pool = new pg.Pool({
  host: process.env.PGHOST ?? 'localhost',
  port: Number(process.env.PGPORT ?? 5432),
  database: process.env.PGDATABASE ?? 'klienten_db',
  user: process.env.PGUSER ?? 'probetag',
  password: process.env.PGPASSWORD ?? 'probetag',
});

// Beim Start kann der Docker-Container noch hochfahren — deshalb kurz warten statt sofort abbrechen.
export async function waitForDb(versuche = 15) {
  for (let i = 1; i <= versuche; i += 1) {
    try {
      await pool.query('SELECT 1');
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

export default pool;
