
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import ListingManagementCard from '@/components/seller/ListingManagementCard';
import { mockUserListings } from '@/utils/mockData';

const Listings = () => {
  // Filter listings by status
  const activeListings = mockUserListings.filter(listing => listing.status === 'active');
  const pendingListings = mockUserListings.filter(listing => listing.status === 'pending');
  const soldListings = mockUserListings.filter(listing => listing.status === 'sold');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Button asChild>
          <Link to="/listings/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Listing
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({mockUserListings.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeListings.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingListings.length})</TabsTrigger>
          <TabsTrigger value="sold">Sold ({soldListings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {mockUserListings.map((listing) => (
              <ListingManagementCard key={listing.id} {...listing} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="space-y-4">
            {activeListings.length > 0 ? (
              activeListings.map((listing) => (
                <ListingManagementCard key={listing.id} {...listing} />
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">You don't have any active listings.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="space-y-4">
            {pendingListings.length > 0 ? (
              pendingListings.map((listing) => (
                <ListingManagementCard key={listing.id} {...listing} />
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">You don't have any pending listings.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="sold">
          <div className="space-y-4">
            {soldListings.length > 0 ? (
              soldListings.map((listing) => (
                <ListingManagementCard key={listing.id} {...listing} />
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">You don't have any sold listings.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Listings;
