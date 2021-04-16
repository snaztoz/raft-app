import * as admin from 'firebase-admin'
import { withIronSession } from 'next-iron-session'

import session from 'values/session'

/// Mekanisme login di sisi server Next.js
///
/// Baca file /pages/user/login.js untuk informasi lebih lengkap
///

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
}

const exchangeJwtWithCookie = async req => {
  const idToken = req.body.idToken.toString()
  const expiresIn = 60 * 60 * 24 * 5 * 1000

  return admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('')
  }

  return await exchangeJwtWithCookie(req, res)
    .then(async sessionCookie => {
      req.session.set('user', sessionCookie)
      await req.session.save()
      return res.status(201).send('')
    })
    .catch(err => res.status(401).send({ err }))
}

export default withIronSession(handler, session)
