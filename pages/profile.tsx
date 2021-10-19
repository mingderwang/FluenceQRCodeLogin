import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { EthereumAuthProvider, SelfID } from '@self.id/web'
declare let window: any
const Profile: NextPage = () => {
  const [did, setDid] = useState('')
  const [myName, setMyName] = useState('')

  const saveMyName = async () => {
    console.log('onClick')
    const addresses = await window.ethereum.enable()
    // "local" | "mainnet-gateway" | "testnet-clay" | "testnet-clay-gateway"
    // https://developers.ceramic.network/learn/networks/
    const self = await SelfID.authenticate({
      authProvider: new EthereumAuthProvider(window.ethereum, addresses[0]),
      ceramic: 'testnet-clay',
      connectNetwork: 'testnet-clay',
    })
    await self.set('basicProfile', { name: myName })
    saveLocalStorageMyName(myName)
  }

  function getLocalStorageDID(): string {
    const x = localStorage.getItem('mydid')
    return x ? x : ''
  }

  function saveLocalStorageMyName(x: string) {
    localStorage.myName = x
  }

  function getLocalStorageMyName(): string {
    const x = localStorage.getItem('myName')
    return x ? x : ''
  }

  useEffect(() => {
    console.log('onStart')
    setDid(getLocalStorageDID())
    setMyName(getLocalStorageMyName())
  }, [])

  return (
    <div className="primary">
      <Head>
        <title>SelfID-Login</title>
        <meta name="description" content="Sefl.ID login FLuence Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>My DID: {did}</p>
      <p>My name: {myName}</p>

      <div className="row">
        <label className="label bold h-24">Update My Name</label>
        <input
          className="input input-lg"
          type="text"
          onChange={(e) => setMyName(e.target.value)}
          value={myName}
        />
      </div>
      <div className="row">
        <button className="btn btn-hello" onClick={saveMyName}>
          save
        </button>
      </div>

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

export default Profile
