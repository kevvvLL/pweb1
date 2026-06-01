'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/blog/admin');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-6 bg-white">
            <div className="w-full max-w-sm">
                <Link
                    href="/blog"
                    className="inline-block mb-12 text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                >
                    ← Back
                </Link>

                <div className="space-y-10">
                    <div>
                        <h1 className="text-3xl font-semibold text-[#0a0a0a] mb-1">Login</h1>
                        <p className="text-sm text-[#6b7280]">Admin access</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-0 py-3 border-b border-[#e5e7eb] focus:border-[#0a0a0a] outline-none transition-colors bg-transparent text-[#0a0a0a] placeholder:text-[#6b7280]"
                                required
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#374151] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
