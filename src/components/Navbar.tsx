import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type NavLinkT = {
    label: string;
    href: string;
}
const NAV_LINKS: NavLinkT[] = [
    { label: "home", href: "/" },
    { label: "events", href: "/events" },
    { label: "podcast", href: "/podcasts" },
    { label: "about", href: "/about" },
]
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [open]);

    return (
        <nav className={`w-full z-50 px-4 py-4 md:px-24 flex justify-between items-start pt-4 sticky top-0 transition-all duration-300 ${scrolled ? 'bg-white/20 backdrop-blur-xl' : 'bg-transparent'}`}>
            <NavLink to="/" className="flex flex-col leading-none group text-white">
                <h1 className="text-2xl font-extrabold tracking-widest font-montserrat">DHRUVA</h1>
                <span className="text-[0.6rem] tracking-[0.2em] font-light text-gray-300">ASTRONOMY CLUB</span>
            </NavLink>
            <ul className="lg:md:xl:flex gap-10 md:gap-16 pt-2 hidden">
                {NAV_LINKS.map(({ label, href }) => (
                    <li key={href}>
                        <NavLink
                            to={href}
                            className={({ isActive }) =>
                                `text-xs font-bold tracking-widest hover:text-neutral-400 transition-colors uppercase font-montserrat ${isActive ? 'text-white' : 'text-gray-300'}`
                            }
                        >
                            {label.toUpperCase()}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <button className="lg:md:xl:hidden text-white text-[0.6rem] font-bold tracking-[0.2em] font-montserrat uppercase block my-auto hover:text-gray-300 transition-colors cursor-pointer" onClick={() => setOpen(!open)}>Menu</button>
            {open && (
                <motion.ul
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ duration: 0.3 }}
                    className="lg:md:xl:hidden flex flex-col absolute top-0 right-0 gap-10 md:gap-16 bg-zinc-900 text-white px-10 py-6 w-full h-screen">
                    <div className="flex justify-between items-center gap-2">
                        <img className='size-18' src="/logo.svg" alt="" />
                        <button className="text-[0.6rem] tracking-[0.2em] font-bold font-montserrat uppercase text-gray-300 hover:text-white transition-colors cursor-pointer" onClick={() => setOpen(false)}>Close</button>
                    </div>
                    {NAV_LINKS.map(({ label, href }) => (
                        <li key={href}>
                            <NavLink
                                to={href}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `text-xs font-bold tracking-widest hover:text-neutral-400 transition-colors uppercase font-montserrat ${isActive ? 'text-white' : 'text-gray-300'}`
                                }
                            >
                                {label.toUpperCase()}
                            </NavLink>
                        </li>
                    ))}
                </motion.ul>
            )}
        </nav>
    );
};

export default Navbar;
