import Head from 'next/head'

import Container from 'components/Container'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { PasswordInput, SubmitButton, TextInput } from 'components/Forms'

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
          <h1 className="text-xl mb-5">Login</h1>
          <form action="" method="POST">
            <TextInput name="identifier" placeholder="Username or Email" />
            <div className="mb-3"></div>
            <PasswordInput name="password" placeholder="Password" />
            <div className="mb-8"></div>
            <SubmitButton value="Login" />
          </form>
          <div className="mb-5"></div>

          <p>
            <a href="#" className="text-blue-500 hover:text-blue-600 hover:underline
                focus:text-blue-600 focus:underline">
              Forgot your password?
            </a>
          </p>
          <div className="mb-2"></div>
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
