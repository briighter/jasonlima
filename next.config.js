/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // For username.github.io repos, basePath should be empty string.
  // For project repos (e.g. username.github.io/my-project), set NEXT_PUBLIC_BASE_PATH=/my-project
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Prevents 404s on GitHub Pages
}

module.exports = nextConfig
