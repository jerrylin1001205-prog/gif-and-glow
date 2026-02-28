import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { LibraryProvider } from "@/contexts/LibraryContext";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Creator from "./pages/Creator";
import Favorites from "./pages/Favorites";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import Library from "./pages/Library";
import Pricing from "./pages/Pricing";
import GifStudio from "./pages/GifStudio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <FavoritesProvider>
            <LibraryProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/marketplace" element={<Index />} />
                      <Route path="/creator" element={<Creator />} />
                      <Route path="/gif-studio" element={<GifStudio />} />
                      <Route path="/library" element={<Library />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </BrowserRouter>
              </TooltipProvider>
            </LibraryProvider>
          </FavoritesProvider>
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
