import { withIronSession } from 'next-iron-session'

import session from 'values/session'

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('')
  }

  await req.session.destroy()
  return res.status(201).send('')
}

export default withIronSession(handler, session)
