export default function CameraProjectPage() {
    return (
        <main className="flex flex-col min-h-screen p-6">
            <div className="flex-grow max-w-4xl mx-auto">
                <h1 className="font-sans text-4xl font-bold text-white bg-gray-800 px-4 py-2 rounded inline-block mb-6">
                    Camera Project
                </h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">About</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Camera is a simple yet powerful web camera app. It lets you take photos directly in the browser,
                            add text annotations, and save them to your device — no installation required.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Features</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>📷 Live camera preview</li>
                            <li>✏️ Add text annotations to photos</li>
                            <li>💾 Save annotated photos to your device</li>
                            <li>🔄 Retake photos easily</li>
                            <li>🎨 Clean and intuitive interface</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Technical Details</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Pure frontend — no backend server needed</li>
                            <li>Image processing via HTML5 Canvas API</li>
                            <li>Responsive design, mobile-friendly</li>
                            <li>Privacy-first: all processing done locally</li>
                        </ul>
                    </section>

                    <section className="mt-8">
                        <h2 className="text-2xl font-semibold mb-3">Try it out</h2>
                        <p className="text-gray-700 mb-4">
                            Click the link below to open the Camera app:
                        </p>
                        <a
                            href="http://cam.soupeed.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                        >
                            Open Camera App →
                        </a>
                    </section>

                    <section className="mt-8 pt-6 border-t border-gray-200">
                        <a
                            href="/project"
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            ← Back to Projects
                        </a>
                    </section>
                </div>
            </div>

            <footer className="w-full mt-8">
                <p className="text-gray-600 text-center">info@soupeed.com</p>
            </footer>
        </main>
    );
}