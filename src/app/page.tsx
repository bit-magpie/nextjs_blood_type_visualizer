'use client';

import BloodTypeVisualizer from '../components/BloodTypeVisualizer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-red-700 mb-4">
            Blood Type Compatibility
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore blood type compatibility between donors and receivers with interactive animations.
            Learn who can donate to whom and save lives through knowledge.
          </p>
        </div>
        <BloodTypeVisualizer />
      </main>
    </div>
  );
}
