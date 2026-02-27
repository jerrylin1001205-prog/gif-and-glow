import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Star, Trophy, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const FEATURES = [
  { icon: Sparkles, titleKey: 'featureMarketplace', descKey: 'featureMarketplaceDesc', color: 'text-primary', to: '/marketplace' },
  { icon: Palette, titleKey: 'featureCreator', descKey: 'featureCreatorDesc', color: 'text-accent', to: '/creator' },
  { icon: Download, titleKey: 'featureDownload', descKey: 'featureDownloadDesc', color: 'text-secondary', to: '/marketplace' },
  { icon: Star, titleKey: 'featureFavorites', descKey: 'featureFavoritesDesc', color: 'text-neon-orange', to: '/favorites' },
  { icon: Trophy, titleKey: 'featureLeaderboard', descKey: 'featureLeaderboardDesc', color: 'text-neon-green', to: '/leaderboard' },
];

const TUTORIAL_STEPS = [
  { step: 1, titleKey: 'tutStep1', descKey: 'tutStep1Desc', emoji: '🛒' },
  { step: 2, titleKey: 'tutStep2', descKey: 'tutStep2Desc', emoji: '🎨' },
  { step: 3, titleKey: 'tutStep3', descKey: 'tutStep3Desc', emoji: '⬇️' },
  { step: 4, titleKey: 'tutStep4', descKey: 'tutStep4Desc', emoji: '📱' },
];

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-4 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 max-w-6xl mx-auto text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl lg:text-8xl mb-6">🌈</div>
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              EmojiVerse
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('heroDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace">
              <Button size="lg" className="gradient-primary text-primary-foreground neon-glow text-base px-8">
                {t('exploreMarketplace')} <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/creator">
              <Button size="lg" variant="outline" className="glass-card border-border text-base px-8">
                {t('startCreating')}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Floating emojis background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {['🔥', '💎', '🚀', '✨', '👑', '💖', '🎉', '⚡'].map((e, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl lg:text-5xl opacity-10"
              style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {e}
            </motion.span>
          ))}
        </div>
      </section>

      {/* How to Use - Tutorial */}
      <section className="px-4 lg:px-8 py-12 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl lg:text-3xl font-bold text-center text-foreground mb-10"
        >
          {t('howToUse')}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TUTORIAL_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center relative"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                {step.step}
              </div>
              <div className="text-4xl mb-4">{step.emoji}</div>
              <h3 className="text-sm font-bold text-foreground mb-2">{t(step.titleKey)}</h3>
              <p className="text-xs text-muted-foreground">{t(step.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 lg:px-8 py-12 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl lg:text-3xl font-bold text-center text-foreground mb-10"
        >
          {t('features')}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Link key={i} to={f.to}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card rounded-2xl p-6 cursor-pointer h-full"
              >
                <f.icon size={28} className={f.color + ' mb-4'} />
                <h3 className="text-base font-bold text-foreground mb-2">{t(f.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(f.descKey)}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-10 max-w-3xl mx-auto neon-glow"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{t('readyToStart')}</h2>
          <p className="text-muted-foreground mb-6">{t('readyToStartDesc')}</p>
          <Link to="/creator">
            <Button size="lg" className="gradient-primary text-primary-foreground text-base px-10">
              {t('createNow')} <Sparkles size={18} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
