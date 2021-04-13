const session = {
  password: process.env.SECRET_KEY,
  httpOnly: true,
  cookieName: 'RAFTCOOKIE',
  cookieOptions: {
    secure: process.env.SECRET_KEY == 'production'
  }
}

export default session
