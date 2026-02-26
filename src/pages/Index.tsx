import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, X, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import EmojiCard from '@/components/EmojiCard';
import { MOCK_EMOJIS, EmojiCategory } from '@/lib/emojis';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

const Index = () => {
  const { t } = useLanguage();
  const { items, removeFromCart, clearCart, total } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<EmojiCategory>('all');

  const categories: { value: EmojiCategory; labelKey: string }[] = [
    { value: 'all', labelKey: 'allEmojis' },
    { value: 'gif', labelKey: 'gifEmojis' },
    { value: 'sound', labelKey: 'soundEmojis' },
    { value: 'animated', labelKey: 'animatedEmojis' },
    { value: 'word', labelKey: 'wordEmojis' },
    { value: 'standard', labelKey: 'standardEmojis' },
  ];

  const filtered = useMemo(() => {
    return MOCK_EMOJIS.filter(e => {
      const matchCat = category === 'all' || e.category === category;
      const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  const trending = MOCK_EMOJIS.filter(e => e.isTrending);
  const newArrivals = MOCK_EMOJIS.filter(e => e.isNew);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('marketplace')}
            </span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Discover & collect premium emojis</p>
        </div>

        {/* Cart Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative glass-card border-border">
              <ShoppingCart size={18} />
              {items.length > 0 && (
                <Badge className="absolute -top-2 -right-2 gradient-primary text-primary-foreground border-0 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                  {items.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="glass-card border-border">
            <SheetHeader>
              <SheetTitle className="text-foreground">{t('cart')}</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-3">
              {items.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Cart is empty</p>
              ) : (
                <>
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-primary">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-muted-foreground">{t('total')}</span>
                      <span className="text-foreground font-bold">${total.toFixed(2)}</span>
                    </div>
                    <Button className="w-full gradient-primary text-primary-foreground neon-glow">
                      {t('checkout')}
                    </Button>
                    <Button variant="ghost" onClick={clearCart} className="w-full mt-2 text-muted-foreground">
                      Clear Cart
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchEmojis')}
          className="pl-10 glass-card border-border"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Trending */}
      {!search && category === 'all' && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            🔥 {t('trending')}
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {trending.map((e, i) => (
              <div key={e.id} className="min-w-[160px]">
                <EmojiCard emoji={e} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {!search && category === 'all' && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            ✨ {t('newArrivals')}
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {newArrivals.map((e, i) => (
              <div key={e.id} className="min-w-[160px]">
                <EmojiCard emoji={e} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <Tabs value={category} onValueChange={(v) => setCategory(v as EmojiCategory)}>
        <TabsList className="glass-card border border-border mb-6 h-auto flex-wrap">
          {categories.map(c => (
            <TabsTrigger key={c.value} value={c.value} className="text-xs data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
              {t(c.labelKey)}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((e, i) => (
            <EmojiCard key={e.id} emoji={e} index={i} />
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
