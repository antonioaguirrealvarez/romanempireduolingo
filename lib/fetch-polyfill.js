import 'whatwg-fetch'

if (!globalThis.fetch) {
  globalThis.fetch = window.fetch
}
