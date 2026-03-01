import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, X, Check, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  itemName?: string;
  itemPrice?: number;
}

const UpgradeModal = ({ open, onClose, itemName, itemPrice }: UpgradeModalProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const proFeatures = [
    'Unlimited premium emoji downloads',
    'All GIF packs & sound emojis',
    'AI-powered emoji customization',
    'Export as animated GIF',
    'No watermarks',
    'Priority support',
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card rounded-2xl p-6 max-w-sm w-full border border-primary/30 relative"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>

            <div className="text-center mb-5">
              <div className="w-14 h-14 mx-auto rounded-full gradient-primary flex items-center justify-center mb-3 neon-glow">
                <Lock size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Premium Content</h3>
              {itemName && (
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="font-semibold text-primary">{itemName}</span> costs{' '}
                  <span className="font-bold text-foreground">${itemPrice?.toFixed(2)}</span>
                </p>
              )}
            </div>

            <div className="glass-card rounded-xl p-4 mb-5 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={16} className="text-primary" />
                <span className="text-sm font-bold text-foreground">Go Pro — $9.99/mo</span>
              </div>
              <div className="space-y-2">
                {proFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check size={14} className="text-neon-green shrink-0" />
                    <span className="text-xs text-muted-foreground">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => { onClose(); navigate('/pricing'); }}
                className="w-full gradient-primary text-primary-foreground neon-glow font-semibold"
              >
                <Crown size={16} className="mr-2" /> View Pro Plans
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full glass-card border-border text-muted-foreground text-xs">
                Maybe later
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpgradeModal;
