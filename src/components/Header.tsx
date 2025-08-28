import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100 py-3 px-6 flex items-center justify-between">
        {/* Company Logo/Name */}
        <div className="flex items-center">
          {/* You can replace this with your logo image if you have one. */}
          {/* <Image
            src="/logo.png"
            alt="Blacklane Logo"
            width={120}
            height={40}
          /> */}
          <a href="/" className="text-black font-bold text-xl tracking-tight hover:text-gray-700 transition-colors">
  Blacklane
</a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          {/* Change this line: */}
          <a href="#how-we-work" className="hover:text-black transition-colors">How We Work</a>
          
          <a href="#ai-engine" className="hover:text-black transition-colors">AI Engine</a>
          <a href="#" className="hover:text-black transition-colors">Future of Data</a>
          <a href="#" className="hover:text-black transition-colors">News</a>
        </nav>

        {/* Call-to-action Button */}
        <button className="bg-gray-700 text-white font-semibold py-2 px-6 rounded-full transition-colors hover:bg-black">
          Get in touch
        </button>
      </div>
    </header>
  );
};

export default Header;