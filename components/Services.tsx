export default function Services() {
  const services = [
    {
      title: 'AI Consulting',
      description: 'Expert guidance to integrate AI into your business strategy and operations.',
      icon: '🧠',
    },
    {
      title: 'Custom ML Models',
      description: 'Tailored machine learning models built to solve your specific challenges.',
      icon: '🤖',
    },
    {
      title: 'Data Analytics',
      description: 'Transform raw data into actionable insights with advanced analytics.',
      icon: '📊',
    },
    {
      title: 'Chatbot Development',
      description: 'Intelligent chatbots for seamless customer interactions and support.',
      icon: '💬',
    },
    {
      title: 'Predictive AI',
      description: 'Forecast trends and outcomes using predictive algorithms and AI.',
      icon: '🔮',
    },
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Our AI Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}