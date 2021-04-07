import Head from 'next/head'
import { useRouter } from 'next/router'

import Container from 'components/Container'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import url from 'values/urls'
import { BreakSpace } from 'components/Space'
import { PasswordInput, SubmitButton, TextInput } from 'components/Forms'
import { forms } from 'values/forms'
import { loginSubmitHandler } from 'handlers/submit-login'
import { useAuth } from 'lib/use-auth'

export default function Login() {
  const auth = useAuth()
  const router = useRouter()

  if (auth.user) {
    router.push(url.home)
  }

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

          <BreakSpace size="5" />

          <form action="" method="POST">
            <TextInput name={forms.login.identifier} placeholder="Username or Email" />
            <BreakSpace size="3" />
            <PasswordInput name={forms.login.password} placeholder="Password" />
            <BreakSpace size="8" />
            <SubmitButton value="Login" handleClick={() => {
                  loginSubmitHandler(
                    document.querySelector(`input[name="${forms.login.identifier}"]`).value,
                    document.querySelector(`input[name="${forms.login.password}"]`).value,
                    auth.signin
                  )
                }}/>
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
