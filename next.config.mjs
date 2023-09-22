/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ["flagsapi.com", "lh3.googleusercontent.com"]
    }
};
export default config;
