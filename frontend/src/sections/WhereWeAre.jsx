import React, { useState } from 'react';

const WhereWeAre = () => {
  const [activeLocation, setActiveLocation] = useState('calradia');

  const locations = {
    calradia: {
      name: 'Calradia',
      description: 'The main continent where our regiment operates, participating in major conflicts and territorial control.',
      details: [
        'Primary operational theater for Mount & Blade II: Bannerlord',
        'Multiple campaign theaters across different kingdoms',
        'Strategic positions in key settlements and fortifications',
        'Active participation in siege warfare and field battles'
      ],
      coordinates: 'Central Calradia',
      population: '500+ Active Members',
      status: 'Active Operations'
    },
    europe: {
      name: 'European Servers',
      description: 'Our primary gaming community spans across European timezone servers for optimal coordination.',
      details: [
        'Main server clusters in Central Europe',
        'Teamspeak and Discord voice communications',
        'Organized events during European prime time',
        'Multi-language support (Czech, Slovak, English)'
      ],
      coordinates: 'EU Central/Eastern',
      population: '300+ Online Members',
      status: 'Fully Operational'
    },
    events: {
      name: 'Event Locations',
      description: 'Special event locations where we host tournaments, training sessions, and community gatherings.',
      details: [
        'Weekly training grounds for new recruits',
        'Tournament arenas for competitive events',
        'Historical battle reenactments',
        'Community celebration venues'
      ],
      coordinates: 'Various Venues',
      population: '100-200 Event Participants',
      status: 'Scheduled Events'
    }
  };

  const currentLocation = locations[activeLocation];

  return (
    <section 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(/backgrounds/SpaceMap.png)` }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-white text-center mb-12 font-unifraktur">
          Where We Are
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 font-unifraktur">
                Our Locations
              </h2>
              
              <div className="space-y-4">
                {Object.entries(locations).map(([key, location]) => (
                  <button
                    key={key}
                    onClick={() => setActiveLocation(key)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 font-unifraktur ${
                      activeLocation === key
                        ? 'bg-yellow-600/80 text-white border-2 border-yellow-400'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/30'
                    }`}
                  >
                    <h3 className="font-bold text-lg">{location.name}</h3>
                    <p className="text-sm opacity-80">{location.coordinates}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-unifraktur">
                Quick Stats
              </h3>
              <div className="space-y-3 text-white font-unifraktur">
                <div className="flex justify-between">
                  <span>Total Members:</span>
                  <span className="font-bold text-yellow-400">500+</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Servers:</span>
                  <span className="font-bold text-yellow-400">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Zone:</span>
                  <span className="font-bold text-yellow-400">CET/CEST</span>
                </div>
                <div className="flex justify-between">
                  <span>Founded:</span>
                  <span className="font-bold text-yellow-400">2020</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white font-unifraktur">
                  {currentLocation.name}
                </h2>
                <span className={`px-4 py-2 rounded-full text-sm font-unifraktur font-bold ${
                  currentLocation.status === 'Active Operations' ? 'bg-green-600 text-white' :
                  currentLocation.status === 'Fully Operational' ? 'bg-blue-600 text-white' :
                  'bg-orange-600 text-white'
                }`}>
                  {currentLocation.status}
                </span>
              </div>

              <p className="text-white/90 text-lg mb-6 font-unifraktur leading-relaxed">
                {currentLocation.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-black/30 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-bold mb-2 font-unifraktur">📍 Location</h4>
                  <p className="text-white font-unifraktur">{currentLocation.coordinates}</p>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <h4 className="text-yellow-400 font-bold mb-2 font-unifraktur">👥 Population</h4>
                  <p className="text-white font-unifraktur">{currentLocation.population}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4 font-unifraktur">
                Key Features
              </h3>
              <ul className="space-y-3">
                {currentLocation.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-yellow-400 text-lg">•</span>
                    <span className="text-white font-unifraktur">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4 font-unifraktur">
                Join Our Community
              </h3>
              <p className="text-white/80 font-unifraktur mb-6">
                Ready to become part of the Czechoslovak Corps? Connect with us through any of our platforms 
                and start your journey as a member of our historical regiment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-unifraktur rounded-lg transition-colors font-bold">
                  Join Discord Server
                </button>
                <button className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-unifraktur rounded-lg transition-colors font-bold">
                  Apply for Membership
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereWeAre;
