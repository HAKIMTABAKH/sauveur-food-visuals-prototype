
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Compass, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavItems = [
  { 
    name: 'Home', 
    icon: Home, 
    path: '/' 
  },
  { 
    name: 'Discover', 
    icon: Compass, 
    path: '/discover' 
  },
  { 
    name: 'Login', 
    icon: LogIn, 
    path: '/login' 
  },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">Sauveur</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6">
          {NavItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.path ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="flex flex-1 items-center justify-end space-x-4 md:hidden">
          <Button variant="outline" size="icon" asChild>
            <Link to="/login">
              <LogIn className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
