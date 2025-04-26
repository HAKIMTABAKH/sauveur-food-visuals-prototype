
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  User, 
  MapPin, 
  Home, 
  List, 
  Bell 
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const NavItems = [
  { 
    name: 'Home', 
    icon: Home, 
    path: '/' 
  },
  { 
    name: 'Discover', 
    icon: Search, 
    path: '/discover' 
  },
  { 
    name: 'My Listings', 
    icon: List, 
    path: '/listings' 
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

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <MapPin className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
          
          <Link to="/profile">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <User className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="py-6 space-y-6">
                <nav className="flex flex-col space-y-4">
                  {NavItems.map((item) => (
                    <Link 
                      key={item.name} 
                      to={item.path} 
                      className={cn(
                        "flex items-center space-x-2 text-foreground font-medium hover:text-primary",
                        location.pathname === item.path ? "text-primary" : ""
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  <Link to="/profile" className="text-foreground font-medium hover:text-primary">
                    Profile
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

