import React, { useState } from 'react'
import Head from 'next/head'
import firebase from 'firebase/app'
import { useRouter } from 'next/router'
import { withIronSession } from 'next-iron-session'
import 'firebase/auth'

import firebaseClientConfig from 'values/firebase'
import forms from 'values/forms'
import session from 'values/session'
import url from 'values/urls'
import { BreakSpace } from 'components/Space'
import { Container } from 'components/Container'
import { Footer } from 'components/Footer'
import { Navbar } from 'components/Navbar'
import { PasswordInput, SubmitButton, TextInput } from 'components/Forms'

export const getServerSideProps = withIronSession(
  async function ({ req }) {
    const user = req.session.get('user')

    if (user) {
      return {
        redirect: {
          destination: url.chat,
          permanent: false
        }
      }
    }

    return { props: {} }
  },
  session
)

/* Error yang mungkin terjadi */
const errorCodes = {
  'auth/invalid-email': {
    el: 'identifier',
    msg: 'invalid email'
  },

  'auth/user-not-found': {
    el: 'identifier',
    msg: 'user does not exist'
  },

  'auth/wrong-password': {
    el: 'password',
    msg: 'incorrect password'
  }
}

// Object untuk state error dari page login.
//
// Dibuat seperti ini agar bisa menerapkan custom getter, supaya
// pesan error yang ada hanya dapat diambil sekali setiap kali
// terjadi error (flash message)
const formErrors = {
  el: null,
  msg: null,

  take: function() {
    const el = this.el
    const msg = this.msg
    this.clear()
    return { el, msg }
  },

  clear: function() {
    this.el = null
    this.msg = null
  }
}

/// Implementasi untuk mekanisme login terdiri atas beberapa tahapan,
/// yakni sebagai berikut:
///
///  1. User melakukan login JWT dengan menggunakan layanan firebase
///     secara langsung (tanpa melalui server Next.js)
///  2. Setelah login berhasil dan token JWT sudah didapatkan, kemudian
///     token tersebut dikirimkan ke server Next.js (ada di path
///     /api/user/login) untuk ditukarkan dengan session cookie.
///  3. Jika berhasil, maka user akan diredirect ke page lain dengan
///     membawa cookie dari session milik-nya.
///
/// note:
///  1. Setelah user mendapatkan session cookie, ia kemudian akan langsung
///     melakukan logout dari login JWT-nya.
///
/// TODO:
///  1. Belum diimplementasikan CSRF protection ketika menukarkan token
///     JWT dengan session cookie.
///

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseClientConfig)
}

const login = async (identifier, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(identifier, password)
    // lakukan pertukaran token dengan session cookie
    .then(({ user }) =>
      user
        .getIdToken()
        .then(token => exchangeJwt(token))
    )
    .then(() => firebase.auth().signOut())
    .catch(err => { throw err })
}

const exchangeJwt = async idToken => {
  return fetch(url.apiUserLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ idToken })
  })
}

export default function Login() {
  const router = useRouter()
  const [errorState, setErrorState] = useState(formErrors)

  const attemptLogin = async () => {
    // reset error state ketika tombol login ditekan
    setErrorState(formErrors)

    const identifier = document.querySelector(`input[name="${forms.login.identifier}"]`).value
    const password = document.querySelector(`input[name="${forms.login.password}"]`).value

    return login(identifier, password)
      .then(() => router.push(url.chat))
      .catch(err => {
        const code = err.code
        setErrorState(prevErrorState => ({
          ...prevErrorState,
          el: errorCodes[code].el,
          msg: errorCodes[code].msg
        }))
        throw err
      })
  }

  const inputError = errorState.take()

  return (
    <Container>
      <Head>
        <title>Raft</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>

      <Navbar />

      <main className="flex justify-center">
        <div className="w-80 text-center py-3">
          <h1 className="text-xl">Login</h1>

          <BreakSpace size="8" />

          <form action="" method="POST">
            <TextInput name={forms.login.identifier} placeholder="Username or Email"
                isErrorExist={inputError.el == 'identifier'} errorMsg={inputError.msg} />

            <PasswordInput name={forms.login.password} placeholder="Password"
                isErrorExist={inputError.el == 'password'} errorMsg={inputError.msg} />
            <BreakSpace size="5" />

            <SubmitButton value="Login" handleClick={attemptLogin} />
          </form>

          <BreakSpace size="5" />

          <p>
            <a href="#" className="text-blue-500 hover:text-blue-600 hover:underline
                focus:text-blue-600 focus:underline">
              Forgot your password?
            </a>
          </p>
          <BreakSpace size="2" />
          <p>
            Doesn't have an account?&nbsp;
            <a href="#" className="text-blue-500 hover:text-purple-600 hover:underline
                focus:text-blue-600 focus:underline">
              Register
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </Container>
  )
}
