import Head from 'next/head'

import Container from 'components/Container'
import Footer from 'components/Footer'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Raft</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>

      <h1 className="bg-gray-100">Hello World</h1>

      <Footer />
    </Container>
  )
}
