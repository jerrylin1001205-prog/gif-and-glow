import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Film, Play, Pause, Plus, Download, Pencil, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { EXAMPLE_GIFS, GifEmoji } from '@/lib/emojis';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLibrary } from '@/contexts/LibraryContext';
import { toast } from '@/hooks/use-toast';

const GifPlayer = ({ gif, size = 'lg' }: { gif: GifEmoji; size?: 'sm' | 'lg' }) => {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % gif.frames.length);
    }, gif.speed);
    return () => clearInterval(interval);
  }, [gif.frames.length, gif.speed]);

  return (
    <span className={size === 'lg' ? 'text-6xl' : 'text-4xl'}>
      {gif.frames[frameIndex]}
    </span>
  );
};

const GifStudio = () => {
  const { t } = useLanguage();
  const { addItem } = useLibrary();
  const [selectedGif, setSelectedGif] = useState<GifEmoji | null>(null);
  const [customFrames, setCustomFrames] = useState<string[]>(['😀', '😃', '😄', '😁']);
  const [customName, setCustomName] = useState('My GIF');
  const [customSpeed, setCustomSpeed] = useState([400]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [frameIndex, setFrameIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % customFrames.length);
    }, customSpeed[0]);
    return () => clearInterval(interval);
  }, [isPlaying, customFrames.length, customSpeed]);

  const addFrame = () => {
    setCustomFrames([...customFrames, '😊']);
  };

  const updateFrame = (index: number, value: string) => {
    const newFrames = [...customFrames];
    newFrames[index] = value;
    setCustomFrames(newFrames);
  };

  const removeFrame = (index: number) => {
    if (customFrames.length > 2) {
      setCustomFrames(customFrames.filter((_, i) => i !== index));
    }
  };

  const handleSaveToLibrary = () => {
    addItem({
      name: customName,
      emoji: customFrames.join(''),
      type: 'gif',
      animation: 'animate-pulse',
    });
    toast({ title: t('saved'), description: 'GIF saved to your library!' });
  };

  const loadExample = (gif: GifEmoji) => {
    setCustomFrames([...gif.frames]);
    setCustomName(gif.name);
    setCustomSpeed([gif.speed]);
    setSelectedGif(gif);
    setEditMode(true);
  };

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        <span className="bg-gradient-to-r from-accent to-neon-orange bg-clip-text text-transparent">
          {t('gifTab')} Studio
        </span>
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">{t('createGif')} & {t('editGif')}</p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* GIF Creator/Editor */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Film size={18} className="text-accent" />
              {editMode ? t('editGif') : t('createGif')}
            </h2>

            {/* Preview */}
            <div className="glass-card rounded-xl p-8 flex items-center justify-center min-h-[200px] mb-4">
              <motion.div key={frameIndex} initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.1 }}>
                <span className="text-7xl">{customFrames[frameIndex]}</span>
              </motion.div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="glass-card border-border"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              <span className="text-xs text-muted-foreground">Frame {frameIndex + 1}/{customFrames.length}</span>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1 block">Name</label>
              <Input value={customName} onChange={e => setCustomName(e.target.value)} className="glass-card border-border" />
            </div>

            {/* Speed */}
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1 block">Speed: {customSpeed[0]}ms</label>
              <Slider value={customSpeed} onValueChange={setCustomSpeed} min={100} max={1000} step={50} />
            </div>

            {/* Frames editor */}
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-2 block">Frames</label>
              <div className="flex flex-wrap gap-2">
                {customFrames.map((frame, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <Input
                      value={frame}
                      onChange={e => updateFrame(i, e.target.value)}
                      className="w-16 h-10 text-center text-xl glass-card border-border p-0"
                      maxLength={2}
                    />
                    {customFrames.length > 2 && (
                      <button onClick={() => removeFrame(i)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addFrame} className="glass-card border-border h-10">
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleSaveToLibrary} className="flex-1 gradient-primary text-primary-foreground neon-glow">
                {t('save')}
              </Button>
              <Button variant="outline" className="glass-card border-border">
                <Download size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Example GIFs */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            ✨ {t('exampleGifs')}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {EXAMPLE_GIFS.map((gif) => (
              <motion.div
                key={gif.id}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card rounded-xl p-4 cursor-pointer relative group"
                onClick={() => loadExample(gif)}
              >
                {gif.isNew && (
                  <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full gradient-secondary text-secondary-foreground font-bold">NEW</span>
                )}
                <div className="flex items-center justify-center h-16 mb-3">
                  <GifPlayer gif={gif} size="sm" />
                </div>
                <h3 className="text-sm font-semibold text-foreground truncate">{gif.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs font-bold ${gif.price === 0 ? 'text-neon-green' : 'text-primary'}`}>
                    {gif.price === 0 ? t('free') : `$${gif.price.toFixed(2)}`}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{gif.creator}</span>
                </div>
                {/* Edit overlay */}
                <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-semibold text-primary flex items-center gap-1">
                    <Pencil size={12} /> {t('editGif')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifStudio;
