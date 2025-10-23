import React from 'react';

import Footer from './Footer';
import Navbar from './Navbar';
import ScrollToTop from './scrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mb-10">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
