/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: no `output: 'export'` — API routes (/api/contact, /api/subscribe)
  // need a server. Deploys target Vercel, not GitHub Pages.
  // For project-subpath deploys, set NEXT_PUBLIC_BASE_PATH=/my-app
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
}

module.exports = nextConfig
