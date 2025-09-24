import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-gray-800 dark:from-primary-500 dark:to-gray-900 text-white px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Innovate with AI
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-gray-300">
          AI Innovations Inc. delivers cutting-edge AI solutions to transform your business. From custom ML models to predictive analytics, we empower innovation.
        </p>
        <Link
          href="#contact"
          className="bg-white dark:bg-gray-800 text-primary-500 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}