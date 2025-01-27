import React from 'react';
import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const isAuthenticated = Boolean(window?.route?.current);

  const candidateLinks = isAuthenticated ? [
    { href: route('jobs.index'), text: 'Browse Jobs' },
    { href: route('applications.index'), text: 'My Applications' },
    { href: route('profile.edit'), text: 'Profile' }
  ] : [
    { href: route('login'), text: 'Sign In' },
    { href: route('register'), text: 'Create Account' },
    { href: route('jobs.index'), text: 'Browse Jobs' }
  ];

  const companyLinks = isAuthenticated ? [
    { href: route('jobs.create'), text: 'Post a Job' },
    { href: route('company.dashboard'), text: 'Dashboard' }
  ] : [
    { href: route('register'), text: 'Post a Job' },
    { href: route('login'), text: 'Company Login' }
  ];

  return (
    <footer className="bg-[#25324B] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-xl font-bold mb-4 block">
              Job Board
            </Link>
            <p className="text-gray-400">Connecting talent with opportunities worldwide.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-[#4640DE] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#4640DE] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#4640DE] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#4640DE] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Candidates</h4>
            <ul className="space-y-2">
              {candidateLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    className="text-gray-400 hover:text-white transition-colors" 
                    href={link.href}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    className="text-gray-400 hover:text-white transition-colors" 
                    href={link.href}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@jobboard.com" 
                   className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <Link 
                  href={route('home')} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href={route('home')} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Job Board. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;