import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from 'components/Container'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import url from 'values/urls'
import { BreakSpace } from 'components/Space'
import { PasswordInput, SubmitButton, TextInput } from 'components/Forms'
import { forms } from 'values/forms'
import { useAuth } from 'lib/use-auth'

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
    this.el = null
    this.msg = null
    return { el, msg }
  }
}

export default function Login() {
  const auth = useAuth()
  const router = useRouter()
  const [error, setError] = useState(formErrors)

  if (auth.user) {
    router.push(url.home)
  }

  const doLogin = async () => {
    const identifier = document.querySelector(`input[name="${forms.login.identifier}"]`).value
    const password = document.querySelector(`input[name="${forms.login.password}"]`).value

    await auth.signin(identifier, password, errorCode => {
      setError(error => ({
        ...error,
        el: errorCodes[errorCode].el,
        msg: errorCodes[errorCode].msg
      }))
    })
  }

  const formError = error.take()

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
                isErrorExist={formError.el == 'identifier'} errorMsg={formError.msg}/>

            <PasswordInput name={forms.login.password} placeholder="Password"
                isErrorExist={formError.el == 'password'} errorMsg={formError.msg} />
            <BreakSpace size="5" />

            <SubmitButton value="Login" handleClick={doLogin}/>
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
