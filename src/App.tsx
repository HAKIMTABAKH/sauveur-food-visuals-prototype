
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import Listings from "./pages/Listings";
import ListingNew from "./pages/ListingNew"; 
import ListingEdit from "./pages/ListingEdit";
import OfferDetail from "./pages/OfferDetail";
import SellerProfile from "./pages/SellerProfile";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layouts/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<AppLayout />}>
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/new" element={<ListingNew />} />
            <Route path="/listings/:listingId/edit" element={<ListingEdit />} />
            <Route path="/offer/:offerId" element={<OfferDetail />} />
            <Route path="/seller/:sellerId" element={<SellerProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
