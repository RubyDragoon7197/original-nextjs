"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-transparent py-3 border-b border-gray-700 flex justify-center">
      <div className="flex justify-between w-4/5 max-w-4xl">
        <Link
          href="/original1"
          className={`text-lg font-semibold transition-colors duration-300 ${
            pathname === "/original1"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Original1
        </Link>
        <Link
          href="/original2"
          className={`text-lg font-semibold transition-colors duration-300 ${
            pathname === "/original2"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Original2
        </Link>
        <Link
          href="/original3"
          className={`text-lg font-semibold transition-colors duration-300 ${
            pathname === "/original3"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Original3
        </Link>
      </div>
    </nav>
  );
}
