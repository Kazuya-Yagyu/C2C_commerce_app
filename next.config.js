/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: (() => {
      let compilerConfig = {
        // styledComponentsの有効化
        styledComponents: true,
      }
  
      return compilerConfig
    })(),
    // CORS対策
    async rewrites() {
      return [
        {
          // ex. /api/proxy
          source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match*`,
          // ex. http://localhost:8000
          destination: `${process.env.API_BASE_URL}/:match*`,
        },
      ]
    },
  }
  
  module.exports = nextConfig
  