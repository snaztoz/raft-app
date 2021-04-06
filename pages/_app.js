import { ProvideAuth } from 'lib/use-auth'

import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  )
}

export default MyApp
