import firebase from 'firebase/app'

import { firebaseConfig } from 'values/firebase'

// mencegah error ketika reload app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

export const login = async (identifier, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(identifier, password)
    // return [result, error]
    .then(result => [result, null])
    .catch(err => [null, err.code])
}
