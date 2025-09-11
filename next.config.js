/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        outputFileTracingRoot: undefined,
    },
    // Optimisations pour le chargement CSS et les performances
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Configuration pour les iframes et la sécurité
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'ALLOWALL',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-ancestors *;",
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
    // Optimisation des images
    images: {
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 60,
    },
};

module.exports = nextConfig;
