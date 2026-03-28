import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCY6FXE6LIavtn3giQiVzamjRJMftV7J38",
    authDomain: "musictheory-run.firebaseapp.com",
    projectId: "musictheory-run",
    storageBucket: "musictheory-run.firebasestorage.app",
    messagingSenderId: "614049440855",
    appId: "1:614049440855:web:b90bac610abec4e43a2f12"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth , db }