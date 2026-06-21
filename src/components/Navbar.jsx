// Navbar.jsx — FIXED + MOBILE RESPONSIVE
import { useState, useEffect, useCallback } from 'react';
import './Navbar.css';
import { useTheme } from '../hooks/useTheme';

import githubIcon from '../assets/icons/github.svg';
import xIcon from '../assets/icons/x.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import facebookIcon from '../assets/icons/facebook.svg';
import instagramIcon from '../assets/icons/instagram.svg';
import sunIcon from '../assets/icons/sun.svg';
import moonIcon from '../assets/icons/moon.svg';
import logo from '../assets/ewd-logo.png';

const Navbar = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { darkMode, setDarkMode } = useTheme();

    // Update time & date every second
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }));
            setCurrentDate(now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }));
        };
        updateDateTime();
        const timer = setInterval(updateDateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    // Detect scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle theme using the actual button that was clicked (no ref)
    const toggleTheme = useCallback(async (e) => {
        const button = e.currentTarget;
        const newDarkMode = !darkMode;

        if (!document.startViewTransition) {
            setDarkMode(newDarkMode);
            return;
        }

        const transition = document.startViewTransition(() => {
            if (newDarkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            setDarkMode(newDarkMode);
        });

        await transition.ready;

        const { top, left, width, height } = button.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;

        const maxRadius = Math.hypot(
            Math.max(left, window.innerWidth - left),
            Math.max(top, window.innerHeight - top)
        );

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 400,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)',
                fill: 'forwards',
            }
        );
    }, [darkMode, setDarkMode]);

    const socialIcons = [
        { name: 'GitHub', iconSrc: githubIcon, link: 'https://github.com/ErnestChainDev' },
        { name: 'X', iconSrc: xIcon, link: 'https://x.com/ErnestChainDev' },
        { name: 'LinkedIn', iconSrc: linkedinIcon, link: 'https://www.linkedin.com/in/ernest-windel-dreo-3934b3368' },
        { name: 'Facebook', iconSrc: facebookIcon, link: 'https://www.facebook.com/mstr.dreo' },
        { name: 'Instagram', iconSrc: instagramIcon, link: 'https://www.instagram.com/mstr_dreo' },
    ];

    // Reusable right‑side content – different layout on mobile
    const renderRightContent = (isMobile = false) => {
        if (isMobile) {
            return (
                <>
                    {/* Mobile: "Let's connect" on left, social icons on right */}
                    <div className="mobile-connect-row">
                        <div className="connect-text">
                            <span>Let's connect</span>
                            <span className="arrow-icon" aria-hidden="true">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </span>
                        </div>
                        <div className="social-icons">
                            {socialIcons.map((icon) => (
                                <a key={icon.name} href={icon.link}
                                    target="_blank" rel="noopener noreferrer" className="icon-link"
                                    onClick={() => setIsMobileMenuOpen(false)}>
                                    <img src={icon.iconSrc} alt={icon.name} className="icon-img" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Toggle + clock on its own row */}
                    <div className="toggle-clock-group">
                        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                            <img
                                src={darkMode ? moonIcon : sunIcon}
                                alt="theme icon"
                                className="icon-img"
                            />
                        </button>
                        <div className="clock-block">
                            <span className="clock-time">{currentTime}</span>
                            <span className="clock-date">{currentDate}</span>
                        </div>
                    </div>
                </>
            );
        }

        // Desktop layout
        return (
            <>
                <div className="connect-text">
                    <span>Let's connect</span>
                    <span className="arrow-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </span>
                </div>
                <div className="social-icons">
                    {socialIcons.map((icon) => (
                        <a key={icon.name} href={icon.link}
                            target="_blank" rel="noopener noreferrer" className="icon-link">
                            <img src={icon.iconSrc} alt={icon.name} className="icon-img" />
                        </a>
                    ))}
                </div>
                <div className="toggle-clock-group">
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                        <img
                            src={darkMode ? moonIcon : sunIcon}
                            alt="theme icon"
                            className="icon-img"
                        />
                    </button>
                    <div className="clock-block">
                        <span className="clock-time">{currentTime}</span>
                        <span className="clock-date">{currentDate}</span>
                    </div>
                </div>
            </>
        );
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            {/* Main row – always visible */}
            <div className="navbar-container">
                {/* LEFT SIDE – Logo + Name/Portfolio */}
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="logo-img" />
                    <span className="logo-separator" aria-hidden="true"></span>
                    <div className="brand-text">
                        <span className="brand-name">Ernest Windel Dreo</span>
                        <span className="brand-subtitle">Portfolio</span>
                    </div>
                </div>

                {/* DESKTOP RIGHT SECTION (hidden on mobile) */}
                <div className="navbar-right desktop-right">
                    {renderRightContent(false)}
                </div>

                {/* HAMBURGER BUTTON (visible only on mobile) */}
                <button
                    className="mobile-menu-button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                        <span /><span /><span />
                    </span>
                </button>
            </div>

            {/* MOBILE DROPDOWN MENU */}
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-inner">
                        {renderRightContent(true)}
                    </div>
                </div>
            )}

            {/* Disable default crossfade for JS‑driven animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    ::view-transition-old(root),
                    ::view-transition-new(root) {
                        animation: none;
                        mix-blend-mode: normal;
                    }
                `,
            }} />
        </nav>
    );
};

export default Navbar;