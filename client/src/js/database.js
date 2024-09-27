import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const jateDb = await initdb();
    const tx = jateDb.transaction('jate','readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, value: content }); 
    const response = await request;
    console.log('Content added to the database');
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const jateDb = await initdb();
    const tx = jateDb.transaction('jate','readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll(); 
    const response = await request;
    console.log('Content retrieved from the database:', response);
    return response;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return [];
  }
};

initdb();
