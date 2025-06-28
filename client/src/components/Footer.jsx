export default function Footer() {
  return (
    <footer className="bg-[#2563EB] text-white py-4 px-6 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-lg font-semibold">HireWave &copy; {new Date().getFullYear()}</div>
        <div className="flex gap-4 mt-2 md:mt-0 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/jobs" className="hover:underline">Jobs</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
