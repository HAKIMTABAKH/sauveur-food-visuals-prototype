
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowLeft, User, LogOut, Edit } from 'lucide-react';
import { mockUser, mockUserListings } from '@/utils/mockData';
import ListingManagementCard from '@/components/seller/ListingManagementCard';

const Profile = () => {
  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">My Profile</h1>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{mockUser.name}</CardTitle>
              <CardDescription>Member since {new Date(mockUser.joinedDate).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Email</p>
                  <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Phone</p>
                  <p className="text-sm text-muted-foreground">{mockUser.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Address</p>
                  <p className="text-sm text-muted-foreground">{mockUser.address}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button className="w-full" variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="listings">
            <TabsList className="mb-4">
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="orders">My Orders</TabsTrigger>
              <TabsTrigger value="saved">Saved Items</TabsTrigger>
            </TabsList>
            
            <TabsContent value="listings">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Your Food Listings</h2>
                  <Button variant="default" asChild>
                    <a href="/listings/new">+ Add New Listing</a>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {mockUserListings.length > 0 ? (
                    mockUserListings.map((listing) => (
                      <ListingManagementCard key={listing.id} {...listing} />
                    ))
                  ) : (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium">No listings yet</p>
                        <p className="text-muted-foreground mb-4">Create your first listing to start selling surplus food</p>
                        <Button>Add Your First Listing</Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">You don't have any orders yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved">
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">You haven't saved any items yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
