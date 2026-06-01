import Link from 'next/link';

export default function CameraProjectPage() {
    return (
        <main className="min-h-screen flex flex-col px-6 py-16 md:py-24">
            <div className="flex-grow max-w-3xl mx-auto w-full">
                <div className="mb-16">
                    <Link
                        href="/project"
                        className="inline-block mb-8 text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                    >
                        ← Projects
                    </Link>

                    <h1 className="text-4xl font-semibold text-[#0a0a0a] border-b border-[#e5e7eb] pb-8">
                        Camera Project
                    </h1>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-base font-medium text-[#6b7280] uppercase tracking-widest mb-4">About</h2>
                        <p className="text-base text-[#374151] leading-relaxed">
                            Camera is a simple yet powerful web camera app. It lets you take photos directly in the browser,
                            add text annotations, and save them to your device — no installation required.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-medium text-[#6b7280] uppercase tracking-widest mb-4">Features</h2>
                        <ul className="space-y-3 text-base text-[#374151]">
                            <li>Live camera preview</li>
                            <li>Add text annotations to photos</li>
                            <li>Save annotated photos to your device</li>
                            <li>Retake photos easily</li>
                            <li>Clean and intuitive interface</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-base font-medium text-[#6b7280] uppercase tracking-widest mb-4">Technical Details</h2>
                        <ul className="space-y-3 text-base text-[#374151]">
                            <li>Pure frontend — no backend server needed</li>
                            <li>Image processing via HTML5 Canvas API</li>
                            <li>Responsive design, mobile-friendly</li>
                            <li>Privacy-first: all processing done locally</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-base font-medium text-[#6b7280] uppercase tracking-widest mb-4">Try It</h2>
                        <a
                            href="http://cam.soupeed.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#0a0a0a] text-white px-6 py-3 text-sm font-medium hover:bg-[#374151] transition-colors"
                        >
                            Open Camera App →
                        </a>
                    </section>
                </div>
            </div>

            <footer className="max-w-3xl mx-auto w-full mt-24 border-t border-[#e5e7eb] pt-8">
                <p className="text-sm text-[#6b7280]">info@soupeed.com</p>
            </footer>
        </main>
    );
}
