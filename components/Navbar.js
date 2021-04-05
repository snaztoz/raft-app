import Link from 'next/link'

import url from 'values/urls'
import { LinkButton } from 'components/Button'

export default function Navbar() {
  return (
    <nav className="p-2 grid grid-cols-10 lg:grid-cols-8 gap-2 bg-white border-b">
      <p className="col-span-3 lg:col-start-2 lg:col-span-2 flex
          justify-center items-center">
        <Link href={url.home}>
          <a className="inline-block text-2xl">
            <strong>Raft</strong>
          </a>
        </Link>
      </p>

      <div className="col-start-8 col-span-3 lg:col-span-2 lg:col-start-6
          py-1 flex justify-center">
        <LinkButton link="/user/login" buttonType="secondary" text="Login" />
      </div>
    </nav>
  )
}
