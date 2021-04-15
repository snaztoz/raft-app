import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { withIronSession } from 'next-iron-session'

import clientAuth from 'internal/auth/client'
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

export default function Login() {
  const router = useRouter()
  const [errorState, setErrorState] = useState(formErrors)

  const doLogin = async () => {
    // reset error state ketika tombol login ditekan
    setErrorState(formErrors)

    const identifier = document.querySelector(`input[name="${forms.login.identifier}"]`).value
    const password = document.querySelector(`input[name="${forms.login.password}"]`).value

    await clientAuth.login(
      identifier,
      password,
      () => router.push(url.chat),
      err => {
        const code = err.code
        setErrorState(prevErrorState => ({
          ...prevErrorState,
          el: errorCodes[code].el,
          msg: errorCodes[code].msg
        }))
      }
    )
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

            <SubmitButton value="Login" handleClick={doLogin} />
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
