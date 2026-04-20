import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (userData) => {
  const { email, password, name, dob } = userData;

  // Create user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // Store extra data in Firestore
  await setDoc(doc(db, "users", user.uid), {
    user_name: name,
    email: email,
    dob: new Date(dob),
    role: "user",
    creation_time: new Date()
  });

  return user;
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};