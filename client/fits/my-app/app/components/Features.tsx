import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  { icon: '💬', title: '24/7 Support', description: 'Round the clock assistance' },
  { icon: '🔊', title: 'Premium Quality', description: 'Top-notch products' },
  { icon: '💎', title: 'Best Deals', description: 'Competitive pricing' },
  { icon: '🛡️', title: 'Secure Payment', description: 'Safe transactions' },
  { icon: '🚚', title: 'Fast Delivery', description: 'Quick shipping' },
  { icon: '↩️', title: 'Easy Returns', description: 'Hassle-free returns' },
];

export const Features: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-4xl flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Center Earbuds */}
        <div className="flex justify-center">
          <div className="text-8xl">🎧</div>
        </div>
      </div>
    </section>
  );
};

