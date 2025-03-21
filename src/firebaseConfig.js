import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-zh8Ue-ox-D84T1ddKWgVMDZEKh-L8ZI",
  authDomain: "the-break-co-agency.firebaseapp.com",
  projectId: "the-break-co-agency",
  storageBucket: "the-break-co-agency.appspot.com",
  messagingSenderId: "583250868510",
  appId: "1:583250868510:web:97f7b36e1f2a3e165f310f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
