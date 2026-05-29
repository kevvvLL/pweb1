import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // OpenNext handles the build output for Cloudflare Workers automatically.
    // (No need for `output: 'standalone'` here — the adapter sets it internally.)
};

export default nextConfig;

// Enable calling `getCloudflareContext()` during `next dev`
// so KV / env bindings work locally.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
