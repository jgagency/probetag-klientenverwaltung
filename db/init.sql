-- Wird beim ERSTEN Start des Containers automatisch eingespielt.
-- Zurücksetzen: npm run db:reset  (löscht das Volume und spielt alles neu ein)

CREATE TABLE klienten (
  id                  SERIAL PRIMARY KEY,
  vorname             TEXT,
  nachname            TEXT,
  strasse             TEXT,
  plz                 TEXT,
  ort                 TEXT,
  telefon             TEXT,
  email               TEXT,
  versicherungsnummer TEXT,
  versicherungsname   TEXT
);

INSERT INTO klienten (vorname, nachname, strasse, plz, ort, telefon, email, versicherungsnummer, versicherungsname) VALUES
('Max',      'Mustermann', 'Kettwiger Straße 12',      '45127', 'Essen',               '0201 1234567',  'max.mustermann@example.de',   'A123456789', 'AOK Essen'),
('Maria',    'Musterfrau', 'Rüttenscheider Straße 45', '45130', 'Essen',               '0201 7654321',  'maria.musterfrau@example.de', 'B987654321', 'AOK Essen'),
('Gottfried','Jasken',     'Huyssenallee 8',           '45128', 'Essen',               '0201 5551112',  'gottfried.jasken@example.de', 'C234567890', 'AOK Essen'),
('Leonie',   'Schmitz',    'Bochumer Landstraße 210',  '45279', 'Essen',               '0201 8891234',  'leonie.schmitz@example.de',   'D345678901', 'Techniker Krankenkasse'),
('Jonas',    'Becker',     'Alleestraße 34',           '44793', 'Bochum',              '0234 4455667',  'jonas.becker@example.de',     'E456789012', 'Barmer'),
('Amira',    'Yilmaz',     'Castroper Straße 87',      '44791', 'Bochum',              '0234 9988776',  'amira.yilmaz@example.de',     'F567890123', 'AOK Nordwest'),
('Paul',     'Hoffmann',   'Kampstraße 12',            '44137', 'Dortmund',            '0231 2233445',  'paul.hoffmann@example.de',    'G678901234', 'DAK-Gesundheit'),
('Emilia',   'Krüger',     'Hoher Wall 5',             '44122', 'Dortmund',            '0231 6677889',  'emilia.krueger@example.de',   'H789012345', 'IKK classic'),
('Luca',     'Wagner',     'Sonnenstraße 19',          '44139', 'Dortmund',            '0231 4455660',  'luca.wagner@example.de',      'J890123456', 'Techniker Krankenkasse'),
('Sofia',    'Ricci',      'Königstraße 61',           '47051', 'Duisburg',            '0203 3344556',  'sofia.ricci@example.de',      'K901234567', 'Barmer'),
('Ben',      'Schulte',    'Sternbuschweg 140',        '47057', 'Duisburg',            '0203 7788990',  'ben.schulte@example.de',      'L012345678', 'AOK Nordwest'),
('Hannah',   'Vogel',      'Bahnhofstraße 22',         '45879', 'Gelsenkirchen',       '0209 1122334',  'hannah.vogel@example.de',     'M123456780', 'Knappschaft'),
('Elias',    'Brandt',     'Ebertstraße 30',           '45879', 'Gelsenkirchen',       '0209 4455778',  'elias.brandt@example.de',     'N234567891', 'AOK Nordwest'),
('Mila',     'Peters',     'Marktstraße 155',          '46045', 'Oberhausen',          '0208 9900112',  'mila.peters@example.de',      'P345678902', 'DAK-Gesundheit'),
('Noah',     'Winkler',    'Elsässer Straße 17',       '46045', 'Oberhausen',          '0208 2233551',  'noah.winkler@example.de',     'Q456789013', 'Techniker Krankenkasse'),
('Clara',    'Neumann',    'Schloßstraße 28',          '45468', 'Mülheim an der Ruhr', '0208 6655443',  'clara.neumann@example.de',    'R567890124', 'Barmer'),
('Felix',    'Sauer',      'Aktienstraße 60',          '45473', 'Mülheim an der Ruhr', '0208 8877665',  'felix.sauer@example.de',      'S678901235', 'IKK classic'),
('Lina',     'Albers',     'Bahnhofstraße 44',         '44623', 'Herne',               '02323 123456',  'lina.albers@example.de',      'T789012346', 'Knappschaft'),
('David',    'Franke',     'Mont-Cenis-Straße 265',    '44627', 'Herne',               '02323 678901',  'david.franke@example.de',     'U890123457', 'AOK Nordwest'),
('Ella',     'Busch',      'Elberfelder Straße 33',    '58095', 'Hagen',               '02331 246801',  'ella.busch@example.de',       'V901234568', 'DAK-Gesundheit'),
('Tim',      'Lorenz',     'Ruhrstraße 9',             '58452', 'Witten',              '02302 135791',  'tim.lorenz@example.de',       'W012345679', 'Techniker Krankenkasse'),
('Nora',     'Engel',      'Hochstraße 15',            '46236', 'Bottrop',             '02041 556672',  'nora.engel@example.de',       'X123456781', 'AOK Nordwest'),
('Samuel',   'Roth',       'Kunibertistraße 21',       '45657', 'Recklinghausen',      '02361 445563',  'samuel.roth@example.de',      'Y234567892', 'Barmer'),
('Ida',      'Werner',     'Viktoriastraße 5',         '44787', 'Bochum',              '0234 1112223',  'ida.werner@example.de',       'Z345678903', 'Knappschaft'),
('Anton',    'Seidel',     'Rellinghauser Straße 312', '45136', 'Essen',               '0201 9090901',  'anton.seidel@example.de',     'A456789014', 'Techniker Krankenkasse'),
('Frieda',   'Horn',       'Zweigertstraße 27',        '45130', 'Essen',               '0201 3434345',  'frieda.horn@example.de',      'B567890125', 'AOK Essen'),
('Oskar',    'Lange',      'Münsterstraße 99',         '44145', 'Dortmund',            '0231 8787876',  'oskar.lange@example.de',      'C678901236', 'IKK classic'),
('Greta',    'Simon',      'Duissernstraße 12',        '47058', 'Duisburg',            '0203 5656567',  'greta.simon@example.de',      'D789012347', 'DAK-Gesundheit'),
('Emil',     'Voss',       'Feldmark 8',               '45883', 'Gelsenkirchen',       '0209 7878789',  'emil.voss@example.de',        'E890123458', 'Barmer'),
('Marlene',  'Otto',       'Kaiserstraße 130',         '44135', 'Dortmund',            '0231 9090123',  'marlene.otto@example.de',     'F901234569', 'AOK Nordwest');
