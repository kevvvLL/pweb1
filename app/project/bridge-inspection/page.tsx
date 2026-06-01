import Link from 'next/link';

export default function BridgeInspectionPage() {
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
                        Bridge Inspection Pipeline
                    </h1>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-base font-medium text-[#6b7280] uppercase tracking-widest mb-4">About</h2>
                        <p className="text-base text-[#374151] leading-relaxed">
                            A Python pipeline that takes an element-organized bridge inspection PDF
                            (the standard FHWA/AASHTO format) and reorganizes it into a station-organized
                            field report — one page per walking stop along the bridge, with every relevant
                            element grouped together.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-medium text-[#6b7280] uppercase tracking-widest mb-4">The Problem It Solves</h2>
                        <p className="text-base text-[#374151] leading-relaxed">
                            The default element-organized format is great for reporting but terrible for
                            field inspection. Standing at Pier 2, an inspector shouldn&apos;t have to flip
                            between four separate element sections to see everything about it. This tool
                            inverts the organization — same data, different axis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-base font-medium text-[#6b7280] uppercase tracking-widest mb-4">Features</h2>
                        <ul className="space-y-3 text-base text-[#374151]">
                            <li>Reorganizes element-based PDFs into one page per physical station</li>
                            <li>Color-coded condition state highlighting (green → red)</li>
                            <li>Blank field notes lines for handwriting on-site</li>
                            <li>Interactive browser UI to classify unknown elements</li>
                            <li>Learns from your classifications over time via config.yaml</li>
                            <li>Fully local — no data leaves your machine</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-base font-medium text-[#6b7280] uppercase tracking-widest mb-4">How It Works</h2>
                        <div className="bg-[#fafafa] border border-[#e5e7eb] p-6 space-y-2 text-sm font-mono text-[#374151]">
                            <p>① extract.py — PDF → element data (JSON)</p>
                            <p>② classify.py — 4-layer classification cascade</p>
                            <p>③ review_server.py — browser UI for uncertain elements</p>
                            <p>④ regroup.py — pivot to physical stations</p>
                            <p>⑤ render.py — generate field-ready PDF</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-base font-medium text-[#6b7280] uppercase tracking-widest mb-4">Tech Stack</h2>
                        <ul className="space-y-3 text-base text-[#374151]">
                            <li>Python 3.10+</li>
                            <li>pdfplumber — position-aware PDF table extraction</li>
                            <li>reportlab — PDF generation</li>
                            <li>Built-in http.server — no Flask or Node required</li>
                            <li>Vanilla JS review UI — no framework dependencies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-base font-medium text-[#6b7280] uppercase tracking-widest mb-4">Quick Start</h2>
                        <div className="bg-[#0a0a0a] text-[#e5e7eb] p-6 text-sm font-mono space-y-1">
                            <p>pip install -r requirements.txt</p>
                            <p>python pipeline.py</p>
                            <p className="text-[#6b7280]"># or on your own report:</p>
                            <p>python pipeline.py your_report.pdf field_report.pdf</p>
                        </div>
                    </section>

                    <section>
                        <a
                            href="https://github.com/kevvvLL/bridge-inspection-field-report-pipeline"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#0a0a0a] text-white px-6 py-3 text-sm font-medium hover:bg-[#374151] transition-colors"
                        >
                            View on GitHub →
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
