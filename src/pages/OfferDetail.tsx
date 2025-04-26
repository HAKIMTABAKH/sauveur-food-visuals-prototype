
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, Heart, MapPin, Calendar, Clock } from 'lucide-react';
import { getOfferById } from '@/utils/mockData';
import { Alert, AlertDescription } from "@/components/ui/alert";

const OfferDetail = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const [offer, setOffer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reserved, setReserved] = useState(false);
  
  useEffect(() => {
    if (offerId) {
      // In a real app, this would be an API call
      const offerData = getOfferById(offerId);
      setOffer(offerData);
      setLoading(false);
    }
  }, [offerId]);

  const handleReserve = () => {
    setReserved(true);
    console.log('Reserved offer:', offerId);
    // In a real app, this would make an API call to reserve the offer
  };

  if (loading) {
    return <div className="py-12 text-center">Loading offer details...</div>;
  }

  if (!offer) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Offer Not Found</h1>
        <p className="text-muted-foreground mb-6">The offer you're looking for doesn't exist or has been removed.</p>
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

      {reserved && (
        <Alert className="mb-6 bg-primary/10">
          <AlertDescription className="flex items-center">
            Reservation successful! The seller has been notified of your interest.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Image */}
        <div className="lg:col-span-2">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={offer.image} 
              alt={offer.title} 
              className="w-full h-auto object-cover aspect-video" 
            />
          </div>
          
          <div className="mt-6">
            <h1 className="text-3xl font-bold mb-2">{offer.title}</h1>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary">
                Pickup: {offer.pickupTime}
              </Badge>
              <div className="text-muted-foreground flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {offer.location}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="text-2xl font-bold text-primary">{offer.price}</div>
              {offer.originalPrice && (
                <div className="text-muted-foreground line-through">{offer.originalPrice}</div>
              )}
              {offer.originalPrice && (
                <Badge variant="destructive">
                  Save {Math.round((1 - parseFloat(offer.price.substring(1)) / parseFloat(offer.originalPrice.substring(1))) * 100)}%
                </Badge>
              )}
            </div>
            
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="pickup">Pickup Info</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <div className="space-y-4">
                  <p>{offer.description}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Curabitur non nulla sit amet nisl tempus convallis.</p>
                </div>
              </TabsContent>
              <TabsContent value="pickup" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Pickup Date & Time</h3>
                      <p className="text-muted-foreground">{offer.pickupTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Pickup Location</h3>
                      <p className="text-muted-foreground">{offer.location}</p>
                      <div className="mt-2 h-40 bg-muted rounded-md">
                        {/* Map placeholder */}
                        <div className="w-full h-full flex items-center justify-center">
                          <p className="text-sm text-muted-foreground">Map placeholder</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Instructions</h3>
                      <p className="text-muted-foreground">Please arrive during the pickup window. Look for the "Sauveur Pickup" sign at the entrance.</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Right Column - Seller & Actions */}
        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Offered by</h3>
              
              <Link to={`/seller/${offer.sellerId}`} className="flex items-center gap-3 mb-6">
                <Avatar>
                  <AvatarImage src={offer.sellerImage} />
                  <AvatarFallback>{offer.sellerName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{offer.sellerName}</div>
                  <div className="text-sm text-muted-foreground">Verified Seller</div>
                </div>
              </Link>
              
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleReserve}
                  disabled={reserved}
                >
                  {reserved ? 'Reserved' : 'Reserve Now'}
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Heart className="mr-2 h-4 w-4" />
                  Save for Later
                </Button>
                <Button variant="outline" className="w-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-4">Similar Offers</h3>
            {/* Display similar offers - simplified for the prototype */}
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-20 h-20 bg-muted rounded-md overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-161011809838${i}-a57141f2eefd?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3`} 
                      alt="Similar offer" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">Similar Food Item {i}</h4>
                    <div className="text-sm text-primary font-medium">$9.99</div>
                    <div className="text-xs text-muted-foreground">0.8 miles away</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;
