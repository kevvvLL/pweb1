import { getCloudflareContext } from '@opennextjs/cloudflare';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    tags?: string[];
}

export interface BlogPostMetadata {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags?: string[];
}

const PREFIX = 'posts/';

// Get the KV namespace bound as BLOG_KV (configured in wrangler.jsonc)
function getKV() {
    const { env } = getCloudflareContext();
    if (!env.BLOG_KV) {
        throw new Error('BLOG_KV binding not found. Did you configure it in wrangler.jsonc?');
    }
    return env.BLOG_KV;
}

// Get all blog posts (sorted by date, newest first)
export async function getAllPosts(): Promise<BlogPostMetadata[]> {
    try {
        const kv = getKV();
        const { keys } = await kv.list({ prefix: PREFIX });

        const posts = await Promise.all(
            keys.map(async ({ name }: { name: string }) => {
                const post = (await kv.get(name, 'json')) as BlogPost | null;
                if (!post) return null;
                return {
                    slug: post.slug,
                    title: post.title,
                    date: post.date,
                    excerpt: post.excerpt,
                    tags: post.tags || [],
                };
            })
        );

        return (posts.filter(Boolean) as BlogPostMetadata[]).sort((a, b) => {
            if (a.date < b.date) return 1;
            return -1;
        });
    } catch (error) {
        console.error('KV error:', error);
        return [];
    }
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const kv = getKV();
        const post = (await kv.get(`${PREFIX}${slug}`, 'json')) as BlogPost | null;
        return post;
    } catch (error) {
        console.error('KV error:', error);
        return null;
    }
}

// Create or update a post
export async function savePost(slug: string, post: Omit<BlogPost, 'slug'>): Promise<void> {
    const kv = getKV();
    const postData = { slug, ...post };
    await kv.put(`${PREFIX}${slug}`, JSON.stringify(postData));
}

// Delete a post
export async function deletePost(slug: string): Promise<boolean> {
    try {
        const kv = getKV();
        const existing = await kv.get(`${PREFIX}${slug}`);
        if (existing === null) return false;
        await kv.delete(`${PREFIX}${slug}`);
        return true;
    } catch (error) {
        console.error('KV error:', error);
        return false;
    }
}

// Generate slug from title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
