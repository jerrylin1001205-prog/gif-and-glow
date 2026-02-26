import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import EmojiCard from '@/components/EmojiCard';
import { MOCK_EMOJIS } from '@/lib/emojis';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Favorites = () => {
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  const favEmojis = MOCK_EMOJIS.filter(e => favorites.has(e.id));

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        <span className="bg-gradient-to-r from-neon-orange to-accent bg-clip-text text-transparent">
          {t('favorites')}
        </span>
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">{favorites.size} items</p>

      {favEmojis.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <Star size={48} className="text-muted-foreground/30 mb-4" />
          <h2 className="text-lg font-semibold text-muted-foreground">{t('noFavorites')}</h2>
          <p className="text-sm text-muted-foreground/70 mt-1">{t('addFavorites')}</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {favEmojis.map((e, i) => (
            <EmojiCard key={e.id} emoji={e} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
