import React from 'react';

const Leadership = () => {
  const leadershipTeam = [
    {
      id: 1,
      name: "General Commandant",
      role: "Supreme Leader of SVCI",
      image: "/profiles/13.png",
      description: "Leading the Czechoslovak Corps with honor and determination.",
      rank: "Generál"
    },
    {
      id: 2,
      name: "Colonel Commander",
      role: "Military Operations Chief",
      image: "/profiles/28.png",
      description: "Coordinating all military operations and strategic planning.",
      rank: "Plukovník"
    },
    {
      id: 3,
      name: "Major Strategist",
      role: "Tactical Advisor",
      image: "/profiles/38.png",
      description: "Developing battle strategies and training programs.",
      rank: "Major"
    },
    {
      id: 4,
      name: "Captain Leader",
      role: "Squad Operations",
      image: "/profiles/39.png",
      description: "Managing squad formations and field operations.",
      rank: "Kapitán"
    },
    {
      id: 5,
      name: "Lieutenant Coordinator",
      role: "Communications Chief",
      image: "/profiles/48.png",
      description: "Overseeing all communications and logistics.",
      rank: "Poručík"
    },
    {
      id: 6,
      name: "Sergeant Trainer",
      role: "Training Supervisor",
      image: "/profiles/49.png",
      description: "Training new recruits and maintaining discipline.",
      rank: "Seržant"
    }
  ];

  return (
    <section 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(/backgrounds/Leadership.png)` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-white text-center mb-12 font-unifraktur">
          Leadership Structure
        </h1>
        
        <div className="text-center mb-12">
          <p className="text-xl text-white font-unifraktur max-w-3xl mx-auto">
            The Czechoslovak Corps is led by experienced commanders who have dedicated themselves to maintaining 
            the highest standards of military excellence and brotherhood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadershipTeam.map((leader) => (
            <div
              key={leader.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <div className="mb-4">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-yellow-500 object-cover"
                  onError={(e) => {
                    e.target.src = '/profiles/13.png';
                  }}
                />
              </div>
              
              <div className="mb-2">
                <span className="inline-block bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-unifraktur">
                  {leader.rank}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 font-unifraktur">
                {leader.name}
              </h3>
              
              <h4 className="text-lg text-yellow-400 mb-3 font-unifraktur">
                {leader.role}
              </h4>
              
              <p className="text-white/80 text-sm leading-relaxed font-unifraktur">
                {leader.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 font-unifraktur">
              Command Hierarchy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
              <div className="border border-yellow-500 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-2 font-unifraktur text-yellow-400">High Command</h3>
                <ul className="space-y-1 font-unifraktur">
                  <li>• Generál (General)</li>
                  <li>• Plukovník (Colonel)</li>
                  <li>• Major (Major)</li>
                </ul>
              </div>
              <div className="border border-yellow-500 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-2 font-unifraktur text-yellow-400">Field Command</h3>
                <ul className="space-y-1 font-unifraktur">
                  <li>• Kapitán (Captain)</li>
                  <li>• Poručík (Lieutenant)</li>
                  <li>• Seržant (Sergeant)</li>
                </ul>
              </div>
              <div className="border border-yellow-500 rounded-lg p-4">
                <h3 className="text-xl font-bold mb-2 font-unifraktur text-yellow-400">Enlisted</h3>
                <ul className="space-y-1 font-unifraktur">
                  <li>• Desátník (Corporal)</li>
                  <li>• Vojín (Private)</li>
                  <li>• Rekrut (Recruit)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
