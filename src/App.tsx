import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Creator from "./pages/Creator";
import Favorites from "./pages/Favorites";
import Chat from "./pages/Chat";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ThemeProvider>
        <CartProvider>
          <FavoritesProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/creator" element={<Creator />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </TooltipProvider>
          </FavoritesProvider>
        </CartProvider>
      </ThemeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
