//server.js:
import { Server } from '@hocuspocus/server'

const host = process.env.HP_HOST || '0.0.0.0'
const port = Number(process.env.PORT || process.env.HP_PORT || 1234)

const server = Server.configure({
  address: host,
  port,
  // Basic hooks for observability
  onConnect(data) {
    try { console.log('[hocuspocus] connect', data?.document?.name || '') } catch {}
  },
  onDisconnect(data) {
    try { console.log('[hocuspocus] disconnect', data?.document?.name || '') } catch {}
  },
  onError(error) {
    console.error('[hocuspocus] error', error?.message || error)
  },

  // Stateless message relay for WebRTC signaling.
  // Send payloads like:
  //   { kind: 'webrtc', type: 'offer' | 'answer' | 'ice', from: 'peerIdA', to: 'peerIdB' | null, data: {...} }
  // Clients in the same document receive these and decide whether to handle based on "to"/"from".
  onStateless({ document, documentName, payload }) {
    try {
      // Optional: filter only our signaling messages
      const msg = typeof payload === 'string' ? JSON.parse(payload) : payload
      if (!msg || msg.kind !== 'webrtc') return
      // Re-broadcast the original payload (string) to all peers of this document
      document.broadcastStateless(payload)
    } catch (err) {
      console.error('[hocuspocus] stateless relay error', err?.message || err)
    }
  }
})

server.listen().then(() => {
  console.log(`[hocuspocus] listening on ws://${host}:${port}`)
}).catch((err) => {
  console.error('[hocuspocus] failed to start:', err)
  process.exit(1)
})
