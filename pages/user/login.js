import Head from 'next/head'

import Container from 'components/Container'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { BreakSpace } from 'components/Space'
import { PasswordInput, SubmitButton, TextInput } from 'components/Forms'
import { signUserIn } from 'handlers/submit-login'

export default function Login() {
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
            <TextInput name="identifier" placeholder="Username or Email" />
            <BreakSpace size="3" />
            <PasswordInput name="password" placeholder="Password" />
            <BreakSpace size="8" />
            <SubmitButton value="Login" handleClick={() => {
                  signUserIn(
                    document.querySelector('input[name="identifier"]').value,
                    document.querySelector('input[name="password"]').value
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
