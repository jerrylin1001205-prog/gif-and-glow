import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Palette, Move, Download, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const FONTS = [
  { name: 'Space Grotesk', value: 'Space Grotesk, sans-serif' },
  { name: 'Cursive', value: 'cursive' },
  { name: 'Serif', value: 'Georgia, serif' },
  { name: 'Mono', value: 'JetBrains Mono, monospace' },
  { name: 'Fantasy', value: 'fantasy' },
  { name: 'Comic', value: '"Comic Sans MS", cursive' },
];

const COLORS = [
  'hsl(265, 90%, 65%)',
  'hsl(330, 85%, 65%)',
  'hsl(200, 80%, 60%)',
  'hsl(150, 80%, 55%)',
  'hsl(25, 95%, 60%)',
  'hsl(0, 80%, 60%)',
  'hsl(45, 90%, 55%)',
  'hsl(0, 0%, 95%)',
];

const ANIMATIONS = [
  { name: 'None', value: '' },
  { name: 'Bounce', value: 'animate-bounce' },
  { name: 'Pulse', value: 'animate-pulse' },
  { name: 'Spin', value: 'animate-spin' },
  { name: 'Float', value: 'animate-float' },
];

const Creator = () => {
  const { t } = useLanguage();
  const [text, setText] = useState('HELLO');
  const [font, setFont] = useState(FONTS[0].value);
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState([48]);
  const [animation, setAnimation] = useState('');
  const [saved, setSaved] = useState<Array<{ text: string; font: string; color: string; size: number; animation: string }>>([]);

  const handleSave = () => {
    setSaved(prev => [...prev, { text, font, color, size: size[0], animation }]);
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('createEmoji')}
        </span>
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">Design your own word-style emoji</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="glass-card rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
          <motion.div
            key={`${text}-${font}-${color}-${size[0]}-${animation}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={animation}
          >
            <span
              style={{
                fontFamily: font,
                fontSize: `${size[0]}px`,
                color,
                fontWeight: 'bold',
                textShadow: `0 0 20px ${color}40, 0 0 40px ${color}20`,
              }}
            >
              {text || 'Type...'}
            </span>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Text Input */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Type size={16} /> Text
            </label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 20))}
              placeholder="Enter text..."
              className="glass-card border-border"
              maxLength={20}
            />
            <p className="text-xs text-muted-foreground mt-1">{text.length}/20</p>
          </div>

          {/* Font */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t('fontStyle')}</label>
            <div className="grid grid-cols-3 gap-2">
              {FONTS.map(f => (
                <button
                  key={f.name}
                  onClick={() => setFont(f.value)}
                  className={`p-2 rounded-lg text-xs text-center transition-all ${
                    font === f.value ? 'gradient-primary text-primary-foreground neon-glow' : 'glass-card hover:bg-muted'
                  }`}
                  style={{ fontFamily: f.value }}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Palette size={16} /> {t('color')}
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-all ${color === c ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110' : ''}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {t('size')}: {size[0]}px
            </label>
            <Slider value={size} onValueChange={setSize} min={16} max={96} step={4} />
          </div>

          {/* Animation */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Move size={16} /> {t('animation')}
            </label>
            <div className="flex gap-2 flex-wrap">
              {ANIMATIONS.map(a => (
                <button
                  key={a.name}
                  onClick={() => setAnimation(a.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    animation === a.value ? 'gradient-primary text-primary-foreground' : 'glass-card hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full gradient-primary text-primary-foreground neon-glow">
            <Save size={16} className="mr-2" /> {t('save')}
          </Button>
        </div>
      </div>

      {/* Saved creations */}
      {saved.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Creations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {saved.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-xl p-4 flex items-center justify-center h-24"
              >
                <span
                  className={s.animation}
                  style={{ fontFamily: s.font, fontSize: `${Math.min(s.size, 32)}px`, color: s.color, fontWeight: 'bold' }}
                >
                  {s.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Creator;
