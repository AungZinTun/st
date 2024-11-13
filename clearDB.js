import PouchDB from 'pouchdb';

async function clearPouchDB() {
  try {
    // Create a PouchDB instance
    const db = new PouchDB('habits');

    // Destroy the current database
    await db.destroy();
    console.log('PouchDB destroyed successfully');

    // Recreate the database to continue using it
    const newDb = new PouchDB('habits');
    console.log('PouchDB recreated successfully');
  } catch (error) {
    console.error('Error clearing PouchDB:', error);
  }
}

clearPouchDB();
