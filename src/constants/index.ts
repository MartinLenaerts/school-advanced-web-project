import {FirebaseError} from "@firebase/app";

export interface Error {
    show: boolean,
    message: string
}

export interface User {
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
    seller: User | string | null,
    description: string,
    image_ref: string | null
}


export interface Message {
    id: string,
    content: string,
    sender: User,
    receiver: User,
    product: Product,
    answeredTo : Message | null
}


export function getError(firebaseError: FirebaseError): Error {
    let error: Error;
    switch (firebaseError.code) {
        case "auth/invalid-email":
            error = {message: "Veuillez entrer un email valide", show: true}
            break;
        case "auth/invalid-password":
            error = {message: "Mot de passe invalide", show: true}
            break;
        case "auth/user-not-found":
            error = {message: "Cette adresse mail ne correspond à aucun compte", show: true}
            break;
        case "auth/wrong-password" :

            error = {message: "Mot de passe incorrect", show: true}
            break;
        case "auth/weak-password" :
            error = {message: "Mot de passe trop faible", show: true}
            break;
        case "auth/email-already-in-use" :
            error = {message: "Email déjà utilisé", show: true}
            break;
        default :
            error = {message: firebaseError.code, show: true}
    }
    return error;
}