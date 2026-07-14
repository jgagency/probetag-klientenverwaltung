# Aufgabenbeschreibung – Probetag Frontend-Entwickler (Angular)

## User Story

Als Mitarbeiter*in in der Verwaltung möchte ich eine Übersicht aller Klienten mit ihren
wichtigsten Kontakt- und Versicherungsdaten sehen, damit ich schnell auf diese Informationen
zugreifen, neue Klienten anlegen und bestehende Daten pflegen kann.

## Kontext

Für die Umsetzung steht ein Figma-Screendesign zur Verfügung, das als verbindliche Vorlage
für Layout, Komponenten und Optik dient:

**Figma:** https://www.figma.com/design/hzR7SYwGhP3y62w0QSJF41/Probetag-Design?node-id=0-1

Ein Backend mit fertigen REST-Endpunkten ist bereits vorhanden und soll angebunden werden –
**Setup: siehe [README.md](README.md)**.

Ziel des Probetags ist es, in der zur Verfügung stehenden Zeit eine funktionierende
Klientenverwaltung umzusetzen – Fokus liegt auf sauberer, nachvollziehbarer Umsetzung,
nicht auf hundertprozentiger Vollständigkeit.

## Tech-Stack

- Angular (aktuelle Version)
- ngx-bootstrap für UI-Komponenten (Tabelle, Modal, Formulare, Buttons etc.)
- Fontawesome für Icons
- HttpClient zur Anbindung des Backends
- Umsetzung nach Figma-Design (Layout, Abstände, Farben, Komponenten)

## Fachliche Anforderungen

### 1. Klientenliste

- Anzeige aller Klienten in einer Liste/Tabelle (Daten via `GET /klienten`)
- Darstellung gemäß Figma-Design
- Angezeigte/relevante Felder je Klient:
  - Vorname
  - Nachname
  - Adresse (Straße + Hausnr., PLZ, Ort)
  - Telefon
  - Email
  - Versicherungsnummer
  - Versicherungsname (z. B. „AOK Essen")
- Die Pagination ist nur clientseitig (keine weiteren Abfragen ans Backend)

### 2. Klient anlegen

- Über ein Formular kann ein neuer Klient angelegt werden
- Speichern via `POST /klient`
- Sinnvolle Validierung der Pflichtfelder (siehe Sternchen im Figma-Design)

### 3. Klient anzeigen & bearbeiten

- Klick auf einen Eintrag in der Liste öffnet die Detailansicht eines Klienten
  (`GET /klient/<id>`)
- Daten können bearbeitet und gespeichert werden (`PUT /klient/<id>`)

## Datenmodell „Klient"

| Feld                     | Typ                          |
|--------------------------|------------------------------|
| Vorname                  | string                       |
| Nachname                 | string                       |
| Adresse – Straße + Hausnr. | string                     |
| Adresse – PLZ            | string                       |
| Adresse – Ort            | string                       |
| Telefon                  | string                       |
| Email                    | string                       |
| Versicherungsnummer      | string                       |
| Versicherungsname        | string (z. B. „AOK Essen")   |

Die genauen JSON-Feldnamen und ein Beispielobjekt stehen im [README](README.md).

## Backend-Endpunkte

| Methode | Endpunkt       | Zweck                       |
|---------|----------------|-----------------------------|
| GET     | `/klienten`    | Liste aller Klienten abrufen |
| POST    | `/klient`      | Neuen Klienten anlegen      |
| GET     | `/klient/<id>` | Einzelnen Klienten abrufen  |
| PUT     | `/klient/<id>` | Klienten aktualisieren      |

## Mögliche Erweiterungen (Schritt 2, optional)

Wenn nach der Frontend-Umsetzung noch Zeit ist, kann das Backend erweitert werden –
zum Beispiel:

- **Klient löschen:** neuer Endpunkt `DELETE /klient/<id>` im Backend + Löschen-Button
  im Frontend
- **Serverseitige Suche:** `GET /klienten?suche=…` filtert z. B. über Vor-/Nachname
- **Serverseitige Pagination:** `GET /klienten?seite=…&proSeite=…`

## Erwartete Umsetzung / Bewertungskriterien

- Mach dich mit der Angular-Struktur (Components, Services) vertraut
- Umsetzung orientiert sich erkennbar am Figma-Design
- Saubere Anbindung des Backends (Services, Fehlerbehandlung im Rahmen der Zeit)
- Sinnvolle Aufteilung in Komponenten und Services
- Nutze Validators und Form-Groups für die Formulare
- Nutzung von ngx-bootstrap-Komponenten statt eigener Nachbauten, wo passend
- Lesbarer, nachvollziehbarer Code
- Selbstständiges Vorgehen, bei Unklarheiten gerne Rückfragen stellen

## Hinweise

- Es ist kein Problem, wenn nicht alle Punkte vollständig fertig werden – wichtig ist
  der Weg dorthin.
- KI darf in Maßen genutzt werden. Kein „Bitte erstelle mir die Klientenliste anhand
  des Designs", nur sowas wie „Erstelle mir eine Anleitung, wie ich Angular installiere"
  oder „Was ist ein Angular Component".
