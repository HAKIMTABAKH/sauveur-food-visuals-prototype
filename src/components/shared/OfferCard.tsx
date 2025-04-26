
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MapPin } from 'lucide-react';

interface OfferCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  pickupTime: string;
  location: string;
  sellerId: string;
  sellerName: string;
  sellerImage?: string;
}

const OfferCard = ({
  id,
  title,
  description,
  price,
  originalPrice,
  image,
  pickupTime,
  location,
  sellerId,
  sellerName,
  sellerImage
}: OfferCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/offer/${id}`} className="relative block w-full h-48">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        {originalPrice && (
          <div className="absolute top-2 left-2">
            <Badge variant="destructive" className="px-2 py-1 text-xs">
              Save {Math.round((1 - parseFloat(price) / parseFloat(originalPrice)) * 100)}%
            </Badge>
          </div>
        )}
      </Link>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <div className="font-bold text-primary">{price}</div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{description}</p>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-2">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
        <Badge variant="outline" className="bg-secondary text-secondary-foreground">
          Pickup: {pickupTime}
        </Badge>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Link to={`/seller/${sellerId}`} className="flex items-center gap-2 w-full">
          <Avatar className="h-6 w-6">
            <AvatarImage src={sellerImage} />
            <AvatarFallback>{sellerName[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{sellerName}</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default OfferCard;
