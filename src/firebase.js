// firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDEzVslo3fjmyLZm02vAJb0BYHznd03NPc",
  authDomain: "pino-nmpb.firebaseapp.com",
  databaseURL:
    "https://pino-nmpb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pino-nmpb",
  storageBucket: "gs://pino-nmpb.appspot.com",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, storage, database };
