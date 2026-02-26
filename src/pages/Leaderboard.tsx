import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Eye, EyeOff } from 'lucide-react';
import { LEADERBOARD_DATA } from '@/lib/emojis';
import { useLanguage } from '@/contexts/LanguageContext';

const medals = ['🥇', '🥈', '🥉'];

const Leaderboard = () => {
  const { t } = useLanguage();

  return (
    <div className="p-4 lg:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        <span className="bg-gradient-to-r from-neon-orange to-primary bg-clip-text text-transparent">
          {t('weeklyTop')}
        </span>
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">Top emoji creators this week</p>

      {/* Top 3 podium */}
      <div className="flex items-end justify-center gap-4 mb-10">
        {[1, 0, 2].map(idx => {
          const entry = LEADERBOARD_DATA[idx];
          const heights = ['h-32', 'h-24', 'h-20'];
          const orderHeights = [1, 0, 2];
          return (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl mb-2">{entry.avatar}</span>
              <p className="text-sm font-semibold text-foreground mb-1">
                {entry.showName ? entry.name : 'Anonymous'}
              </p>
              <p className="text-xs text-primary font-bold mb-2">{entry.score.toLocaleString()}</p>
              <div
                className={`w-20 rounded-t-xl flex items-start justify-center pt-3 ${
                  idx === 1 ? 'gradient-primary neon-glow h-36' :
                  idx === 0 ? 'bg-neon-orange/30 h-28' :
                  'bg-neon-blue/30 h-20'
                }`}
              >
                <span className="text-3xl">{medals[entry.rank - 1]}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full list */}
      <div className="space-y-2">
        {LEADERBOARD_DATA.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card rounded-xl p-4 flex items-center gap-4 ${
              entry.rank <= 3 ? 'border border-primary/30' : ''
            }`}
          >
            <span className={`text-lg font-bold w-8 text-center ${
              entry.rank <= 3 ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {entry.rank <= 3 ? medals[entry.rank - 1] : `#${entry.rank}`}
            </span>
            <span className="text-2xl">{entry.avatar}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                {entry.showName ? entry.name : 'Anonymous'}
                {!entry.showName && <EyeOff size={12} className="text-muted-foreground" />}
              </p>
            </div>
            <span className="text-sm font-bold text-primary">{entry.score.toLocaleString()}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
