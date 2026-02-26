import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Emoji } from '@/lib/emojis';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmojiCardProps {
  emoji: Emoji;
  index?: number;
}

const EmojiCard = ({ emoji, index = 0 }: EmojiCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const { t } = useLanguage();
  const starred = isFavorite(emoji.id);
  const inCart = isInCart(emoji.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card rounded-xl p-4 relative group cursor-pointer"
    >
      {/* Badges */}
      <div className="absolute top-2 right-2 flex gap-1">
        {emoji.isNew && (
          <span className="text-[10px] px-2 py-0.5 rounded-full gradient-secondary text-secondary-foreground font-bold">NEW</span>
        )}
        {emoji.isTrending && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-orange/20 text-neon-orange font-bold">🔥</span>
        )}
      </div>

      {/* Star button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleFavorite(emoji.id); }}
        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Star size={16} className={starred ? 'fill-neon-orange text-neon-orange' : 'text-muted-foreground'} />
      </button>

      {/* Emoji display */}
      <div className="flex items-center justify-center h-20 mb-3">
        {emoji.category === 'word' ? (
          <span
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            style={{ fontFamily: emoji.fontFamily }}
          >
            {emoji.emoji}
          </span>
        ) : (
          <span className={`text-5xl ${emoji.animationClass || ''}`}>
            {emoji.emoji}
          </span>
        )}
      </div>

      {/* Info */}
      <h3 className="text-sm font-semibold text-foreground truncate">{emoji.name}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">by {emoji.creator}</p>

      {/* Price + action */}
      <div className="flex items-center justify-between mt-3">
        <span className={`text-sm font-bold ${emoji.price === 0 ? 'text-neon-green' : 'text-primary'}`}>
          {emoji.price === 0 ? t('free') : `$${emoji.price.toFixed(2)}`}
        </span>
        {emoji.price > 0 && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); addToCart(emoji); }}
            className={`p-1.5 rounded-lg transition-all ${
              inCart
                ? 'bg-neon-green/20 text-neon-green'
                : 'bg-primary/20 text-primary hover:bg-primary/30'
            }`}
          >
            {inCart ? <Check size={14} /> : <ShoppingCart size={14} />}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default EmojiCard;
