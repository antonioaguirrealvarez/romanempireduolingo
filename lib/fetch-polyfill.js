import 'whatwg-fetch'

if (typeof window !== 'undefined' && !window.fetch) {
  window.fetch = fetch
}
