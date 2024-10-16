import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('census');

export interface Person {
  dateOfBirth: string | number | Date;
  censusunittype: string;
  householdno: number;
  id: number;
  province: string;
  district: string;
  LLG: string;
  ward: string;
  censusunit: string;
  censustype: string;
  workloadno: string;
  locality: string;
  section: number;
  lot: number;
  structureno: number;
  PDno: number;
  totalpeople: number;
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  email: string;
  date: string;
  gender: string;
  maritalstatus: string;
  isCitizen: string; 
  country: string | null; 
}

export const initializeDB = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS person (
    id INTEGER PRIMARY KEY NOT NULL,
    province TEXT NOT NULL,
    district TEXT NOT NULL,
    LLG TEXT NOT NULL,
    ward TEXT NOT NULL,
    censusunit TEXT NOT NULL,
    censusunittype TEXT NOT NULL,   -- This is the column causing the issue
    workloadno INTEGER NOT NULL,
    locality TEXT NOT NULL,
    section INTEGER NOT NULL,
    lot INTEGER NOT NULL,
    structureno INTEGER NOT NULL,
    PDno INTEGER NOT NULL,
    householdno INTEGER NOT NULL,
    totalpeople INTEGER NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    relationship TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    date TEXT NOT NULL,
    gender TEXT NOT NULL,
    maritalstatus TEXT NOT NULL,
    isCitizen TEXT NOT NULL,
    country TEXT
      
      );
    `);
    console.log("Table 'person' created successfully.");

    // Add the censusunittype column if it does not exist
    await alterTable();
    
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Function to alter table and add missing column
export const alterTable = async () => {
  try {
    await db.execAsync(`
      ALTER TABLE person ADD COLUMN censusunittype TEXT NOT NULL;
    `);
    console.log("Column 'censusunittype' added successfully.");
  } catch (error: unknown) { // Specify the error type
    if (error instanceof Error) { // Check if error is an instance of Error
      if (error.message.includes("duplicate column name")) {
        console.log("Column 'censusunittype' already exists.");
      } else {
        console.error("Error altering table:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export const addPerson = async (
  province: string,
  district: string,
  LLG: string,
  ward: string,
  censusunit: string,
  censusunittype: string,
  workloadno: string,
  locality: string,
  section: number,
  lot: number,
  structureno: number,
  PDno: number,
  householdno: number,
  totalpeople: number,
  firstName: string,
  lastName: string,
  relationship: string,
  phone: string,
  email: string,
  date: string,
  gender: string,
  maritalstatus: string,
  isCitizen: string,   // New field
  country: string | null // New field
) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO person (province, district, LLG, ward, censusunit, censusunittype, workloadno, locality, section, lot, structureno, PDno, householdno, totalpeople, firstName, lastName, relationship, phone, email, date, gender, maritalstatus, isCitizen, country) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      province,
      district,
      LLG,
      ward,
      censusunit,
      censusunittype,
      workloadno,
      locality,
      section,
      lot,
      structureno,
      PDno,
      householdno,
      totalpeople,
      firstName,
      lastName,
      relationship,
      phone,
      email,
      date,
      gender,
      maritalstatus,
      isCitizen,
      country
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding person:", error);
    return null;
  }
};

export const updatePerson = async (
  id: number,
  province: string,
  district: string,
  LLG: string,
  ward: string,
  censusunit: string,
  censusunittype: string,
  workloadno: string,
  locality: string,
  section: number,
  lot: number,
  structureno: number,
  PDno: number,
  householdno: number,
  totalpeople: number,
  firstName: string,
  lastName: string,
  relationship: string,
  phone: string,
  email: string,
  date: string,
  gender: string,
  maritalstatus: string,
  isCitizen: string,   // New field
  country: string | null // New field
) => {
  try {
    await db.runAsync(
      `UPDATE person 
       SET province = ?, district = ?, LLG = ?, ward = ?, censusunit = ?, censusunittype = ?, workloadno = ?, locality = ?, section = ?, lot = ?, structureno = ?, PDno = ?, householdno = ?, totalpeople = ?, firstName = ?, lastName = ?, relationship = ?, phone = ?, email = ?, date = ?, gender = ?, maritalstatus = ?, isCitizen = ?, country = ?
       WHERE id = ?`,
      province,
      district,
      LLG,
      ward,
      censusunit,
      censusunittype,
      workloadno,
      locality,
      section,
      lot,
      structureno,
      PDno,
      householdno,
      totalpeople,
      firstName,
      lastName,
      relationship,
      phone,
      email,
      date,
      gender,
      maritalstatus,
      isCitizen,
      country,
      id
    );
  } catch (error) {
    console.error("Error updating person:", error);
    throw new Error("Unable to update person details. Please try again.");
  }
};

export const deletePerson = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM person WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

export const getPersons = async (householdno: number) => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error("Error getting persons:", error);
    return [];
  }
};
