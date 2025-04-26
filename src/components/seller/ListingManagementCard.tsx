
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ListingManagementCardProps {
  id: string;
  title: string;
  image: string;
  price: string;
  status: string;
  createdAt: string;
}

const ListingStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
    case "pending":
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
    case "sold":
      return <Badge variant="secondary">Sold</Badge>;
    default:
      return null;
  }
};

const ListingManagementCard = ({
  id,
  title,
  image,
  price,
  status,
  createdAt,
}: ListingManagementCardProps) => {
  const handleDelete = () => {
    console.log("Delete listing:", id);
    // In a real app, this would make an API call to delete the listing
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-24 h-24">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <CardContent className="flex-grow p-4">
          <div className="flex flex-wrap justify-between gap-2 mb-2">
            <h3 className="font-semibold">{title}</h3>
            <ListingStatusBadge status={status} />
          </div>
          
          <div className="flex flex-wrap justify-between gap-2">
            <div className="text-sm text-muted-foreground">
              Listed on {new Date(createdAt).toLocaleDateString()}
            </div>
            <div className="font-medium text-primary">{price}</div>
          </div>
        </CardContent>

        <CardFooter className="p-4 flex justify-end items-center gap-2">
          <Link to={`/listings/${id}/edit`}>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  listing "{title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ListingManagementCard;
