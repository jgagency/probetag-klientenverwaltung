import { Router } from 'express';
import pool from '../db.js';

const router = Router();

const FELDER = [
  'vorname',
  'nachname',
  'strasse',
  'plz',
  'ort',
  'telefon',
  'email',
  'versicherungsnummer',
  'versicherungsname',
];

function parseId(wert) {
  const id = Number(wert);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Liste aller Klienten
router.get('/klienten', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM klienten ORDER BY id');
  res.json(rows);
});

// Neuen Klienten anlegen
router.post('/klient', async (req, res) => {
  const werte = FELDER.map((feld) => req.body?.[feld] ?? null);
  const platzhalter = FELDER.map((_, i) => `$${i + 1}`).join(', ');
  const { rows } = await pool.query(
    `INSERT INTO klienten (${FELDER.join(', ')}) VALUES (${platzhalter}) RETURNING *`,
    werte
  );
  res.status(201).json(rows[0]);
});

// Einzelnen Klienten abrufen
router.get('/klient/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Ungültige ID – erwartet wird eine positive Zahl.' });
  }
  const { rows } = await pool.query('SELECT * FROM klienten WHERE id = $1', [id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: `Klient mit ID ${id} wurde nicht gefunden.` });
  }
  res.json(rows[0]);
});

// Klienten aktualisieren (Vollupdate: nicht mitgeschickte Felder werden geleert)
router.put('/klient/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Ungültige ID – erwartet wird eine positive Zahl.' });
  }
  const zuweisungen = FELDER.map((feld, i) => `${feld} = $${i + 1}`).join(', ');
  const werte = FELDER.map((feld) => req.body?.[feld] ?? null);
  const { rows } = await pool.query(
    `UPDATE klienten SET ${zuweisungen} WHERE id = $${FELDER.length + 1} RETURNING *`,
    [...werte, id]
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: `Klient mit ID ${id} wurde nicht gefunden.` });
  }
  res.json(rows[0]);
});

export default router;
