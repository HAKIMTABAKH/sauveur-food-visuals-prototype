
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MapPin, Calendar, Star } from 'lucide-react';
import OfferCard from '@/components/shared/OfferCard';
import { getSellerById, getSellerOffers } from '@/utils/mockData';

const SellerProfile = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [seller, setSeller] = useState<any>(null);
  const [sellerOffers, setSellerOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (sellerId) {
      // In a real app, these would be API calls
      const sellerData = getSellerById(sellerId);
      const offers = getSellerOffers(sellerId);
      
      setSeller(sellerData);
      setSellerOffers(offers);
      setLoading(false);
    }
  }, [sellerId]);

  if (loading) {
    return <div className="py-12 text-center">Loading seller profile...</div>;
  }

  if (!seller) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Seller Not Found</h1>
        <p className="text-muted-foreground mb-6">The seller you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/discover">Back to Discover</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => window.history.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={seller.avatar} />
            <AvatarFallback>{seller.name[0]}</AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-3xl font-bold">{seller.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{seller.rating}</span>
              </div>
              <span className="text-muted-foreground">({seller.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {seller.address}
            </div>
            <div className="flex items-center text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              Member since {new Date(seller.joinedDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">About this seller</h2>
          <p className="text-muted-foreground">{seller.description}</p>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="active">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Available Food</h2>
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="sold">Sold</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="active">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sellerOffers.length > 0 ? (
              sellerOffers.map((offer) => (
                <OfferCard key={offer.id} {...offer} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">No active listings available from this seller.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="sold">
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No past listings to display.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerProfile;
