import Head from 'next/head'
import Image from 'next/image';

import Container from 'components/Container'
import Footer from 'components/Footer'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Raft</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>

      <main className="p-3 text-center md:flex md:justify-center">
        <div className="md:flex flex-col justify-center md:mr-20">
          <h1 className="text-3xl mb-3">
            <strong>Introducing <span className="text-green-500">Raft</span></strong>
          </h1>
          <h2 className="text-xl mb-6">Your new way of interacting with others</h2>

          <div>
            <a href="#" className="inline-block border-2 border-green-500 bg-green-500 px-3
                py-2 text-white rounded-md font-semibold hover:bg-green-600
                hover:border-green-600">
              Sign up
            </a>
            <span className="inline-block mx-2"></span>
            <a href="#" className="inline-block border-2 border-green-500 px-3 py-2
                rounded-md text-green-500 font-semibold hover:border-green-600
                hover:text-green-600">
              Login
            </a>
          </div>
        </div>

        <div>
          <Image src="/svg/chatbox_girl.svg" width="256" height="256" />
        </div>
      </main>

      <Footer />
    </Container>
  )
}
