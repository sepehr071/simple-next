import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-500 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">&copy; 2024 AI Innovations Inc. All rights reserved.</p>
        <div className="space-x-4 mb-4">
          <Link href="#services" className="hover:underline">Services</Link>
          <Link href="#about" className="hover:underline">About</Link>
          <Link href="#contact" className="hover:underline">Contact</Link>
        </div>
        <div className="space-x-4">
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">Twitter</a>
          <a href="#" className="hover:underline">GitHub</a>
        </div>
      </div>
    </footer>
  );
}