import Head from 'next/head'
import { withIronSession } from 'next-iron-session'

import session from 'values/session'
import url from 'values/urls'
import { Container } from 'components/Container'
import { ProfileHeader } from 'components/chat/ProfileHeader'
import { Sidebar } from 'components/chat/Sidebar'
import { TypingArea } from 'components/chat/TypingArea'

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

      <div className="h-screen grid grid-cols-12">
        <Sidebar />

        <main className="col-span-8 h-full bg-red-100 flex flex-col justify-between">
          <ProfileHeader bgColor="bg-white" textColor="text-dark" name="Bar"
              image="/me-square.jpg" otherActions="act" />

          <div className="h-full">
            <h1>MessagesArea</h1>
          </div>

          <TypingArea />
        </main>
      </div>
    </Container>
  )
}
