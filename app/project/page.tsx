import Link from 'next/link';

export default function ProjectPage() {
  return (
    <main className="min-h-screen flex flex-col px-6 py-16 md:py-24">
      <div className="flex-grow max-w-3xl mx-auto w-full">
        <div className="mb-16">
          <Link
            href="/"
            className="inline-block mb-8 text-sm text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
          >
            ← Back
          </Link>

          <h1 className="text-4xl font-semibold text-[#0a0a0a] border-b border-[#e5e7eb] pb-8">
            Projects
          </h1>
        </div>

        <div className="divide-y divide-[#e5e7eb]">
          <div className="py-8 group">
            <Link href="/project/camera" className="block">
              <h2 className="text-xl font-medium text-[#0a0a0a] group-hover:text-[#6b7280] transition-colors mb-2">
                Camera App
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                A simple web camera app with photo capture, text annotation, and local saving.
              </p>
            </Link>
          </div>

          <div className="py-8 group">
            <Link href="/project/bridge-inspection" className="block">
              <h2 className="text-xl font-medium text-[#0a0a0a] group-hover:text-[#6b7280] transition-colors mb-2">
                Bridge Inspection Pipeline
              </h2>
              <p className="text-base text-[#6b7280] leading-relaxed">
                A Python pipeline that converts element-organized bridge inspection PDFs into
                station-organized field reports — one page per walking stop, ready for on-site use.
              </p>
            </Link>
          </div>
        </div>
      </div>

      <footer className="max-w-3xl mx-auto w-full mt-24 border-t border-[#e5e7eb] pt-8">
        <p className="text-sm text-[#6b7280]">info@soupeed.com</p>
      </footer>
    </main>
  );
}
