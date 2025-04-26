
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User, MapPin } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">Sauveur</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link to="/discover" className="text-sm font-medium hover:text-primary">
              Discover
            </Link>
            <Link to="/listings" className="text-sm font-medium hover:text-primary">
              My Listings
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <MapPin className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <Button variant="outline" size="icon">
              <Search className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
          <Link to="/profile">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <User className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="py-6 space-y-6">
                <nav className="flex flex-col space-y-4">
                  <Link to="/discover" className="text-foreground font-medium hover:text-primary">
                    Discover
                  </Link>
                  <Link to="/listings" className="text-foreground font-medium hover:text-primary">
                    My Listings
                  </Link>
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
