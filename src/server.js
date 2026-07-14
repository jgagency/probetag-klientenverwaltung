import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import klientenRouter from './routes/klienten.js';
import openapiSpec from './openapi.js';
import { waitForDb } from './db.js';

const app = express();

app.use(cors()); // Dev-Setup: alle Origins erlaubt, damit ng serve (Port 4200) direkt funktioniert
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));
app.use(klientenRouter);

// Unbekannte Routen
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} gibt es nicht.` });
});

// Zentraler Error-Handler (Express 5 fängt auch async-Fehler und leitet sie hierher)
app.use((fehler, req, res, next) => {
  if (fehler.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Ungültiges JSON im Request-Body.' });
  }
  console.error(fehler);
  res.status(500).json({ message: 'Interner Serverfehler' });
});

const port = Number(process.env.PORT ?? 3000);

await waitForDb();
app.listen(port, () => {
  console.log(`Klienten-API läuft auf http://localhost:${port}`);
});
