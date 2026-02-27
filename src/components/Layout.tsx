import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Store, Sparkles, Trophy, Settings, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const { background } = useTheme();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/marketplace', icon: Store, label: t('marketplace') },
    { path: '/creator', icon: Sparkles, label: t('creator') },
    { path: '/favorites', icon: Star, label: t('favorites') },
    { path: '/leaderboard', icon: Trophy, label: t('leaderboard') },
    { path: '/settings', icon: Settings, label: t('settings') },
  ];

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={background ? { background } : undefined}
    >
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 glass-card border-r border-border fixed h-full z-40">
        <div className="p-4 lg:p-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-2xl lg:text-3xl">🌈</span>
            <span className="hidden lg:block text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('appName')}
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-2 lg:px-4 space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = pathname === path;
            return (
              <Link key={path} to={path}>
                <motion.div
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'gradient-primary text-primary-foreground neon-glow'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Icon size={20} />
                  <span className="hidden lg:block text-sm font-medium">{label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-20 lg:ml-64 pb-20 md:pb-0">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-border z-50">
        <div className="flex justify-around items-center h-16 px-1">
          {navItems.slice(0, 5).map(({ path, icon: Icon, label }) => {
            const isActive = pathname === path;
            return (
              <Link key={path} to={path} className="flex flex-col items-center gap-0.5 min-w-0">
                <motion.div
                  className={`p-2 rounded-xl transition-all ${
                    isActive ? 'gradient-primary text-primary-foreground neon-glow' : 'text-muted-foreground'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} />
                </motion.div>
                <span className={`text-[9px] truncate ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
