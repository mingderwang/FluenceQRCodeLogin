import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="py-4 artboard artboard-demo bg-base-200">
      <ul className="menu items-stretch px-3 shadow-lg bg-base-100 horizontal rounded-box">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/fluenceHello">
            <a>SayHello</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </li>
      </ul>
      <Component {...pageProps} />
    </div>
  )
}
export default App
