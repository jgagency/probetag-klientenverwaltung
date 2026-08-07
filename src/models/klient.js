import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

// Das Sequelize-Modell zur Tabelle klienten.
// Wichtig: Das Modell legt die Tabelle NICHT an — das machen die Migrationen in db/migrations.
// Wer hier ein Feld ergänzt, braucht also immer auch eine Migration dazu.
const Klient = sequelize.define(
  'Klient',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vorname: DataTypes.TEXT,
    nachname: DataTypes.TEXT,
    strasse: DataTypes.TEXT,
    plz: DataTypes.TEXT,
    ort: DataTypes.TEXT,
    telefon: DataTypes.TEXT,
    email: DataTypes.TEXT,
    versicherungsnummer: DataTypes.TEXT,
    versicherungsname: DataTypes.TEXT,
    geburtsdatum: DataTypes.DATEONLY
  },
  {
    tableName: 'klienten',
    timestamps: false, // keine createdAt/updatedAt-Spalten
  }
);

export default Klient;
