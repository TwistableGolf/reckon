/** @type {import('next').NextConfig} */
const nextConfig = {
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: 'http://api/:path*',
    //         },
    //     ];
    // }
    images:
    {
        dangerouslyAllowSVG: true,
        remotePatterns:[
            {
                protocol: "https",
                hostname: "api.dicebear.com"
                
            }
        ]
    }
};

export default nextConfig;
