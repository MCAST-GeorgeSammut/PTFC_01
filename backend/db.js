import Firestore from "@google-cloud/firestore"
import { createHmac } from "crypto";

//Google Cloud Key
export const GOOGLE_APPLICATION_CREDENTIALS = './key.json';

//Instantiating Firestore with project details
const db = new Firestore({
    projectId: 'pftc-0000001',
    keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
});

//Collection (Table)
//Document (Row)
//docRef selects the collection and corresponding element

export async function createUser(name, surname, email, password) {
    const docRef = db.collection("users").doc();
    return await docRef.set({
        name: name,
        surname: surname,
        email: email,
        password: HashPassword(password),
    });
}

export async function getUser(email) {
    const docRef = db.collection("users")
    const snapshot = await docRef.where("email", "==", email).get();
    let data = [];
    snapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}

export function HashPassword(password) {
    const hash_key = 'DTLE#17';
    return createHmac('sha256', hash_key)
        .update('I love cupcakes')
        .digest('hex');
}