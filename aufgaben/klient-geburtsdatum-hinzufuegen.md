# Zusatzaufgabe: Geburtsdatum am Klienten

> Backend-Aufgabe. Voraussetzung: Das Setup aus der [README](../README.md) läuft.

## User Story

Als Mitarbeiter*in in der Verwaltung möchte ich zu jedem Klienten das Geburtsdatum
sehen und pflegen können, damit ich Personen mit gleichem Namen sicher unterscheiden kann.

## Ziel

Das Klient-Objekt bekommt ein zusätzliches Feld `geburtsdatum`. Es soll über alle
bestehenden Endpunkte funktionieren: in `GET /klienten` und `GET /klient/<id>`
mitkommen, per `POST /klient` gesetzt und per `PUT /klient/<id>` geändert werden können.

Neue Endpunkte brauchst du dafür **nicht** – das Feld reist auf den bestehenden mit.

## Was zu tun ist

**1. Migration erzeugen**

Das Schema wird nicht von Hand geändert, sondern über eine Migration – so kommt jede*r
mit `npm run db:migrate` auf denselben Stand.

```bash
npx sequelize-cli migration:generate --name spalte-geburtsdatum
```

Die neue Datei landet in `db/migrations/`. Fülle `up()` und `down()` aus:
`up()` fügt die Spalte hinzu, `down()` entfernt sie wieder. Die passenden Methoden
heißen `queryInterface.addColumn(…)` und `queryInterface.removeColumn(…)`; wie die
Aufrufe aussehen, siehst du in der bestehenden Migration `…-create-klienten.js`.

**2. Migration ausführen**

```bash
npm run db:migrate
```

**3. Modell ergänzen** – `src/models/klient.js`

Sequelize liest nur Felder, die im Modell stehen. Ohne diesen Schritt existiert die
Spalte zwar in der Datenbank, taucht aber in keiner API-Antwort auf.

**4. Feld für Schreibzugriffe freischalten** – `src/routes/klienten.js`

Dort gibt es die Liste `FELDER`. Sie steuert, was aus dem Request-Body übernommen wird –
alles, was nicht drinsteht, wird ignoriert.

**5. Doku nachziehen**

- `src/openapi.js`: Eintrag in `klientFelder`, damit die Swagger UI unter
  http://localhost:3000/api-docs das Feld kennt
- `README.md`: das Beispiel-Objekt im Abschnitt „Das Klient-Objekt"
- `requests.http`: Beispiel-Requests um das Feld erweitern

## Welcher Datentyp?

Es gibt zwei vertretbare Wege – entscheide dich und **begründe kurz, warum**:

| Weg | Was du bekommst |
|---|---|
| `Sequelize.TEXT` | Ein normaler String wie alle anderen Felder. Passt zum bestehenden Contract („alle Felder außer `id` sind Strings"), erlaubt aber jeden Unsinn als Inhalt. |
| `Sequelize.DATEONLY` | Ein echter Datumstyp in der Datenbank, im JSON trotzdem ein String im Format `"1985-03-12"`. Sauberer, aber das Frontend muss für die Anzeige umformatieren. |

**Finger weg von `Sequelize.DATE`**: Das ist ein Zeitstempel mit Uhrzeit und Zeitzone.
Im JSON steht dann `"1985-03-12T00:00:00.000Z"`, und je nach Zeitzone kippt das Datum
auf den Vortag. Für einen Geburtstag ist das falsch.

Die Spalte muss **nullable** sein (`allowNull: true`) – bestehende Klienten haben ja
noch kein Geburtsdatum, und das Backend validiert grundsätzlich keine Pflichtfelder.

## Wann es geklappt hat

```bash
# Server neu starten (Modelländerungen greifen erst dann), dann:
curl -s localhost:3000/klient/1
# → das Objekt enthält jetzt "geburtsdatum": null

curl -s -X PUT localhost:3000/klient/1 -H 'Content-Type: application/json' \
  -d '{"vorname":"Max","nachname":"Mustermann","geburtsdatum":"1985-03-12"}'
# → Antwort enthält "geburtsdatum": "1985-03-12"
```

Und zur Gegenprobe, dass die Migration wirklich beidseitig funktioniert:

```bash
npm run db:migrate:undo   # Spalte ist wieder weg
npm run db:migrate        # Spalte ist wieder da
```

## Stolpersteine

- **`down()` nicht leer lassen.** Eine Migration ohne Rückweg ist keine Migration.
- **Die Dateien in `db/` sind CommonJS** (`module.exports`), der Rest des Projekts ist
  ESM (`import`/`export`). Das ist Absicht, die `sequelize-cli` braucht das so.
- **Server neu starten** nach Änderungen am Modell – oder gleich mit `npm run dev`
  arbeiten, das startet bei Codeänderungen automatisch neu.
- **`npm run db:reset` wirft deine Testdaten weg**, spielt aber alle Migrationen und
  die 30 Demo-Klienten frisch ein. Wenn du dich verrannt hast: der schnellste Weg zurück.

## Wenn noch Zeit ist

Das Feld im Frontend ergänzen: in der Detailansicht, im Anlegen-Formular und – falls
sinnvoll – als Spalte in der Liste.
