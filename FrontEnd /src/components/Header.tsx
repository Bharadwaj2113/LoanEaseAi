
import React from 'react';
import { Headphones, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Logo />
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
          <Headphones size={18} />
          <span>Support</span>
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={20} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
