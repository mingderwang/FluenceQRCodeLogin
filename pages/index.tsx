import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { EthereumAuthProvider, SelfID } from '@self.id/web'
declare let window: any
const Home: NextPage = () => {
  const [did, setDid] = useState('')

  const buttonHandler = async () => {
    console.log('onClick')
    const addresses = await window.ethereum.enable()
    // "local" | "mainnet-gateway" | "testnet-clay" | "testnet-clay-gateway"
    // https://developers.ceramic.network/learn/networks/
    SelfID.authenticate({
      authProvider: new EthereumAuthProvider(window.ethereum, addresses[0]),
      ceramic: 'testnet-clay',
      connectNetwork: 'testnet-clay',
    }).then(async (did: SelfID) => {
      setDid(did.id)
      saveLocalStorage(did.id)
      const ming = await did.get('basicProfile')
      console.log(ming)
    })
    //await self.set('basicProfile', { name: 'Ming-der Wang' })
  }
  function saveLocalStorage(x: string) {
    localStorage.mydid = x;
  }
  
  function getLocalStorage(): string {
    const x = localStorage.getItem("mydid")
    return x? x: ''
  }
  
  useEffect(() => {
    console.log('onStart')
    setDid(getLocalStorage())
    buttonHandler() // if necessary
  }, [])

  return (
    <div className="primary">
      <Head>
        <title>SelfID-Login</title>
        <meta name="description" content="Sefl.ID login FLuence Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button
        onClick={buttonHandler}
        className="btn btn-secondary rounded-full"
      >
        get my did info
      </button>
      <p>{did}</p>
      <footer className="primary">
        <a
          href="https://muzamint.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by MS-hack
        </a>
        <p />
        <a
          href="https://dev.uniresolver.io/"
          target="did uniresolver"
          rel="noopener noreferrer"
        >
          📡 DID Universal Resolver {'<'}- click here
        </a>
        <p />
        <a
          href="https://clay.self.id/"
          target="did uniresolver"
          rel="noopener noreferrer"
        >
          🐝 Click here -{'>'} Be your self
        </a>
      </footer>
    </div>
  )
}

export default Home
