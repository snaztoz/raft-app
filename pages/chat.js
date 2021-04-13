import Head from 'next/head'
import { withIronSession } from 'next-iron-session'

import Container from 'components/Container'
import session from 'values/session'
import url from 'values/urls'

export const getServerSideProps = withIronSession(
  async function({ req }) {
    const user = req.session.get('user')

    if (!user) {
      return {
        redirect: {
          destination: url.userLogin,
          permanent: false
        }
      }
    }

    return { props: {user} }
  },
  session
)

export default function Chat({ user }) {
  return (
    <Container>
      <Head>
        <title>Raft</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>

      <div className="h-screen grid grid-cols-12 bg-blue-100">
        <aside className="col-span-4 h-full bg-green-100"></aside>
        <main className="col-span-8 h-full bg-red-100"></main>
      </div>
    </Container>
  )
}
