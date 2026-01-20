/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' }
        ]
      }
    ];
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/gallery.html', destination: '/gallery', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/levels.html', destination: '/levels', permanent: true },
      { source: '/crew-pilot.html', destination: '/crew-pilot', permanent: true },
      { source: '/cam.html', destination: '/cam', permanent: true },
      { source: '/camdoc.html', destination: '/camdoc', permanent: true },
      { source: '/why.html', destination: '/why', permanent: true },
      { source: '/login.html', destination: '/', permanent: true }
    ];
  }
};

export default nextConfig;

