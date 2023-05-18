/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    i18n: {
        locales: ['ar', 'en'],
        defaultLocale: 'ar',
        localeDetection: false
    }
}

module.exports = nextConfig
