// Base path for assets in production (GitHub Pages)
export const BASE_PATH = import.meta.env.BASE_URL

// Helper function to get asset path
export const getAssetPath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${BASE_PATH}${cleanPath}`
}
