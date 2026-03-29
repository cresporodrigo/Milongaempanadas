// Base path: in production (GitHub Pages) it uses the repo name, locally it uses '/'
const base = import.meta.env.BASE_URL

export function getAssetPath(path) {
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${base}${cleanPath}`
}
