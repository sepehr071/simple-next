'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="#home" className="h-10">
          <Image
            src="/logo.svg"
            alt="AI Innovations Inc."
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="#services" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
            Services
          </Link>
          <Link href="#about" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors">
            Contact
          </Link>
        </div>
        <button
          className="md:hidden text-primary-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
          <Link href="#services" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500" onClick={() => setIsMenuOpen(false)}>
            Services
          </Link>
          <Link href="#about" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link href="#contact" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-500" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}