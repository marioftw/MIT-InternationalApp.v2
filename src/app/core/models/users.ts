import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export interface Users {
    id: string;
    userId: string;
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    dateOfBirth: Timestamp;
    createdOn: Timestamp;
}