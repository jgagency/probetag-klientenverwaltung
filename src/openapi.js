// OpenAPI-Spezifikation für die Swagger UI unter /api-docs.
// Wer das Backend erweitert (z. B. um DELETE), ergänzt hier den neuen Endpunkt.

const klientFelder = {
  vorname: { type: 'string', nullable: true, example: 'Max' },
  nachname: { type: 'string', nullable: true, example: 'Mustermann' },
  strasse: { type: 'string', nullable: true, example: 'Kettwiger Straße 12' },
  plz: { type: 'string', nullable: true, example: '45127' },
  ort: { type: 'string', nullable: true, example: 'Essen' },
  telefon: { type: 'string', nullable: true, example: '0201 1234567' },
  email: { type: 'string', nullable: true, example: 'max.mustermann@example.de' },
  versicherungsnummer: { type: 'string', nullable: true, example: 'A123456789' },
  versicherungsname: { type: 'string', nullable: true, example: 'AOK Essen' },
};

const fehlerAntwort = (beschreibung, beispiel) => ({
  description: beschreibung,
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Fehler' },
      example: { message: beispiel },
    },
  },
});

export default {
  openapi: '3.0.3',
  info: {
    title: 'Klientenverwaltung API',
    version: '1.0.0',
    description:
      'REST-API für die Probetag-Aufgabe. Das Backend prüft keine Pflichtfelder – ' +
      'Validierung ist Aufgabe des Frontends. Details siehe README.md.',
  },
  tags: [{ name: 'Klienten' }],
  paths: {
    '/klienten': {
      get: {
        tags: ['Klienten'],
        summary: 'Liste aller Klienten abrufen',
        responses: {
          200: {
            description: 'Alle Klienten, sortiert nach id',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Klient' } },
              },
            },
          },
        },
      },
    },
    '/klient': {
      post: {
        tags: ['Klienten'],
        summary: 'Neuen Klienten anlegen',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/KlientEingabe' } },
          },
        },
        responses: {
          201: {
            description: 'Angelegter Klient inklusive vergebener id',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Klient' } },
            },
          },
          400: fehlerAntwort('Ungültiges JSON im Request-Body', 'Ungültiges JSON im Request-Body.'),
        },
      },
    },
    '/klient/{id}': {
      get: {
        tags: ['Klienten'],
        summary: 'Einzelnen Klienten abrufen',
        parameters: [{ $ref: '#/components/parameters/KlientId' }],
        responses: {
          200: {
            description: 'Der angefragte Klient',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Klient' } },
            },
          },
          400: fehlerAntwort('Ungültige id', 'Ungültige ID – erwartet wird eine positive Zahl.'),
          404: fehlerAntwort('Kein Klient mit dieser id', 'Klient mit ID 9999 wurde nicht gefunden.'),
        },
      },
      put: {
        tags: ['Klienten'],
        summary: 'Klienten aktualisieren (Vollupdate)',
        description:
          'Setzt immer alle Felder: Felder, die im Body fehlen, werden geleert (null). ' +
          'Beim Speichern also immer das komplette Objekt schicken.',
        parameters: [{ $ref: '#/components/parameters/KlientId' }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/KlientEingabe' } },
          },
        },
        responses: {
          200: {
            description: 'Der aktualisierte Klient',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Klient' } },
            },
          },
          400: fehlerAntwort('Ungültige id', 'Ungültige ID – erwartet wird eine positive Zahl.'),
          404: fehlerAntwort('Kein Klient mit dieser id', 'Klient mit ID 9999 wurde nicht gefunden.'),
        },
      },
    },
  },
  components: {
    parameters: {
      KlientId: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'id des Klienten (positive ganze Zahl)',
        schema: { type: 'integer', minimum: 1, example: 1 },
      },
    },
    schemas: {
      KlientEingabe: {
        type: 'object',
        description: 'Klient ohne id – alle Felder optional, unbekannte Felder werden ignoriert.',
        properties: klientFelder,
      },
      Klient: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          ...klientFelder,
        },
      },
      Fehler: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Klient mit ID 9999 wurde nicht gefunden.' },
        },
      },
    },
  },
};
