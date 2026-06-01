import ThreejsCube from "./components/3dcube/3dcube";
import SelectionOptions from "./components/SelectionOptions";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col px-6 py-16 md:py-24 max-w-3xl mx-auto">
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row md:items-start gap-16">
          <div className="flex flex-col gap-12">
            <div>
              <h1 className="text-4xl font-semibold text-[#0a0a0a]">
                Soupeed
                <span className="text-base font-normal text-[#6b7280] ml-3"> Design & engineering</span>
              </h1>
            </div>
            <SelectionOptions />
          </div>
          <div className="flex-grow min-w-0">
            <ThreejsCube />
          </div>
        </div>
      </div>
      <footer className="mt-24 border-t border-[#e5e7eb] pt-8">
        <p className="text-sm text-[#6b7280]">info@soupeed.com</p>
      </footer>
    </main>
  );
}
