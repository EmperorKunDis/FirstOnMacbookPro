import React, { useState } from 'react';
import Hero from "./sections/Hero.jsx";
import Navbar from "./sections/Navbar.jsx";
import SvciLogin from "./sections/SvciLogin.jsx";
import Login from "./sections/Login.jsx";
import Leadership from "./sections/Leadership.jsx";
import Media from "./sections/Media.jsx";
import WhereWeAre from "./sections/WhereWeAre.jsx";
import ContactUs from "./sections/ContactUs.jsx";
import Events from "./sections/Events.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";



const App = () => {
    const [currentSection, setCurrentSection] = useState('hero');

    const handleNavigation = (objectId) => {
        switch (objectId) {
            case 'Line054':
                setCurrentSection('svci');
                break;
            case 'Object004001':
                setCurrentSection('leadership');
                break;
            case 'Book':
                setCurrentSection('media');
                break;
            case 'polySurface17001':
                setCurrentSection('whereWeAre');
                break;
            case 'Object008':
                setCurrentSection('login');
                break;
            case 'Scroll':
                setCurrentSection('contact');
                break;
            case 'events':
                setCurrentSection('events');
                break;
            default:
                setCurrentSection('hero');
        }
    };

    const renderSection = () => {
        switch (currentSection) {
            case 'svci':
                return <SvciLogin />;
            case 'login':
                return <Login />;
            case 'leadership':
                return <Leadership />;
            case 'media':
                return <Media />;
            case 'whereWeAre':
                return <WhereWeAre />;
            case 'contact':
                return <ContactUs />;
            case 'events':
                return <Events />;
            default:
                return <Hero />;
        }
    };

    return (
        <AuthProvider>
            <main className="max-w-9xl mx-auto">
                <Navbar onNavigate={handleNavigation} />
                {currentSection === 'hero' ? (
                    <Hero onNavigate={handleNavigation} />
                ) : (
                    renderSection()
                )}
            </main>
        </AuthProvider>
    );
};

export default App;