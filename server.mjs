import { Server } from '@hocuspocus/server'

const host = process.env.HP_HOST || '0.0.0.0'
const port = Number(process.env.HP_PORT || process.env.PORT || 1234)

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
})

server.listen().then(() => {
  console.log(`[hocuspocus] listening on ws://${host}:${port}`)
}).catch((err) => {
  console.error('[hocuspocus] failed to start:', err)
  process.exit(1)
})

