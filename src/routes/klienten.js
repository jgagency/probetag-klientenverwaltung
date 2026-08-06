import { Router } from 'express';
import Klient from '../models/klient.js';

const router = Router();

// Die Felder, die aus dem Request-Body übernommen werden. Alles andere (z. B. eine
// mitgeschickte id) wird ignoriert. Neues Feld? Hier eintragen — und eine Migration dazu.
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

// Baut aus dem Request-Body ein Objekt mit genau den bekannten Feldern.
// Was fehlt, wird null — deshalb ist PUT ein Vollupdate.
function werteAusBody(body) {
  return Object.fromEntries(FELDER.map((feld) => [feld, body?.[feld] ?? null]));
}

// Liste aller Klienten
router.get('/klienten', async (req, res) => {
  const klienten = await Klient.findAll({ order: [['id', 'ASC']] });
  res.json(klienten);
});

// Neuen Klienten anlegen
router.post('/klient', async (req, res) => {
  const klient = await Klient.create(werteAusBody(req.body));
  res.status(201).json(klient);
});

// Einzelnen Klienten abrufen
router.get('/klient/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Ungültige ID – erwartet wird eine positive Zahl.' });
  }
  const klient = await Klient.findByPk(id);
  if (klient === null) {
    return res.status(404).json({ message: `Klient mit ID ${id} wurde nicht gefunden.` });
  }
  res.json(klient);
});

// Klienten aktualisieren (Vollupdate: nicht mitgeschickte Felder werden geleert)
router.put('/klient/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ message: 'Ungültige ID – erwartet wird eine positive Zahl.' });
  }
  const [, zeilen] = await Klient.update(werteAusBody(req.body), {
    where: { id },
    returning: true, // gibt die aktualisierten Datensätze zurück (Postgres kann das)
  });
  if (zeilen.length === 0) {
    return res.status(404).json({ message: `Klient mit ID ${id} wurde nicht gefunden.` });
  }
  res.json(zeilen[0]);
});

export default router;
