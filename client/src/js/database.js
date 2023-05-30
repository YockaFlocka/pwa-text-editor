import { openDB } from 'idb';

// We will define a global constant for our database name so we don't mess it up anywhere
const DB_NAME = "jate"

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.error('putDb not implemented');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB(DB_NAME, 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction(DB_NAME, 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore(DB_NAME);

  // use the .put() method to update db
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result.value);
};

/*
  We need to add some code below which will get all content from IndexedDB.
*/
export const getDb = async () => {
  console.error('getDb not implemented');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB(DB_NAME, 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction(DB_NAME, 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore(DB_NAME);

  // Leave the rest as-is
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
