import Link from 'next/link';

export default function ProjectPage() {
  return (
    <main className="flex flex-col min-h-screen p-6">
      <div className="flex-grow max-w-4xl mx-auto">
        <h1 className="font-sans text-4xl font-bold text-white bg-gray-800 px-4 py-2 rounded inline-block mb-6">
          Projects
        </h1>

        <div className="space-y-4">
          <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href="/project/camera" className="text-gray-800 hover:text-gray-600">
                Camera App
              </Link>
            </h2>
            <p className="text-gray-600 mb-3">
              A simple web camera app with photo capture, text annotation, and local saving.
            </p>
            <Link href="/project/camera" className="text-gray-800 hover:text-gray-600 font-medium">
              Learn more →
            </Link>
          </div>

          <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href="/project/bridge-inspection" className="text-gray-800 hover:text-gray-600">
                Bridge Inspection Pipeline
              </Link>
            </h2>
            <p className="text-gray-600 mb-3">
              A Python pipeline that converts element-organized bridge inspection PDFs into
              station-organized field reports — one page per walking stop, ready for on-site use.
            </p>
            <Link href="/project/bridge-inspection" className="text-gray-800 hover:text-gray-600 font-medium">
              Learn more →
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full mt-8">
        <p className="text-gray-600 text-center">info@soupeed.com</p>
      </footer>
    </main>
  );
}