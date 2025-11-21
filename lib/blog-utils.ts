import { list, put, del } from '@vercel/blob';

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

// Get all blog posts (sorted by date, newest first)
export async function getAllPosts(): Promise<BlogPostMetadata[]> {
    try {
        // List all blobs in the 'posts/' prefix
        const { blobs } = await list({ prefix: 'posts/' });

        // Fetch all posts in parallel
        const posts = await Promise.all(
            blobs.map(async (blob) => {
                const res = await fetch(blob.url);
                const post = await res.json();
                return {
                    slug: post.slug,
                    title: post.title,
                    date: post.date,
                    excerpt: post.excerpt,
                    tags: post.tags || [],
                };
            })
        );

        // Sort posts by date (newest first)
        return posts.sort((a, b) => {
            if (a.date < b.date) return 1;
            return -1;
        });
    } catch (error) {
        console.error('Blob error:', error);
        return [];
    }
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const { blobs } = await list({ prefix: `posts/${slug}.json` });

        if (blobs.length === 0) return null;

        // There should only be one match, but let's be safe
        const blobUrl = blobs[0].url;
        const res = await fetch(blobUrl);
        const post = await res.json();

        return post;
    } catch (error) {
        console.error('Blob error:', error);
        return null;
    }
}

// Create or update a post
export async function savePost(slug: string, post: Omit<BlogPost, 'slug'>): Promise<void> {
    const postData = { slug, ...post };

    // Save as JSON file
    await put(`posts/${slug}.json`, JSON.stringify(postData), {
        access: 'public',
        addRandomSuffix: false, // Overwrite existing file
    });
}

// Delete a post
export async function deletePost(slug: string): Promise<boolean> {
    try {
        // Find the blob URL first
        const { blobs } = await list({ prefix: `posts/${slug}.json` });

        if (blobs.length === 0) return false;

        await del(blobs[0].url);
        return true;
    } catch (error) {
        console.error('Blob error:', error);
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
