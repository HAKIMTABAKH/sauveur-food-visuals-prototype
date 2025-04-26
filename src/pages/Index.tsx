
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { mockFoodOffers } from '@/utils/mockData';
import OfferCard from '@/components/shared/OfferCard';
import Header from '@/components/shared/Header';  // Import the Header component

const Index = () => {
  // Get a few featured offers
  const featuredOffers = mockFoodOffers.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />  {/* Add the Header component at the top */}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Save Food, Save Money, <span className="text-primary">Save the Planet</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Connect with local businesses to rescue surplus food at great prices.
                Join the movement to reduce food waste in your community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/discover">Find Food Near Me</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/listings/new">List Surplus Food</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-primary/10 rounded-lg -rotate-3 transform"></div>
              <img 
                src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?q=80&w=3060&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Fresh food" 
                className="rounded-lg shadow-lg object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How Sauveur Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Surplus Food</h3>
              <p className="text-muted-foreground">Browse available food items from local businesses and restaurants in your area.</p>
            </div>
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reserve & Pay</h3>
              <p className="text-muted-foreground">Reserve the items you want and pay through our secure platform at discounted prices.</p>
            </div>
            <div className="bg-card rounded-lg p-6 text-center shadow-sm">
              <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pickup & Enjoy</h3>
              <p className="text-muted-foreground">Collect your food at the designated time and location. Enjoy your delicious finds!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Offers</h2>
            <Button variant="outline" asChild>
              <Link to="/discover">View All</Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOffers.map((offer) => (
              <OfferCard key={offer.id} {...offer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Reduce Food Waste?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users making a difference in their communities by saving perfectly good food from going to waste.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/discover">Start Discovering</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
