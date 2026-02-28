import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Moon, Sun, Image, Eye, EyeOff, User, Bell, BellOff, Shield, ChevronRight, LogOut, HelpCircle, FileText, Info, Camera } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LANGUAGES } from '@/lib/i18n';
import { BACKGROUNDS } from '@/lib/emojis';

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme, background, setBackground } = useTheme();
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);
  const [displayName, setDisplayName] = useState('EmojiLover');
  const [bio, setBio] = useState('Creating awesome emojis ✨');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [newEmojiAlerts, setNewEmojiAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('profile');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleAvatarUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setAvatarUrl(ev.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const SectionHeader = ({ icon: Icon, title, section, iconColor = 'text-primary' }: { icon: any; title: string; section: string; iconColor?: string }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors rounded-xl"
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className={iconColor} />
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      <ChevronRight size={16} className={`text-muted-foreground transition-transform ${expandedSection === section ? 'rotate-90' : ''}`} />
    </button>
  );

  return (
    <div className="p-4 lg:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t('settings')}
        </span>
      </h1>

      <div className="space-y-3">
        {/* Profile Section */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <SectionHeader icon={User} title={t('editProfile')} section="profile" />
          {expandedSection === 'profile' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="px-4 pb-4 space-y-4"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-primary/30">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-primary/20 to-accent/20">
                      {displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={handleAvatarUpload}
                    className="absolute -bottom-1 -right-1 p-1.5 rounded-full gradient-primary text-primary-foreground"
                  >
                    <Camera size={12} />
                  </button>
                </div>
                <div className="flex-1">
                  <Button variant="outline" size="sm" onClick={handleAvatarUpload} className="glass-card border-border text-xs">
                    {t('changeAvatar')}
                  </Button>
                </div>
              </div>

              {/* Name & Bio */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t('displayName')}</label>
                <Input value={displayName} onChange={e => setDisplayName(e.target.value)} className="glass-card border-border" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">{t('bio')}</label>
                <Input value={bio} onChange={e => setBio(e.target.value)} className="glass-card border-border" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Theme */}
        <div className="glass-card rounded-2xl p-4">
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
        <div className="glass-card rounded-2xl overflow-hidden">
          <SectionHeader icon={Globe} title={t('language')} section="language" iconColor="text-secondary" />
          {expandedSection === 'language' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="px-4 pb-4"
            >
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
            </motion.div>
          )}
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <SectionHeader icon={Bell} title={t('notifications')} section="notifications" iconColor="text-neon-green" />
          {expandedSection === 'notifications' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="px-4 pb-4 space-y-3"
            >
              {[
                { label: t('pushNotifications'), value: pushNotifs, onChange: setPushNotifs },
                { label: t('emailNotifications'), value: emailNotifs, onChange: setEmailNotifs },
                { label: t('newEmojiAlerts'), value: newEmojiAlerts, onChange: setNewEmojiAlerts },
                { label: t('weeklyDigest'), value: weeklyDigest, onChange: setWeeklyDigest },
              ].map(({ label, value, onChange }) => (
                <div key={label} className="flex items-center justify-between py-1">
                  <span className="text-sm text-foreground">{label}</span>
                  <Switch checked={value} onCheckedChange={onChange} />
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Privacy */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <SectionHeader icon={Shield} title={t('privacy')} section="privacy" iconColor="text-accent" />
          {expandedSection === 'privacy' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="px-4 pb-4 space-y-3"
            >
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm text-foreground">{t('showOnLeaderboard')}</p>
                  <p className="text-xs text-muted-foreground">
                    {showOnLeaderboard ? 'Visible on leaderboard' : 'Appear as Anonymous'}
                  </p>
                </div>
                <Switch checked={showOnLeaderboard} onCheckedChange={setShowOnLeaderboard} />
              </div>
              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm text-foreground">{t('privateAccount')}</p>
                  <p className="text-xs text-muted-foreground">Only approved followers</p>
                </div>
                <Switch checked={privateAccount} onCheckedChange={setPrivateAccount} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Backgrounds */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <SectionHeader icon={Image} title={t('chooseBackground')} section="backgrounds" iconColor="text-neon-orange" />
          {expandedSection === 'backgrounds' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="px-4 pb-4"
            >
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
            </motion.div>
          )}
        </div>

        {/* About */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <SectionHeader icon={Info} title={t('about')} section="about" iconColor="text-muted-foreground" />
          {expandedSection === 'about' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="px-4 pb-4 space-y-2"
            >
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-foreground">{t('version')}</span>
                <span className="text-sm text-muted-foreground">2.0.0</span>
              </div>
              <Separator />
              {[t('termsOfService'), t('privacyPolicy'), t('helpCenter')].map(item => (
                <button key={item} className="w-full flex items-center justify-between py-2 text-sm text-foreground hover:text-primary transition-colors">
                  {item}
                  <ChevronRight size={14} className="text-muted-foreground" />
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Log Out */}
        <button className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 hover:bg-destructive/10 transition-colors">
          <LogOut size={20} className="text-destructive" />
          <span className="text-sm font-semibold text-destructive">{t('logOut')}</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
