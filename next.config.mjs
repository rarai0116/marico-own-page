
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', process.env.WORDPRESS_ORIGIN_DOMAIN], // ここに許可するホスト名を追加
    },
};

export default nextConfig;
