import Link from "next/link";

export default function NotFound() {
  return (
    <div className="primary_bg h-screen flex flex-col justify-center items-center text-white text-center py-16 px-4">
      <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg mb-6">Sorry, we couldn't find the page you're looking for.</p>
      <Link
        href="/"
        className="bg-[#5a1919] text-white py-2 px-4 rounded-lg shadow hover:bg-[#752c2c] transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}
