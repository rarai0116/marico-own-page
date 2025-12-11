/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
      ...(process.env.WORDPRESS_ORIGIN_DOMAIN
        ? [process.env.WORDPRESS_ORIGIN_DOMAIN]
        : []),
        ],
    },
};

export default nextConfig;
