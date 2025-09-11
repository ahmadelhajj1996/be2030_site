import { useState, useEffect } from "react";
import Logo from '../assets/Logo.png'
const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

//   // Close mobile menu when clicking on a link
//   const handleLinkClick = () => {
//     setIsOpen(false);
//   };

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      dir="ltr"
      className={`fixed  w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
      
            <img
              src={Logo}
              alt="Site Logo"
              className="h-12 w-12   md:h-16  md:w-16 rounded-full "
            />
 
        {/* <div className="hidden md:flex items-center space-x-8">
          <a
            href="#home"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            About
          </a>
          <a
            href="#services"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact
          </a>
        </div> */}

        {/* Mobile menu button */}
        {/* <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div> */}
      </div>

      {/* Mobile Navigation */}
      {/* <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white shadow-lg px-4 pt-2 pb-4">
          <a
            href="#home"
            className="block py-2 text-gray-600 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            Home
          </a>
          <a
            href="#about"
            className="block py-2 text-gray-600 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            About
          </a>
          <a
            href="#services"
            className="block py-2 text-gray-600 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            Services
          </a>
          <a
            href="#portfolio"
            className="block py-2 text-gray-600 hover:text-blue-600"
            onClick={handleLinkClick}
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className="block py-2 text-blue-600 font-medium"
            onClick={handleLinkClick}
          >
            Contact
          </a>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
