import firebase from 'firebase/app'
import 'firebase/auth'

import firebaseClientConfig from 'values/firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseClientConfig)
}

const clientAuth = {
  login: async function(identifier, password, onLoginSuccess, onLoginFailed) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(identifier, password)
      .then(({ user }) => {
        return user.getIdToken().then(idToken => {
          return fetch('/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ idToken })
          })
        })
      })
      .then(() => firebase.auth().signOut())
      .catch(err => { throw err })
  }
}

export default clientAuth
