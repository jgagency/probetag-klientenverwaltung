# Klientenverwaltung – Backend

Backend für die Probetag-Aufgabe (siehe [AUFGABE.md](AUFGABE.md)): eine REST-API zur Verwaltung
von Klienten, gebaut mit Node.js/Express und PostgreSQL.

## Voraussetzungen

- Node.js >= 20
- Docker (Docker Desktop oder OrbStack)

## Setup

```bash
# 1. Datenbank starten (legt Schema + 30 Demo-Klienten automatisch an)
docker compose up -d

# 2. Dependencies installieren
npm install

# 3. Backend starten
npm start
```

Die API läuft danach auf **http://localhost:3000**.

## npm-Scripts

| Script             | Zweck                                                        |
|--------------------|--------------------------------------------------------------|
| `npm start`        | Backend starten                                              |
| `npm run dev`      | Backend mit Auto-Restart bei Codeänderungen (`node --watch`) |
| `npm run db:reset` | Datenbank komplett zurücksetzen (löscht alle Änderungen, spielt die 30 Demo-Klienten neu ein) |

## API

Beispiel-Requests zum Ausprobieren liegen in [`requests.http`](requests.http)
(direkt ausführbar in VS Code mit der REST-Client-Extension oder in IntelliJ/WebStorm).

### Endpunkte

| Methode | Endpunkt       | Zweck                        | Antwort                          |
|---------|----------------|------------------------------|----------------------------------|
| GET     | `/klienten`    | Liste aller Klienten         | `200` + Array                    |
| POST    | `/klient`      | Neuen Klienten anlegen       | `201` + angelegtes Objekt        |
| GET     | `/klient/<id>` | Einzelnen Klienten abrufen   | `200` + Objekt, `404` unbekannt  |
| PUT     | `/klient/<id>` | Klienten aktualisieren       | `200` + Objekt, `404` unbekannt  |

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
  "versicherungsname": "AOK Essen"
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
- **„Keine Verbindung zur Datenbank"** beim Start: Läuft der Container? `docker compose up -d`
  ausführen und kurz warten – das Backend versucht es beim Start bis zu 15 Sekunden lang.
