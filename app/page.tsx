import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <main className="flex flex-col items-center w-full grow">
        <div> Welcome to Proper View</div>
      </main>
      <footer className="flex flex-wrap items-center justify-center">
        <div>This site built for TimelyCare's technical assessment</div>
      </footer>
    </div>
  );
}
