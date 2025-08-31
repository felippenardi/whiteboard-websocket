# Whiteboard WebSocket (Hocuspocus) Server

A minimal Hocuspocus (Yjs) WebSocket server suitable for local use and Fly.io deployment.

## Local development

- Requirements: Node 18+
- Install and run:

```
npm install
npm run dev
```

The server listens on `ws://0.0.0.0:1234` by default. Override with env:

- `HP_HOST` (default `0.0.0.0`)
- `HP_PORT` or `PORT` (default `1234`)

## Fly.io deployment

1. Install Fly CLI and auth:

```
brew install flyctl   # macOS
fly auth login
```

2. Set a unique app name and region in `fly.toml` (field `app`).

3. Launch and deploy:

```
cd whiteboard-websocket
fly launch --no-deploy   # or edit existing fly.toml
fly deploy
```

4. After deploy, you’ll have a public WSS endpoint like:

```
wss://<your-app>.fly.dev
```

Configure your whiteboard client to use this URL via `NEXT_PUBLIC_YWS_URL`.

## Notes

- This server exposes only the Hocuspocus/Yjs WebSocket endpoint. There’s no HTTP route besides the upgrade.
- For production, consider persistence and auth; Hocuspocus supports hooks to validate access.

# whiteboard-websocket
