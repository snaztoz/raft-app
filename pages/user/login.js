import Head from 'next/head'

import Container from 'components/Container'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

import style from 'styles/Forms.module.css'

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
            <input type="text" placeholder="Username or Email" className={`${style.no_outline}
                w-full p-3 rounded border-b-2 border-gray-300 focus:border-green-500`}/>
            <div className="mb-3"></div>
            <input type="password" placeholder="Password" className={`${style.no_outline}
                w-full p-3 rounded border-b-2 border-gray-300 focus:border-green-500`}/>
            <div className="mb-8"></div>
            <button type="submit" value="Login" className={`${style.no_outline} w-full p-3
                rounded-full bg-green-500 hover:bg-green-600 focus:bg-green-600 font-semibold
                text-white`}>
              Login
            </button>
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
            Doesn't have an account?
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
