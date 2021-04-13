import Head from 'next/head'
import { withIronSession } from 'next-iron-session'

import Container from 'components/Container'
import session from 'values/session'
import url from 'values/urls'
import { ActionButton } from 'components/Button'
import { ProfileHeader } from 'components/chat/ProfileHeader'

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
        <aside className="col-span-4 h-full">
          <ProfileHeader bgColor="bg-green-300" textColor="text-white" name="Foo"
              image="/me-square.jpg" otherActions="act" />
        </aside>
        <main className="col-span-8 h-full bg-red-100 flex flex-col justify-between">
          <ProfileHeader bgColor="bg-white" textColor="text-dark" name="Bar"
              image="/me-square.jpg" otherActions="act" />

          <div className="h-full">
            <h1>MessagesArea</h1>
          </div>

          <div className="bg-white flex px-3 py-2">
            <textarea className="mr-3 py-3 px-5 w-full resize-none outline-none bg-gray-200
                rounded-2xl" rows="1"></textarea>

            <div className="flex items-center">
              <ActionButton buttonType="primary" text="Send"
                  style="p-0"
                  handleClick={() => console.log('CLICKED')}/>
            </div>
          </div>
        </main>
      </div>
    </Container>
  )
}
