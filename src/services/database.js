import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('EnerWattMadagascar.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, role TEXT)',
        []
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS issues (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, type TEXT, status TEXT, latitude REAL, longitude REAL, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id))',
        []
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS consumption (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, type TEXT, value REAL, date TEXT, FOREIGN KEY(user_id) REFERENCES users(id))',
        []
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)',
        ['admin', 'admin123', 'admin']
      );
      tx.executeSql(
        'INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)',
        ['user', 'user123', 'user'],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

export const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows._array[0]);
          } else {
            reject(new Error('Invalid credentials'));
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};
export const addIssue = (title, description, type, latitude, longitude, userId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO issues (title, description, type, status, latitude, longitude, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, description, type, 'pending', latitude, longitude, userId],
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
      );
    });
  });
};

export const getIssues = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM issues',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const getConsumptionData = (userId) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM consumption WHERE user_id = ?',
        [userId],
        (_, { rows }) => {
          const data = rows._array;
          const water = data.filter(item => item.type === 'water');
          const electricity = data.filter(item => item.type === 'electricity');
          resolve({ water, electricity });
        },
        (_, error) => reject(error)
      );
    });
  });
};

export const addConsumptionData = (userId, type, value, date) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO consumption (user_id, type, value, date) VALUES (?, ?, ?, ?)',
        [userId, type, value, date],
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
      );
    });
  });
};
