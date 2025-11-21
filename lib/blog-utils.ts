import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

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

// Ensure blog directory exists
function ensureBlogDirectory() {
    if (!fs.existsSync(postsDirectory)) {
        fs.mkdirSync(postsDirectory, { recursive: true });
    }
}

// Get all blog posts (sorted by date, newest first)
export function getAllPosts(): BlogPostMetadata[] {
    ensureBlogDirectory();

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Untitled',
                date: data.date || new Date().toISOString().split('T')[0],
                excerpt: data.excerpt || '',
                tags: data.tags || [],
            };
        });

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

// Get single post by slug
export function getPostBySlug(slug: string): BlogPost | null {
    ensureBlogDirectory();

    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || 'Untitled',
            date: data.date || new Date().toISOString().split('T')[0],
            excerpt: data.excerpt || '',
            content,
            tags: data.tags || [],
        };
    } catch (error) {
        return null;
    }
}

// Create or update a post
export function savePost(slug: string, post: Omit<BlogPost, 'slug'>): void {
    ensureBlogDirectory();

    const { content, ...metadata } = post;
    const fileContent = matter.stringify(content, metadata);
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    fs.writeFileSync(fullPath, fileContent, 'utf8');
}

// Delete a post
export function deletePost(slug: string): boolean {
    ensureBlogDirectory();

    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
        fs.unlinkSync(fullPath);
        return true;
    } catch (error) {
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
