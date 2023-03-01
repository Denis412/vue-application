import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";

const app = initializeApp({
    apiKey: "AIzaSyCcSKAHr_kOqpjHMqNdgXC2cnVIZytttJg",
    authDomain: "mytodolist-82b90.firebaseapp.com",
    projectId: "mytodolist-82b90",
    storageBucket: "mytodolist-82b90.appspot.com",
    messagingSenderId: "313577859736",
    appId: "1:313577859736:web:098708e13d1099821dbeed",
    measurementId: "G-BWF36FVX3N"
});
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {
    db
}