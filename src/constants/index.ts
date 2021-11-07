import {FirebaseError} from "@firebase/app";
import firebase from "firebase/compat";
import Vue from "vue";
import store from "@/utils/store";
import Error = firebase.auth.Error;

export interface CustomError {
    show: boolean,
    message: string
}

export interface User {
    uid: string,
    name: string,
    firstname: string,
    seller: boolean,
    email: string,
    password: string
}


export interface Product {
    id: string,
    name: string,
    price: number,
    seller: User,
    description: string,
    image_ref: string
}


export interface Message {
    id: string,
    content: string,
    sender: User,
    receiver: User,
    product: Product,
    answeredTo: Message | null,
    isAnswered: boolean
}

type typeFirebaseMap = {
    [key: string]: string
}


export function getFirebaseError(firebaseError: FirebaseError): string {
    const firebaseMapCode: typeFirebaseMap = {
        "auth/invalid-email": "Veuillez entrer un email valide",
        "auth/invalid-password": "Mot de passe invalide",
        "auth/user-not-found": "Cette adresse mail ne correspond à aucun compte",
        "auth/wrong-password": "Mot de passe incorrect",
        "auth/weak-password": "Mot de passe trop faible",
        "auth/email-already-in-use": "Email déjà utilisé",
    }
    const message = firebaseMapCode[firebaseError.code]
    return message ? message : firebaseError.message;

}


export function handleError(err: Error, vm: Vue, info: string): void {
    console.log(err, info)
    if (err instanceof FirebaseError) err.message = getFirebaseError(err);
    store.commit('setError', err);
}


/**
 * Exceptions
 */

