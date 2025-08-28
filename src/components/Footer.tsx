import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 py-8 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Blacklane Technologies. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;