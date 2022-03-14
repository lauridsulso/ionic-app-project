// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8haO6WQ2tsKOYvFivc0mB7LIdS4yCHK8",
  authDomain: "ionic-app-project-8318d.firebaseapp.com",
  databaseURL: "https://ionic-app-project-8318d-default-rtdb.firebaseio.com",
  projectId: "ionic-app-project-8318d",
  storageBucket: "ionic-app-project-8318d.appspot.com",
  messagingSenderId: "654628867908",
  appId: "1:654628867908:web:138490293dff4851a79111",
  measurementId: "G-BZ8BPS81CX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create database reference
const database = getDatabase(app);
// Reference to tasks in Realtime DB
export const tasksRef = ref(database, "tasks");
// Reference to users in Realtime DB
export const usersRef = ref(database, "users");
//Firebase storage
export const storage = getStorage(app);

// Get reference to specific task using task id
export function getTaskRef(taskId) {
  return ref(database, "tasks/" + taskId);
}
// Get reference to specific user using user id
export function getUserRef(userId) {
  return ref(database, "users/" + userId);
}
