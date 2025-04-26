
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload } from 'lucide-react';
import { getListingById } from '@/utils/mockData';

const ListingEdit = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    pickupDate: '',
    pickupTimeStart: '',
    pickupTimeEnd: '',
    pickupLocation: '',
    image: ''
  });
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Fetch listing data (simulated)
  useEffect(() => {
    if (listingId) {
      // In a real app, this would be an API call
      const listing = getListingById(listingId);
      if (listing) {
        // Simulated listing data with dummy fields
        setFormData({
          title: listing.title,
          description: 'Fresh organic vegetables from my home garden',
          price: listing.price.replace('$', ''),
          originalPrice: '12.99',
          category: 'vegetables',
          pickupDate: '2023-12-30',
          pickupTimeStart: '16:00',
          pickupTimeEnd: '18:00',
          pickupLocation: '123 Garden Street, Foodtown',
          image: listing.image
        });
        setPreviewImage(listing.image);
      }
    }
  }, [listingId]);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated form data:', formData);
    // In a real app, this would make an API call to update the listing
    alert('Listing updated successfully! (This is a prototype, no actual data is saved)');
    navigate('/listings');
  };

  if (!formData.title) {
    return <div className="py-12 text-center">Loading listing data...</div>;
  }

  return (
    <div>
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate('/listings')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Listings
      </Button>
      <h1 className="text-3xl font-bold mb-6">Edit Listing</h1>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <Label>Listing Image</Label>
              <div className="border rounded-lg p-4">
                {previewImage && (
                  <div className="mb-4">
                    <img 
                      src={previewImage} 
                      alt="Listing preview" 
                      className="max-h-64 mx-auto rounded-lg" 
                    />
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Label htmlFor="image" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Change Image</span>
                    </div>
                  </Label>
                </div>
              </div>
            </div>
            
            {/* Food Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Food Details</h2>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Selling Price ($)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input 
                      id="originalPrice" 
                      type="number"
                      step="0.01" 
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables & Fruits</SelectItem>
                      <SelectItem value="bakery">Bakery & Pastries</SelectItem>
                      <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                      <SelectItem value="prepared">Prepared Meals</SelectItem>
                      <SelectItem value="grocery">Grocery Items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Pickup Details */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Pickup Details</h2>
              
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pickupDate">Pickup Date</Label>
                  <Input 
                    id="pickupDate" 
                    type="date" 
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="pickupTimeStart">Pickup Time Start</Label>
                    <Input 
                      id="pickupTimeStart" 
                      type="time" 
                      value={formData.pickupTimeStart}
                      onChange={(e) => setFormData({...formData, pickupTimeStart: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pickupTimeEnd">Pickup Time End</Label>
                    <Input 
                      id="pickupTimeEnd" 
                      type="time" 
                      value={formData.pickupTimeEnd}
                      onChange={(e) => setFormData({...formData, pickupTimeEnd: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="pickupLocation">Pickup Location</Label>
                  <Textarea 
                    id="pickupLocation" 
                    rows={3}
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => navigate('/listings')}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingEdit;
