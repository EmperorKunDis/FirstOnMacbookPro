import { useState } from 'react';
import { navLinks } from '../constants/index.js';
import { useAuth } from '../context/AuthContext.jsx';

// eslint-disable-next-line react/prop-types
const NavItems = ({ onClick = () => {} }) => (
    <ul className="nav-ul">
        {navLinks.map((item) => (
            <li key={item.id} className="nav-li">
                <a 
                    href="#"
                    className="nav-li_a shine-effect" 
                    onClick={(e) => {
                        e.preventDefault();
                        onClick(item.id);
                    }}
                    data-nav-item={item.name}
                >
                    {item.name}
                </a>
            </li>
        ))}
    </ul>
);

// eslint-disable-next-line react/prop-types
const Navbar = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => setIsOpen(!isOpen);
    
    const handleNavClick = (itemId) => {
        setIsOpen(false);
        onNavigate(itemId);
    };

    const handleSpecialNavClick = (e, id) => {
        e.preventDefault();
        onNavigate(id);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/70">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-5 mx-auto c-space">
                    <div className="flex justify-center">
                        <a 
                            href="#" 
                            className="text-neutral-400 font-bold text-xl hover:text-white transition-colors shine-effect"
                            data-nav-item="SVCI"
                            onClick={(e) => handleSpecialNavClick(e, 'Line054')}
                        >
                            SVCI - Czechoslovak Corps
                        </a>
                    </div>

                    <div className="flex justify-end items-center gap-4">
                        {user && (
                            <div className="hidden sm:flex items-center gap-4">
                                <span className="text-white text-sm">
                                    Přihlášen: {user.email}
                                </span>
                                <button
                                    onClick={logout}
                                    className="text-red-400 hover:text-red-300 text-sm"
                                >
                                    Odhlásit
                                </button>
                            </div>
                        )}
                        <nav className="sm:flex hidden">
                            <NavItems onClick={handleNavClick} />
                        </nav>
                        <button
                            className="sm:hidden flex items-center"
                            onClick={toggleMenu}
                            aria-label="Toggle menu">
                            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <nav className="sm:hidden flex flex-col items-center justify-center">
                    <NavItems onClick={handleNavClick} />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;