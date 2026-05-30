interface KVNamespace {
    get(key: string, type: 'json'): Promise<unknown>;
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
    list(options?: { prefix?: string }): Promise<{ keys: { name: string }[] }>;
}

interface CloudflareEnv {
    BLOG_KV: KVNamespace;
    ADMIN_PASSWORD_HASH: string;
    SESSION_SECRET: string;
}