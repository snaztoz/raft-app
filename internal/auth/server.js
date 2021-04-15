import * as admin from 'firebase-admin';

// mencegah error ketika reload app
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
} else {
  admin.app()
}

const serverAuth = {
  login: async function(req, res) {
    const idToken = req.body.idToken.toString()
    const expiresIn = 60 * 60 * 24 * 5 * 1000

    return admin
      .auth()
      .createSessionCookie(idToken, { expiresIn })
  }
}

export default serverAuth
