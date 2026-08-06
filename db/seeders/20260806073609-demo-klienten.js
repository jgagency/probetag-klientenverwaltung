'use strict';

// Die 30 Demo-Klienten. Läuft nach den Migrationen: npm run db:seed
// (oder in einem Rutsch mit allem anderen: npm run db:reset)

const klienten = [
  { vorname: 'Max',       nachname: 'Mustermann', strasse: 'Kettwiger Straße 12',      plz: '45127', ort: 'Essen',               telefon: '0201 1234567', email: 'max.mustermann@example.de',   versicherungsnummer: 'A123456789', versicherungsname: 'AOK Essen' },
  { vorname: 'Maria',     nachname: 'Musterfrau', strasse: 'Rüttenscheider Straße 45', plz: '45130', ort: 'Essen',               telefon: '0201 7654321', email: 'maria.musterfrau@example.de', versicherungsnummer: 'B987654321', versicherungsname: 'AOK Essen' },
  { vorname: 'Gottfried', nachname: 'Jasken',     strasse: 'Huyssenallee 8',           plz: '45128', ort: 'Essen',               telefon: '0201 5551112', email: 'gottfried.jasken@example.de', versicherungsnummer: 'C234567890', versicherungsname: 'AOK Essen' },
  { vorname: 'Leonie',    nachname: 'Schmitz',    strasse: 'Bochumer Landstraße 210',  plz: '45279', ort: 'Essen',               telefon: '0201 8891234', email: 'leonie.schmitz@example.de',   versicherungsnummer: 'D345678901', versicherungsname: 'Techniker Krankenkasse' },
  { vorname: 'Jonas',     nachname: 'Becker',     strasse: 'Alleestraße 34',           plz: '44793', ort: 'Bochum',              telefon: '0234 4455667', email: 'jonas.becker@example.de',     versicherungsnummer: 'E456789012', versicherungsname: 'Barmer' },
  { vorname: 'Amira',     nachname: 'Yilmaz',     strasse: 'Castroper Straße 87',      plz: '44791', ort: 'Bochum',              telefon: '0234 9988776', email: 'amira.yilmaz@example.de',     versicherungsnummer: 'F567890123', versicherungsname: 'AOK Nordwest' },
  { vorname: 'Paul',      nachname: 'Hoffmann',   strasse: 'Kampstraße 12',            plz: '44137', ort: 'Dortmund',            telefon: '0231 2233445', email: 'paul.hoffmann@example.de',    versicherungsnummer: 'G678901234', versicherungsname: 'DAK-Gesundheit' },
  { vorname: 'Emilia',    nachname: 'Krüger',     strasse: 'Hoher Wall 5',             plz: '44122', ort: 'Dortmund',            telefon: '0231 6677889', email: 'emilia.krueger@example.de',   versicherungsnummer: 'H789012345', versicherungsname: 'IKK classic' },
  { vorname: 'Luca',      nachname: 'Wagner',     strasse: 'Sonnenstraße 19',          plz: '44139', ort: 'Dortmund',            telefon: '0231 4455660', email: 'luca.wagner@example.de',      versicherungsnummer: 'J890123456', versicherungsname: 'Techniker Krankenkasse' },
  { vorname: 'Sofia',     nachname: 'Ricci',      strasse: 'Königstraße 61',           plz: '47051', ort: 'Duisburg',            telefon: '0203 3344556', email: 'sofia.ricci@example.de',      versicherungsnummer: 'K901234567', versicherungsname: 'Barmer' },
  { vorname: 'Ben',       nachname: 'Schulte',    strasse: 'Sternbuschweg 140',        plz: '47057', ort: 'Duisburg',            telefon: '0203 7788990', email: 'ben.schulte@example.de',      versicherungsnummer: 'L012345678', versicherungsname: 'AOK Nordwest' },
  { vorname: 'Hannah',    nachname: 'Vogel',      strasse: 'Bahnhofstraße 22',         plz: '45879', ort: 'Gelsenkirchen',       telefon: '0209 1122334', email: 'hannah.vogel@example.de',     versicherungsnummer: 'M123456780', versicherungsname: 'Knappschaft' },
  { vorname: 'Elias',     nachname: 'Brandt',     strasse: 'Ebertstraße 30',           plz: '45879', ort: 'Gelsenkirchen',       telefon: '0209 4455778', email: 'elias.brandt@example.de',     versicherungsnummer: 'N234567891', versicherungsname: 'AOK Nordwest' },
  { vorname: 'Mila',      nachname: 'Peters',     strasse: 'Marktstraße 155',          plz: '46045', ort: 'Oberhausen',          telefon: '0208 9900112', email: 'mila.peters@example.de',      versicherungsnummer: 'P345678902', versicherungsname: 'DAK-Gesundheit' },
  { vorname: 'Noah',      nachname: 'Winkler',    strasse: 'Elsässer Straße 17',       plz: '46045', ort: 'Oberhausen',          telefon: '0208 2233551', email: 'noah.winkler@example.de',     versicherungsnummer: 'Q456789013', versicherungsname: 'Techniker Krankenkasse' },
  { vorname: 'Clara',     nachname: 'Neumann',    strasse: 'Schloßstraße 28',          plz: '45468', ort: 'Mülheim an der Ruhr', telefon: '0208 6655443', email: 'clara.neumann@example.de',    versicherungsnummer: 'R567890124', versicherungsname: 'Barmer' },
  { vorname: 'Felix',     nachname: 'Sauer',      strasse: 'Aktienstraße 60',          plz: '45473', ort: 'Mülheim an der Ruhr', telefon: '0208 8877665', email: 'felix.sauer@example.de',      versicherungsnummer: 'S678901235', versicherungsname: 'IKK classic' },
  { vorname: 'Lina',      nachname: 'Albers',     strasse: 'Bahnhofstraße 44',         plz: '44623', ort: 'Herne',               telefon: '02323 123456', email: 'lina.albers@example.de',      versicherungsnummer: 'T789012346', versicherungsname: 'Knappschaft' },
  { vorname: 'David',     nachname: 'Franke',     strasse: 'Mont-Cenis-Straße 265',    plz: '44627', ort: 'Herne',               telefon: '02323 678901', email: 'david.franke@example.de',     versicherungsnummer: 'U890123457', versicherungsname: 'AOK Nordwest' },
  { vorname: 'Ella',      nachname: 'Busch',      strasse: 'Elberfelder Straße 33',    plz: '58095', ort: 'Hagen',               telefon: '02331 246801', email: 'ella.busch@example.de',       versicherungsnummer: 'V901234568', versicherungsname: 'DAK-Gesundheit' },
  { vorname: 'Tim',       nachname: 'Lorenz',     strasse: 'Ruhrstraße 9',             plz: '58452', ort: 'Witten',              telefon: '02302 135791', email: 'tim.lorenz@example.de',       versicherungsnummer: 'W012345679', versicherungsname: 'Techniker Krankenkasse' },
  { vorname: 'Nora',      nachname: 'Engel',      strasse: 'Hochstraße 15',            plz: '46236', ort: 'Bottrop',             telefon: '02041 556672', email: 'nora.engel@example.de',       versicherungsnummer: 'X123456781', versicherungsname: 'AOK Nordwest' },
  { vorname: 'Samuel',    nachname: 'Roth',       strasse: 'Kunibertistraße 21',       plz: '45657', ort: 'Recklinghausen',      telefon: '02361 445563', email: 'samuel.roth@example.de',      versicherungsnummer: 'Y234567892', versicherungsname: 'Barmer' },
  { vorname: 'Ida',       nachname: 'Werner',     strasse: 'Viktoriastraße 5',         plz: '44787', ort: 'Bochum',              telefon: '0234 1112223', email: 'ida.werner@example.de',       versicherungsnummer: 'Z345678903', versicherungsname: 'Knappschaft' },
  { vorname: 'Anton',     nachname: 'Seidel',     strasse: 'Rellinghauser Straße 312', plz: '45136', ort: 'Essen',               telefon: '0201 9090901', email: 'anton.seidel@example.de',     versicherungsnummer: 'A456789014', versicherungsname: 'Techniker Krankenkasse' },
  { vorname: 'Frieda',    nachname: 'Horn',       strasse: 'Zweigertstraße 27',        plz: '45130', ort: 'Essen',               telefon: '0201 3434345', email: 'frieda.horn@example.de',      versicherungsnummer: 'B567890125', versicherungsname: 'AOK Essen' },
  { vorname: 'Oskar',     nachname: 'Lange',      strasse: 'Münsterstraße 99',         plz: '44145', ort: 'Dortmund',            telefon: '0231 8787876', email: 'oskar.lange@example.de',      versicherungsnummer: 'C678901236', versicherungsname: 'IKK classic' },
  { vorname: 'Greta',     nachname: 'Simon',      strasse: 'Duissernstraße 12',        plz: '47058', ort: 'Duisburg',            telefon: '0203 5656567', email: 'greta.simon@example.de',      versicherungsnummer: 'D789012347', versicherungsname: 'DAK-Gesundheit' },
  { vorname: 'Emil',      nachname: 'Voss',       strasse: 'Feldmark 8',               plz: '45883', ort: 'Gelsenkirchen',       telefon: '0209 7878789', email: 'emil.voss@example.de',        versicherungsnummer: 'E890123458', versicherungsname: 'Barmer' },
  { vorname: 'Marlene',   nachname: 'Otto',       strasse: 'Kaiserstraße 130',         plz: '44135', ort: 'Dortmund',            telefon: '0231 9090123', email: 'marlene.otto@example.de',     versicherungsnummer: 'F901234569', versicherungsname: 'AOK Nordwest' },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('klienten', klienten);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('klienten', null, {});
  },
};
