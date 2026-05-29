import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
    // Default config works for SSR + API routes + middleware.
    // (You can later add KV/R2-backed incremental cache here if you add ISR pages.)
});
