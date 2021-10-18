import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { EthereumAuthProvider, SelfID } from '@self.id/web'
import { sayHello, registerHelloPeer } from './_aqua/getting-started'
import { Fluence } from '@fluencelabs/fluence'
import { krasnodar } from '@fluencelabs/fluence-network-environment'
declare let window: any
const relayNodes = [krasnodar[0], krasnodar[1], krasnodar[2]]

const Home: NextPage = () => {
  const [did, setDid] = useState('')
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [helloMessage, setHelloMessage] = useState<string | null>(null)
  const [peerIdInput, setPeerIdInput] = useState<string>('')
  const [relayPeerIdInput, setRelayPeerIdInput] = useState<string>('')

  const connect = async (relayPeerId: string) => {
    try {
      await Fluence.start({ connectTo: relayPeerId })
      setIsConnected(true)
      // Register handler for this call in aqua:
      // HelloPeer.hello(%init_peer_id%)
      registerHelloPeer({
        hello: (from: string) => {
          setHelloMessage('Hello from: \n' + from)
          return 'Hello back to you, \n' + from
        },
      })
    } catch (err) {
      console.log('Peer initialization failed', err)
    }
  }

  const helloBtnOnClick = async () => {
    if (!Fluence.getStatus().isConnected) {
      return
    }
    // Using aqua is as easy as calling a javascript funсtion
    const res = await sayHello(peerIdInput, relayPeerIdInput)
    setHelloMessage(res)
  }
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
      const ming = await did.get('basicProfile')
      console.log(ming)
    })
    //await self.set('basicProfile', { name: 'Ming-der Wang' })
  }
  useEffect(() => {
    console.log('onStart')
  }, [])

  return (
    <div className="primary">
      <Head>
        <title>SelfID-Login</title>
        <meta name="description" content="Sefl.ID login FLuence Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>Pick a relay</h2>
      <ul>
        {relayNodes.map((x) => (
          <li key={x.peerId}>
            <span className="mono">{x.peerId}</span>
            <button className="btn" onClick={() => connect(x.multiaddr)}>
              Connect
            </button>
          </li>
        ))}
      </ul>

      <div className="row">
        <label className="label bold">Target peer id</label>
        <input
          className="input"
          type="text"
          onChange={(e) => setPeerIdInput(e.target.value)}
          value={peerIdInput}
        />
      </div>
      <div className="row">
        <label className="label bold">Target relay</label>
        <input
          className="input"
          type="text"
          onChange={(e) => setRelayPeerIdInput(e.target.value)}
          value={relayPeerIdInput}
        />
      </div>
      <div className="row">
        <button className="btn btn-hello" onClick={helloBtnOnClick}>
          say hello
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
        <div>
          <a
            href="https://clay.self.id/"
            target="did uniresolver"
            rel="noopener noreferrer"
          >
            click here -{'>'} Be your self
          </a>
        </div>
        <p>{isConnected}</p>
      </footer>
    </div>
  )
}

export default Home
