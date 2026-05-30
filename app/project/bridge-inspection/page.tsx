export default function BridgeInspectionPage() {
    return (
        <main className="flex flex-col min-h-screen p-6">
            <div className="flex-grow max-w-4xl mx-auto">
                <h1 className="font-sans text-4xl font-bold text-white bg-gray-800 px-4 py-2 rounded inline-block mb-6">
                    Bridge Inspection Pipeline
                </h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3">About</h2>
                        <p className="text-gray-700 leading-relaxed">
                            A Python pipeline that takes an element-organized bridge inspection PDF
                            (the standard FHWA/AASHTO format) and reorganizes it into a station-organized
                            field report — one page per walking stop along the bridge, with every relevant
                            element grouped together.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">The Problem It Solves</h2>
                        <p className="text-gray-700 leading-relaxed">
                            The default element-organized format is great for reporting but terrible for
                            field inspection. Standing at Pier 2, an inspector shouldn&apos;t have to flip
                            between four separate element sections to see everything about it. This tool
                            inverts the organization — same data, different axis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Features</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>🗂️ Reorganizes element-based PDFs into one page per physical station</li>
                            <li>🎨 Color-coded condition state highlighting (green → red)</li>
                            <li>✍️ Blank field notes lines for handwriting on-site</li>
                            <li>🧠 Interactive browser UI to classify unknown elements</li>
                            <li>📚 Learns from your classifications over time via config.yaml</li>
                            <li>🔒 Fully local — no data leaves your machine</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-gray-700 text-sm font-mono">
                            <p>① extract.py — PDF → element data (JSON)</p>
                            <p>② classify.py — 4-layer classification cascade</p>
                            <p>③ review_server.py — browser UI for uncertain elements</p>
                            <p>④ regroup.py — pivot to physical stations</p>
                            <p>⑤ render.py — generate field-ready PDF</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Tech Stack</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Python 3.10+</li>
                            <li>pdfplumber — position-aware PDF table extraction</li>
                            <li>reportlab — PDF generation</li>
                            <li>Built-in http.server — no Flask or Node required</li>
                            <li>Vanilla JS review UI — no framework dependencies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3">Quick Start</h2>
                        <div className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm font-mono space-y-1">
                            <p>pip install -r requirements.txt</p>
                            <p>python pipeline.py</p>
                            <p className="text-gray-500"># or on your own report:</p>
                            <p>python pipeline.py your_report.pdf field_report.pdf</p>
                        </div>
                    </section>

                    <section className="mt-8">
                        <a
                            href="https://github.com/kevvvLL/bridge-inspection-field-report-pipeline"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                        >
                            View on GitHub →
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