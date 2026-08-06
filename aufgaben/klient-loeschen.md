# Zusatzaufgabe: Klient löschen

> Backend- und Frontend-Aufgabe. Voraussetzung: Das Setup aus der [README](../README.md) läuft.

## User Story

Als Mitarbeiter*in in der Verwaltung möchte ich einen Klienten löschen können, damit
versehentlich angelegte oder nicht mehr betreute Einträge aus der Liste verschwinden.

## Ziel

Ein neuer Endpunkt `DELETE /klient/<id>` im Backend und ein Löschen-Button im Frontend.

Eine Migration brauchst du hier **nicht** – am Schema ändert sich nichts, nur der Code
kommt dazu.

## Was zu tun ist

**1. Route anlegen** – `src/routes/klienten.js`

Bau sie nach dem Muster der bestehenden Routen. Die vorhandenen Bausteine, die du
wiederverwenden solltest:

- `parseId(req.params.id)` – gibt `null` zurück, wenn die ID keine positive Zahl ist
- das Modell `Klient` aus `../models/klient.js` – die passende Methode zum Löschen
  findest du in der [Sequelize-Doku](https://sequelize.org/docs/v6/core-concepts/model-instances/)
  (Stichwort `destroy`). Sie sagt dir auch, **wie viele** Zeilen betroffen waren – genau
  das brauchst du für den 404-Fall.

**2. Die drei Fälle abdecken**

| Fall | Status | Antwort |
|---|---|---|
| Gelöscht | ? | ? |
| ID gibt es nicht | `404` | `{ "message": "…" }` im Format der anderen Routen |
| ID ist keine positive Zahl (`/klient/abc`) | `400` | wie bei `GET /klient/<id>` |

Beim Erfolgsfall gibt es zwei gängige Varianten – **entscheide dich und begründe kurz**:
`204 No Content` mit leerem Body (verbreitetste Wahl bei DELETE) oder `200 OK` mit dem
gelöschten Objekt bzw. einer Meldung. Beides ist vertretbar; wichtig ist, dass das
Frontend damit umgehen kann. Achtung bei `204`: Da darf **kein** Body mitkommen, sonst
verschlucken sich manche HTTP-Clients.

**3. Doku nachziehen**

- `src/openapi.js`: den neuen Endpunkt unter `/klient/{id}` ergänzen – der Kommentar
  oben in der Datei sagt dir, wo. Danach lässt er sich in der Swagger UI unter
  http://localhost:3000/api-docs direkt ausprobieren.
- `README.md`: Zeile in der Endpunkt-Tabelle
- `requests.http`: Beispiel-Request

**4. Frontend**

- Löschen-Button pro Zeile in der Klientenliste (Icon via Fontawesome)
- **Rückfrage vor dem Löschen** – ein Modal von ngx-bootstrap, kein natives `confirm()`
- Nach dem Löschen die Liste aktualisieren, ohne die Seite neu zu laden
- Fehlerfall abfangen: Was passiert, wenn zwei Leute denselben Klienten löschen und der
  zweite Request `404` bekommt? Die Anwendung darf dabei nicht kaputtgehen.

## Wann es geklappt hat

```bash
# Anzahl vorher
curl -s localhost:3000/klienten | grep -o '"id"' | wc -l

curl -s -i -X DELETE localhost:3000/klient/30      # → dein Erfolgs-Status
curl -s -i -X DELETE localhost:3000/klient/30      # → 404, ist ja schon weg
curl -s -i -X DELETE localhost:3000/klient/abc     # → 400
curl -s localhost:3000/klient/30                   # → 404

# Anzahl nachher: einer weniger
curl -s localhost:3000/klienten | grep -o '"id"' | wc -l
```

Alles wieder herstellen: `npm run db:reset`.

## Stolpersteine

- **Reihenfolge der Routen** spielt in Express eine Rolle. Häng die neue Route zu den
  anderen in dieselbe Datei, dann passt es.
- **Der Router hat keinen `try/catch`** und braucht auch keinen: Express 5 fängt Fehler
  aus `async`-Handlern automatisch und schickt sie an den Error-Handler in
  `src/server.js`. Halte dich an dieses Muster.
- **`DELETE` ohne `where` löscht alles.** Prüf beim Testen lieber einmal zu viel, ob
  danach noch 29 Klienten dastehen und nicht 0.

## Wenn noch Zeit ist

Statt echtem Löschen ein „Soft Delete": eine Spalte `geloescht_am`, die gesetzt wird,
statt die Zeile zu entfernen – und `GET /klienten` blendet diese Einträge aus. Dafür
brauchst du dann doch eine Migration; wie das geht, steht in
[klient-geburtsdatum-hinzufuegen.md](klient-geburtsdatum-hinzufuegen.md).
