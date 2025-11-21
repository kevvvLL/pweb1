import { sql } from '@vercel/postgres';

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
        const { rows } = await sql`
            SELECT slug, title, date, excerpt, tags 
            FROM posts 
            ORDER BY date DESC
        `;
        return rows.map(row => ({
            slug: row.slug,
            title: row.title,
            date: row.date,
            excerpt: row.excerpt,
            tags: row.tags || [],
        }));
    } catch (error) {
        // If table doesn't exist or other error, return empty array
        console.error('Database error:', error);
        return [];
    }
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const { rows } = await sql`
            SELECT * FROM posts WHERE slug = ${slug} LIMIT 1
        `;

        if (rows.length === 0) return null;

        const row = rows[0];
        return {
            slug: row.slug,
            title: row.title,
            date: row.date,
            excerpt: row.excerpt,
            content: row.content,
            tags: row.tags || [],
        };
    } catch (error) {
        console.error('Database error:', error);
        return null;
    }
}

// Create or update a post
export async function savePost(slug: string, post: Omit<BlogPost, 'slug'>): Promise<void> {
    const { title, date, excerpt, content, tags } = post;

    // Check if post exists
    const existing = await getPostBySlug(slug);

    if (existing) {
        await sql`
            UPDATE posts 
            SET title = ${title}, date = ${date}, excerpt = ${excerpt}, content = ${content}, tags = ${tags as any}
            WHERE slug = ${slug}
        `;
    } else {
        await sql`
            INSERT INTO posts (slug, title, date, excerpt, content, tags)
            VALUES (${slug}, ${title}, ${date}, ${excerpt}, ${content}, ${tags as any})
        `;
    }
}

// Delete a post
export async function deletePost(slug: string): Promise<boolean> {
    try {
        const result = await sql`DELETE FROM posts WHERE slug = ${slug}`;
        return (result.rowCount ?? 0) > 0;
    } catch (error) {
        console.error('Database error:', error);
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
