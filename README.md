# Klientenverwaltung – Backend

Backend für die Probetag-Aufgabe (siehe [AUFGABE.md](AUFGABE.md)): eine REST-API zur Verwaltung
von Klienten, gebaut mit Node.js/Express und PostgreSQL.

## Voraussetzungen

- Node.js >= 20
- Docker (Docker Desktop oder OrbStack)

## Setup

```bash
# 1. Dependencies installieren
npm install

# 2. Datenbank starten, Schema anlegen, 30 Demo-Klienten einspielen
npm run db:reset

# 3. Backend starten
npm start
```

Die API läuft danach auf **http://localhost:3000**.

`npm run db:reset` erledigt Schritt 2 komplett: Container hochfahren, warten bis die
Datenbank bereit ist, Migrationen ausführen, Demo-Daten einspielen. Derselbe Befehl
stellt später jederzeit den Ausgangszustand wieder her.

## npm-Scripts

| Script                  | Zweck                                                        |
|-------------------------|--------------------------------------------------------------|
| `npm start`             | Backend starten                                              |
| `npm run dev`           | Backend mit Auto-Restart bei Codeänderungen (`node --watch`) |
| `npm run db:migrate`    | Ausstehende Migrationen ausführen                            |
| `npm run db:migrate:undo` | Letzte Migration zurückrollen                              |
| `npm run db:seed`       | Die 30 Demo-Klienten einspielen                              |
| `npm run db:reset`      | Datenbank komplett zurücksetzen (Container neu, Migrationen, Demo-Daten) |

## Datenbank & Migrationen

Schema-Änderungen laufen über [Sequelize](https://sequelize.org/docs/v6/) und die
`sequelize-cli` – nicht von Hand per SQL. So kommt jede*r mit `npm run db:migrate` auf
denselben Stand.

```
db/
├── config.js       Verbindungsdaten für die CLI (gleiche Defaults wie src/db.js)
├── migrations/     Schema-Änderungen, laufen in Reihenfolge ihres Zeitstempels
└── seeders/        Demo-Daten
src/
├── db.js           Sequelize-Instanz der Anwendung
├── models/klient.js  Modell zur Tabelle klienten
└── routes/klienten.js
```

Eine neue Migration anlegen:

```bash
npx sequelize-cli migration:generate --name was-sie-macht
npm run db:migrate
```

**Zwei Dinge, die verwirren können:**

- Die Dateien unter `db/` sind CommonJS (`module.exports`), der Rest des Projekts ist
  ESM (`import`/`export`). Dafür sorgt `db/package.json` – die `sequelize-cli` lädt ihre
  Dateien per `require()` und käme mit ESM nicht klar.
- Das Modell in `src/models/klient.js` legt **keine** Tabellen an (kein `sequelize.sync()`).
  Wer dort ein Feld ergänzt, braucht immer auch eine Migration dazu – sonst kennt die
  Anwendung eine Spalte, die es in der Datenbank nicht gibt.

## API

**Swagger UI:** Bei laufendem Backend gibt es die interaktive API-Doku unter
**http://localhost:3000/api-docs** – dort lassen sich alle Endpunkte direkt
ausprobieren („Try it out"). Die Spezifikation liegt in [`src/openapi.js`](src/openapi.js).

Beispiel-Requests liegen außerdem in [`requests.http`](requests.http)
(direkt ausführbar in VS Code mit der REST-Client-Extension oder in IntelliJ/WebStorm).

### Endpunkte

| Methode | Endpunkt       | Zweck                      | Antwort                         |
|---------|----------------|----------------------------|---------------------------------|
| GET     | `/klienten`    | Liste aller Klienten       | `200` + Array                   |
| POST    | `/klient`      | Neuen Klienten anlegen     | `201` + angelegtes Objekt       |
| GET     | `/klient/<id>` | Einzelnen Klienten abrufen | `200` + Objekt, `404` unbekannt |
| PUT     | `/klient/<id>` | Klienten aktualisieren     | `200` + Objekt, `404` unbekannt |
| DELETE  | `/klient/<id>` | Klienten löschen           | `204`, `404` unbekannt          |

**Hinweis zu PUT:** Vollupdate – es werden immer alle Felder gesetzt. Felder, die im Body
fehlen, werden geleert (`null`). Also beim Speichern immer das komplette Objekt schicken.

Fehler kommen immer im Format `{ "message": "…" }` (z. B. `400` bei ungültiger ID
oder kaputtem JSON, `404` bei unbekannter ID).

### Das Klient-Objekt

```json
{
  "id": 1,
  "vorname": "Max",
  "nachname": "Mustermann",
  "strasse": "Kettwiger Straße 12",
  "plz": "45127",
  "ort": "Essen",
  "telefon": "0201 1234567",
  "email": "max.mustermann@example.de",
  "versicherungsnummer": "A123456789",
  "versicherungsname": "AOK Essen",
  "geburtsdatum": "2026-08-06"
}
```

Alle Felder außer `id` sind Strings. Das Backend prüft keine Pflichtfelder –
Validierung ist Aufgabe des Frontends.

### CORS

CORS ist komplett offen. Ein Angular-Dev-Server (`ng serve`, Port 4200) kann die API
direkt ohne Proxy-Konfiguration aufrufen.

## Troubleshooting

- **Port 5432 ist schon belegt** (z. B. lokales Postgres): Datei `.env.example` als `.env`
  kopieren und dort `PGPORT` ändern (z. B. `5433`), dann `docker compose up -d` erneut
  ausführen. Backend neu starten – es liest denselben Wert aus der `.env`.
- **Port 3000 ist schon belegt:** In der `.env` den Wert `PORT` ändern.
- **Datenbank kaputtgespielt?** `npm run db:reset` stellt den Ausgangszustand her.
- **„relation ›klienten‹ does not exist"**: Die Migrationen sind noch nicht gelaufen –
  `npm run db:migrate` (oder gleich `npm run db:reset`).
- **„Keine Verbindung zur Datenbank"** beim Start: Läuft der Container? `docker compose up -d`
  ausführen und kurz warten – das Backend versucht es beim Start bis zu 15 Sekunden lang.
