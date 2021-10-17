import {FirebaseError} from "@firebase/app";

export interface Error {
    show: boolean,
    message : string
}


export function getError(firebaseError: FirebaseError): Error {
    const errorsEnum = {
        "auth/invalid-email": "Veuillez entrer un email valide",
        "auth/invalid-password": "Mot de passe invalide",
        "auth/user-not-found": "Cette adresse mail ne correspond à aucun compte",
        "auth/wrong-password" : "Mot de passe incorrect"
    }
    console.log(firebaseError.code)
    const message =  errorsEnum[firebaseError.code] == undefined ? firebaseError.code : errorsEnum[firebaseError.code];
    return {show: true, message: message};
}