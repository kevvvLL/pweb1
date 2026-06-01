import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // OpenNext handles the build output for Cloudflare Workers automatically.
    // (No need for `output: 'standalone'` here — the adapter sets it internally.)
};

export default nextConfig;

// Cloudflare KV bindings for local dev — requires `wrangler login` + remote KV access.
// Uncomment when working with blog data locally:
// import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
// initOpenNextCloudflareForDev();
