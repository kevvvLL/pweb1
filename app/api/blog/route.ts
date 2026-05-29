export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAllPosts, getPostBySlug, savePost, deletePost, generateSlug } from '@/lib/blog-utils';

// GET - Get all posts or single post by slug
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
        const post = await getPostBySlug(slug);
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json(post);
    }

    const posts = await getAllPosts();
    return NextResponse.json(posts);
}

// POST - Create new post (admin only)
export async function POST(request: NextRequest) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { title, content, excerpt, tags } = await request.json();

        if (!title || !content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        const slug = generateSlug(title);
        const date = new Date().toISOString().split('T')[0];

        await savePost(slug, {
            title,
            content,
            excerpt: excerpt || content.substring(0, 150) + '...',
            date,
            tags: tags || [],
        });

        return NextResponse.json({ success: true, slug });
    } catch (error) {
        console.error('Create post error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update post (admin only)
export async function PUT(request: NextRequest) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { slug, title, content, excerpt, tags } = await request.json();

        if (!slug || !title || !content) {
            return NextResponse.json(
                { error: 'Slug, title, and content are required' },
                { status: 400 }
            );
        }

        const date = new Date().toISOString().split('T')[0];

        await savePost(slug, {
            title,
            content,
            excerpt: excerpt || content.substring(0, 150) + '...',
            date,
            tags: tags || [],
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Update post error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE - Delete post (admin only)
export async function DELETE(request: NextRequest) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return NextResponse.json(
                { error: 'Slug is required' },
                { status: 400 }
            );
        }

        const success = await deletePost(slug);

        if (!success) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete post error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
