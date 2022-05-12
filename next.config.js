/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret:
      'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
  },

  publicRuntimeConfig: {}
};

module.exports = nextConfig;
