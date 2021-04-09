import Head from 'next/head'
import Image from 'next/image';

import Container from 'components/Container'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import url from 'values/urls'
import { LinkButton } from 'components/Button'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Raft</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>

      <Navbar>
        <LinkButton link="/user/login" buttonType="primary" text="Get Started" />
      </Navbar>

      <main className="p-3 text-center md:text-left md:flex md:justify-center">
        <div className="md:flex flex-col justify-center md:mr-20">
          <h1 className="text-3xl mb-3">
            <strong>Introducing <span className="text-green-500">Raft</span></strong>
          </h1>
          <h2 className="text-xl mb-6">Your new way of interacting with others</h2>

          <div>
            <LinkButton link={url.userLogin} buttonType="primary" text="Get Started" />
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
