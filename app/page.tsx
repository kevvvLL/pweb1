
import ThreejsCube from "./components/3dcube/3dcube";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-6">
      <div className="flex-grow">
        <h1 className="font-sans text-4xl font-bold text-white bg-gray-800 px-4 py-2 rounded inline-block mb-4">
          Soupeed
        </h1>
        <div className="mt-2">
          <ThreejsCube />
        </div>
      </div>
      <footer className="w-full">
        <p className="text-gray-600 text-right">soupeed.com</p>
      </footer>
    </main>
  );
}
