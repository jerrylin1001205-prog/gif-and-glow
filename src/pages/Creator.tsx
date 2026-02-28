import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Type, Palette, Move, Download, Save, Wand2, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { toast } from '@/hooks/use-toast';

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
  { name: 'Wiggle', value: 'animate-wiggle' },
];

const AI_SUGGESTIONS = [
  'Make it look like fire 🔥',
  'Neon glow style ✨',
  'Retro pixel look 👾',
  'Elegant gold script 👑',
  'Ice cold vibes ❄️',
  'Rainbow party 🌈',
];

const Creator = () => {
  const { t } = useLanguage();
  const { addItem } = useLibrary();
  const [text, setText] = useState('HELLO');
  const [font, setFont] = useState(FONTS[0].value);
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState([48]);
  const [animation, setAnimation] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [saved, setSaved] = useState<Array<{ text: string; font: string; color: string; size: number; animation: string }>>([]);

  const handleSave = () => {
    setSaved(prev => [...prev, { text, font, color, size: size[0], animation }]);
    addItem({
      name: text || 'Custom Emoji',
      emoji: text,
      type: 'word',
      color,
      fontFamily: font,
      fontSize: size[0],
      animation,
    });
    toast({ title: t('saved'), description: 'Emoji saved to your library!' });
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const canvasSize = 512;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Transparent circular crop
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.beginPath();
    ctx.arc(canvasSize / 2, canvasSize / 2, canvasSize / 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.min(size[0] * 2, 160)}px ${font}`;
    ctx.fillStyle = color;
    ctx.fillText(text || 'EMOJI', canvasSize / 2, canvasSize / 2);

    const link = document.createElement('a');
    link.download = `${text.toLowerCase().replace(/\s+/g, '-') || 'emoji'}-custom.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    // Also save to library
    addItem({
      name: text || 'Custom Emoji',
      emoji: text,
      type: 'word',
      color,
      fontFamily: font,
      fontSize: size[0],
      animation,
    });

    toast({ title: t('downloaded'), description: 'Share it on Instagram, Facebook, X, and more! 📱' });
  };

  const handleAiCustomize = (prompt: string) => {
    setIsAiLoading(true);
    setTimeout(() => {
      const lower = prompt.toLowerCase();
      if (lower.includes('fire') || lower.includes('hot')) {
        setColor('hsl(25, 95%, 60%)');
        setFont('fantasy');
        setAnimation('animate-pulse');
      } else if (lower.includes('neon') || lower.includes('glow')) {
        setColor('hsl(265, 90%, 65%)');
        setAnimation('animate-pulse');
      } else if (lower.includes('retro') || lower.includes('pixel')) {
        setFont('JetBrains Mono, monospace');
        setColor('hsl(150, 80%, 55%)');
        setAnimation('');
      } else if (lower.includes('gold') || lower.includes('elegant')) {
        setColor('hsl(45, 90%, 55%)');
        setFont('Georgia, serif');
        setAnimation('');
      } else if (lower.includes('ice') || lower.includes('cold') || lower.includes('frozen')) {
        setColor('hsl(200, 80%, 60%)');
        setAnimation('animate-float');
      } else if (lower.includes('rainbow') || lower.includes('party')) {
        setColor('hsl(330, 85%, 65%)');
        setFont('cursive');
        setAnimation('animate-bounce');
      } else {
        setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
        setFont(FONTS[Math.floor(Math.random() * FONTS.length)].value);
        setAnimation(ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)].value);
      }
      setIsAiLoading(false);
      toast({ title: '✨ AI Applied!', description: `Style updated based on: "${prompt}"` });
    }, 1200);
  };

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('createEmoji')}
        </span>
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">{t('designYourOwn')}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="space-y-4">
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

          <Button onClick={handleDownload} variant="outline" className="w-full glass-card border-border">
            <Download size={16} className="mr-2" /> {t('downloadForSocial')}
          </Button>
        </div>

        {/* Controls */}
        <div className="space-y-5">
          {/* AI Customize */}
          <div className="glass-card rounded-xl p-4 border border-primary/30">
            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Wand2 size={16} className="text-primary" /> {t('aiCustomize')}
            </label>
            <div className="flex gap-2 mt-2">
              <Input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder={t('aiPlaceholder')}
                className="glass-card border-border flex-1"
                onKeyDown={(e) => { if (e.key === 'Enter' && aiPrompt) handleAiCustomize(aiPrompt); }}
              />
              <Button
                onClick={() => aiPrompt && handleAiCustomize(aiPrompt)}
                disabled={isAiLoading || !aiPrompt}
                className="gradient-primary text-primary-foreground"
                size="sm"
              >
                {isAiLoading ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap mt-3">
              {AI_SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => { setAiPrompt(s); handleAiCustomize(s); }}
                  className="text-[11px] px-2.5 py-1 rounded-full glass-card text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Type size={16} /> {t('textLabel')}
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
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('yourCreations')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {saved.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-xl p-4 flex items-center justify-center h-24 cursor-pointer hover:neon-glow transition-all"
                onClick={() => {
                  setText(s.text);
                  setFont(s.font);
                  setColor(s.color);
                  setSize([s.size]);
                  setAnimation(s.animation);
                }}
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
