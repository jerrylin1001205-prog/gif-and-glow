import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Moon, Sun, Image, Eye, EyeOff, User } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LANGUAGES } from '@/lib/i18n';
import { BACKGROUNDS } from '@/lib/emojis';

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme, background, setBackground } = useTheme();
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);

  return (
    <div className="p-4 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t('settings')}
        </span>
      </h1>

      <div className="space-y-6">
        {/* Theme */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDark ? <Moon size={20} className="text-primary" /> : <Sun size={20} className="text-neon-orange" />}
              <div>
                <p className="text-sm font-semibold text-foreground">{t('theme')}</p>
                <p className="text-xs text-muted-foreground">{isDark ? t('darkMode') : t('lightMode')}</p>
              </div>
            </div>
            <Switch checked={isDark} onCheckedChange={toggleTheme} />
          </div>
        </div>

        {/* Language */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe size={20} className="text-secondary" />
            <p className="text-sm font-semibold text-foreground">{t('language')}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-lg text-sm text-left transition-all ${
                  language === lang.code
                    ? 'gradient-primary text-primary-foreground neon-glow'
                    : 'glass-card hover:bg-muted text-foreground'
                }`}
              >
                <p className="font-medium">{lang.nativeName}</p>
                <p className={`text-xs ${language === lang.code ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {lang.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Privacy */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showOnLeaderboard ? <Eye size={20} className="text-neon-green" /> : <EyeOff size={20} className="text-muted-foreground" />}
              <div>
                <p className="text-sm font-semibold text-foreground">{t('showOnLeaderboard')}</p>
                <p className="text-xs text-muted-foreground">
                  {showOnLeaderboard ? 'Your name is visible on the leaderboard' : 'You appear as Anonymous'}
                </p>
              </div>
            </div>
            <Switch checked={showOnLeaderboard} onCheckedChange={setShowOnLeaderboard} />
          </div>
        </div>

        {/* Backgrounds */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Image size={20} className="text-accent" />
            <p className="text-sm font-semibold text-foreground">{t('chooseBackground')}</p>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => setBackground(null)}
              className={`aspect-square rounded-xl border-2 transition-all flex items-center justify-center text-xs text-muted-foreground ${
                !background ? 'border-primary neon-glow' : 'border-border hover:border-muted-foreground'
              }`}
            >
              Default
            </button>
            {BACKGROUNDS.map(bg => (
              <button
                key={bg.id}
                onClick={() => setBackground(bg.gradient)}
                className={`aspect-square rounded-xl border-2 transition-all ${
                  background === bg.gradient ? 'border-primary neon-glow' : 'border-border hover:border-muted-foreground'
                }`}
                style={{ background: bg.gradient }}
                title={bg.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
