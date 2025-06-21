import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitMessage('Message sent successfully! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactType: 'general'
      });
    } catch {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      type: 'Discord Server',
      value: 'SVCI Discord Community',
      icon: '💬',
      description: 'Join our main communication hub'
    },
    {
      type: 'Steam Group',
      value: 'Czechoslovak Corps',
      icon: '🎮',
      description: 'Connect with us on Steam'
    },
    {
      type: 'Teamspeak',
      value: 'svci.teamspeak.com',
      icon: '🎤',
      description: 'Voice communication during events'
    },
    {
      type: 'Email',
      value: 'contact@svci.cz',
      icon: '📧',
      description: 'Official correspondence'
    }
  ];

  return (
    <section 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(/backgrounds/ContactUs.png)` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-white text-center mb-12 font-unifraktur">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6 font-unifraktur">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contactType" className="block text-white font-unifraktur mb-2">
                  Contact Type
                </label>
                <select
                  id="contactType"
                  name="contactType"
                  value={formData.contactType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-white/30 focus:border-yellow-500 focus:outline-none font-unifraktur"
                >
                  <option value="general">General Inquiry</option>
                  <option value="recruitment">Recruitment</option>
                  <option value="event">Event Information</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-white font-unifraktur mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-white/30 focus:border-yellow-500 focus:outline-none font-unifraktur"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-unifraktur mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-white/30 focus:border-yellow-500 focus:outline-none font-unifraktur"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-unifraktur mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-white/30 focus:border-yellow-500 focus:outline-none font-unifraktur"
                  placeholder="Brief description of your message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-unifraktur mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-white/30 focus:border-yellow-500 focus:outline-none font-unifraktur resize-vertical"
                  placeholder="Your detailed message..."
                />
              </div>

              {submitMessage && (
                <div className={`text-center p-4 rounded-lg font-unifraktur ${
                  submitMessage.includes('successfully') 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-unifraktur rounded-lg transition-colors text-lg font-bold"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6 font-unifraktur">
                Get in Touch
              </h2>
              <p className="text-white/80 font-unifraktur mb-6 text-lg">
                Join the Czechoslovak Corps community! We welcome new members and are always ready to answer 
                your questions about our Mount & Blade II: Bannerlord regiment.
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-black/30 rounded-lg">
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <h3 className="text-yellow-400 font-unifraktur font-bold">{contact.type}</h3>
                      <p className="text-white font-unifraktur">{contact.value}</p>
                      <p className="text-white/70 font-unifraktur text-sm">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4 font-unifraktur">
                Recruitment Information
              </h3>
              <div className="space-y-3 text-white font-unifraktur">
                <p>🎖️ <strong>Minimum Requirements:</strong> Mount & Blade II: Bannerlord</p>
                <p>🕐 <strong>Active Hours:</strong> European timezone friendly</p>
                <p>🎯 <strong>Focus:</strong> Tactical gameplay and historical immersion</p>
                <p>🤝 <strong>Community:</strong> Respectful and mature environment</p>
              </div>
              <div className="mt-6">
                <button className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-unifraktur rounded-lg transition-colors font-bold">
                  Apply for Recruitment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
