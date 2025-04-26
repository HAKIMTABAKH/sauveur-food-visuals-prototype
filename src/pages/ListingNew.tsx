
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ListingNew = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [checkingImage, setCheckingImage] = useState(false);
  const [imageCheckResult, setImageCheckResult] = useState<{status: 'success' | 'warning' | null, message: string}>({
    status: null,
    message: '',
  });
  
  // Form state - in a real app, you'd use a form library like React Hook Form
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
  });

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        
        // Simulate AI check
        setCheckingImage(true);
        setTimeout(() => {
          setCheckingImage(false);
          // Randomly show success or warning for demo purposes
          const isSuccess = Math.random() > 0.3;
          setImageCheckResult({
            status: isSuccess ? 'success' : 'warning',
            message: isSuccess 
              ? 'Image looks good! The food appears to be in good condition.'
              : 'Warning: The image might not clearly show the food items. Consider adding more details.'
          });
        }, 2000);
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real app, this would make an API call to save the listing
    alert('Listing created successfully! (This is a prototype, no actual data is saved)');
  };

  return (
    <div>
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => window.history.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <h1 className="text-3xl font-bold mb-6">Create New Listing</h1>

      <Card>
        <CardContent className="pt-6">
          <Tabs value={`step${currentStep}`} onValueChange={(value) => setCurrentStep(Number(value.replace('step', '')))}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="step1">1. Image Upload</TabsTrigger>
              <TabsTrigger value="step2">2. Food Details</TabsTrigger>
              <TabsTrigger value="step3">3. Pickup Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="step1">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  {!selectedImage ? (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Food Image</h3>
                      <p className="text-muted-foreground mb-4">Upload a clear photo of the food you're listing</p>
                      <Input 
                        id="image" 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <Label htmlFor="image" className="cursor-pointer">
                        <Button type="button">Select Image</Button>
                      </Label>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <img 
                        src={selectedImage} 
                        alt="Food preview" 
                        className="mx-auto max-h-64 rounded-lg" 
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedImage(null);
                          setImageCheckResult({status: null, message: ''});
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                  )}
                </div>

                {checkingImage && (
                  <div className="p-4 border rounded-lg flex items-center gap-3 bg-muted/30">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    <p>Checking image quality and content...</p>
                  </div>
                )}

                {imageCheckResult.status && (
                  <Alert variant={imageCheckResult.status === 'warning' ? 'destructive' : 'default'}>
                    {imageCheckResult.status === 'success' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {imageCheckResult.status === 'success' ? 'Success!' : 'Warning'}
                    </AlertTitle>
                    <AlertDescription>
                      {imageCheckResult.message}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <Button 
                    onClick={() => setCurrentStep(2)} 
                    disabled={!selectedImage}
                  >
                    Continue to Food Details
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="step2">
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      placeholder="E.g., Organic Vegetable Box" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the food items, quantity, etc." 
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
                        placeholder="0.00" 
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="originalPrice">Original Price ($)</Label>
                      <Input 
                        id="originalPrice" 
                        type="number" 
                        placeholder="0.00" 
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
                
                <div className="flex justify-between gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>
                    Continue to Pickup Details
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="step3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
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
                      placeholder="Enter the address or description of pickup location" 
                      rows={3}
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button type="submit">
                    Create Listing
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingNew;
