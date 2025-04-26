
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter 
} from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Filter, MapPin } from 'lucide-react';
import OfferCard from '@/components/shared/OfferCard';
import { mockFoodOffers, filterCategories } from '@/utils/mockData';

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState(filterCategories);

  // Filter handling function (doesn't actually filter in this prototype)
  const handleFilterChange = (categoryId: string, optionId: string, checked: boolean) => {
    console.log(`Filter changed: ${categoryId} - ${optionId} - ${checked}`);
    // In a real app, this would update the filters state and trigger a re-fetch/filter
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Discover Surplus Food</h1>
      
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search for food items..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
              </SheetHeader>
              
              <div className="py-6 h-full overflow-auto">
                {filters.map((category) => (
                  <div key={category.id} className="mb-6">
                    <h3 className="font-medium mb-3">{category.name}</h3>
                    <div className="space-y-3">
                      {category.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${category.id}-${option.id}`} 
                            checked={option.checked}
                            onCheckedChange={(checked) => 
                              handleFilterChange(category.id, option.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={`${category.id}-${option.id}`}>{option.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <SheetFooter>
                <Button className="w-full">Apply Filters</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode}>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Area */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
        <TabsContent value="grid" className="mt-0">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockFoodOffers.map((offer) => (
              <OfferCard key={offer.id} {...offer} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="map" className="mt-0">
          <div className="bg-muted rounded-lg h-[500px] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Map view would display here with markers for each food offer.</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Discover;
