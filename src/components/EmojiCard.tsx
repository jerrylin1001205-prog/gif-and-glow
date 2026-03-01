import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check, Download, Lock } from 'lucide-react';
import { Emoji } from '@/lib/emojis';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import UpgradeModal from '@/components/UpgradeModal';

interface EmojiCardProps {
  emoji: Emoji;
  index?: number;
}

const EmojiCard = ({ emoji, index = 0 }: EmojiCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const { addItem } = useLibrary();
  const { t } = useLanguage();
  const starred = isFavorite(emoji.id);
  const inCart = isInCart(emoji.id);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const isPaid = emoji.price > 0;

  const handleDownload = () => {
    if (isPaid) {
      setShowUpgrade(true);
      return;
    }

    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (emoji.category === 'word') {
      ctx.font = `bold 120px ${emoji.fontFamily || 'sans-serif'}`;
      ctx.fillStyle = '#a855f7';
    } else {
      ctx.font = '200px sans-serif';
    }
    ctx.fillText(emoji.emoji, size / 2, size / 2);

    const link = document.createElement('a');
    link.download = `${emoji.name.toLowerCase().replace(/\s+/g, '-')}-emojiverse.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    addItem({
      name: emoji.name,
      emoji: emoji.emoji,
      type: emoji.category === 'all' ? 'standard' : (emoji.category as any),
      fontFamily: emoji.fontFamily,
      animation: emoji.animationClass,
    });

    toast({
      title: t('downloaded'),
      description: `${emoji.name} saved to your library! 🎉`,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="glass-card rounded-xl p-4 relative group"
      >
        {/* Badges */}
        <div className="absolute top-2 right-2 flex gap-1 z-10">
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
          className="absolute top-2 left-2 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1"
        >
          <Star size={16} className={starred ? 'fill-neon-orange text-neon-orange' : 'text-muted-foreground'} />
        </button>

        {/* Emoji display */}
        <div className="flex items-center justify-center h-20 mb-3 relative">
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
          {/* Paid overlay */}
          {isPaid && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute bottom-0 right-0 p-1 rounded-full bg-primary/20">
                <Lock size={10} className="text-primary" />
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className="text-sm font-semibold text-foreground truncate">{emoji.name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">by {emoji.creator}</p>

        {/* Price + actions */}
        <div className="flex items-center justify-between mt-3">
          <span className={`text-sm font-bold ${emoji.price === 0 ? 'text-neon-green' : 'text-primary'}`}>
            {emoji.price === 0 ? t('free') : `$${emoji.price.toFixed(2)}`}
          </span>
          <div className="flex gap-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); handleDownload(); }}
              className={`p-1.5 rounded-lg transition-all ${
                isPaid
                  ? 'bg-primary/20 text-primary hover:bg-primary/30'
                  : 'bg-secondary/20 text-secondary hover:bg-secondary/30'
              }`}
              title={isPaid ? 'Pro required' : t('download')}
            >
              {isPaid ? <Lock size={14} /> : <Download size={14} />}
            </motion.button>
            {isPaid && (
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
        </div>
      </motion.div>

      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        itemName={emoji.name}
        itemPrice={emoji.price}
      />
    </>
  );
};

export default EmojiCard;
