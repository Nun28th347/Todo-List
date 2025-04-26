/** @type {import('next').NextConfig} */
/* const nextConfig = {}; */


/* export default nextConfig; */
/* export default {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: false, // หรือ true หากคุณต้องการให้ redirect ถาวร
      },
    ];
  },
};
 */


import withPWA from 'next-pwa';

/** PWA Options */
const pwaOptions = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
};

/** Base Next.js config (สิ่งที่ next.js เข้าใจ) */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: false,
      },
    ];
  },
};

// ✅ รวม config แบบถูกต้อง โดยให้ PWA wrap nextConfig
export default withPWA(pwaOptions)(nextConfig);

