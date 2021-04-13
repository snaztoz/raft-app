import { withIronSession } from 'next-iron-session'

import session from 'values/session'
import { login } from 'internal/auth'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('')
  }

  const {identifier, password} = req.body

  // Golang style here :v
  const [credential, err] = await login(identifier, password)
  if (err) {
    return res.status(401).send({ err })
  }
  
  req.session.set('user', credential.user)
  await req.session.save()

  return res.status(201).send('')
}

export default withIronSession(handler, session)
