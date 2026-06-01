export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllPosts } from '@/lib/blog-utils';
import { isAuthenticated } from '@/lib/auth';

export default async function BlogPage() {
  const posts = await getAllPosts();
  const authenticated = await isAuthenticated();

  return (
    <main className="min-h-screen px-6 py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <Link
            href="/"
            className="inline-block mb-8 text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
          >
            ← Back
          </Link>

          <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-8">
            <h1 className="text-4xl font-semibold text-[#0a0a0a]">Blog</h1>

            {authenticated && (
              <Link
                href="/blog/admin"
                className="text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="py-20">
            <p className="text-[#6b7280]">No posts yet.</p>
            {authenticated && (
              <Link
                href="/blog/admin/new"
                className="inline-block mt-4 text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
              >
                Write the first post →
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[#e5e7eb]">
            {posts.map((post) => (
              <article key={post.slug} className="group py-10">
                <Link href={`/blog/${post.slug}`}>
                  <div className="space-y-2">
                    <time className="text-sm text-[#6b7280]">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>

                    <h2 className="text-2xl font-medium text-[#0a0a0a] group-hover:text-[#6b7280] transition-colors">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-base text-[#6b7280] leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
