import { withIronSession } from 'next-iron-session'

import session from 'values/session'
import serverAuth from 'internal/auth/server'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('')
  }

  return await serverAuth
    .login(req, res)
    .then(async sessionCookie => {
      req.session.set('user', sessionCookie)
      await req.session.save()
      return res.status(201).send('')
    })
    .catch(err => res.status(401).send({ err }))
}

export default withIronSession(handler, session)
