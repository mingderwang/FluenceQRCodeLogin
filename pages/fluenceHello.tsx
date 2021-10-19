import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { EthereumAuthProvider, SelfID } from '@self.id/web'
import { sayHello, registerHelloPeer } from '../_aqua/getting-started'
import { Fluence, PeerStatus } from '@fluencelabs/fluence'
import { krasnodar } from '@fluencelabs/fluence-network-environment'
declare let window: any
const relayNodes = [krasnodar[0], krasnodar[1], krasnodar[2]]

const Home: NextPage = () => {
  const [did, setDid] = useState('')
  const [myName, setMyName] = useState('')
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [helloMessage, setHelloMessage] = useState<string | null>(null)
  const [peerIdInput, setPeerIdInput] = useState<string>('')
  const [relayPeerIdInput, setRelayPeerIdInput] = useState<string>('')
  const [peerId, setPeerId] = useState<string | null>('')
  const [relayPeerId, setRelayPeerId] = useState<string | null>('')

  const connect = async (relayPeerId: string) => {
    try {
      await Fluence.start({ connectTo: relayPeerId })
      setIsConnected(true)
      // Register handler for this call in aqua:
      // HelloPeer.hello(%init_peer_id%)
      registerHelloPeer({
        hello: (from: string) => {
          setHelloMessage(`Hello from: ${myName}, DID: ${did}\n`)
          return `Hello back to you ${myName}, DID: ${did}, \n`
        },
      })
      const x: PeerStatus = Fluence.getStatus()
      console.log('status', x)
      setRelayPeerId(x.relayPeerId)
      setPeerId(x.peerId)
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
    console.log('res', res)
    setHelloMessage(res)
  }

  useEffect(() => {
    console.log('onStart')
    const x: string | null = localStorage.getItem('mydid')
    setDid(x ? x : '')
    if (typeof x === 'undefined') {
      alert('please login with Self.ID first.')
    }
    const myname = localStorage.getItem('myName')
    setMyName(myname ? myname : '')
  }, [])

  return (
    <div className="primary">
      <Head>
        <title>SelfID-Login</title>
        <meta name="description" content="Sefl.ID login FLuence Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{myName}</h1>
      <h1>my DID: {did}</h1>
      <h1 className="mb-5 text-5xl font-bold">Pick a relay</h1>
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
        <label className="label bold h-24">Target peer id</label>
        <input
          className="input input-lg"
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
            🐝 Click here -{'>'} Be your self
          </a>
        </div>

        {isConnected ? (
          <>
            <h1>
              connected, peer Id:
              {peerId}
            </h1>
            <h1>
              relay peer Id:
              {relayPeerId}
            </h1>
          </>
        ) : (
          <h1>disconnected</h1>
        )}
        <h1>{helloMessage}</h1>
      </footer>
    </div>
  )
}

export default Home
