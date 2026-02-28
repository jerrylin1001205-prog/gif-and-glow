import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trash2, Pencil, Download, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLibrary, LibraryItem } from '@/contexts/LibraryContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const Library = () => {
  const { items, removeItem, updateItem } = useLibrary();
  const { t } = useLanguage();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const startEdit = (item: LibraryItem) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  const saveEdit = () => {
    if (editingId && editName.trim()) {
      updateItem(editingId, { name: editName.trim() });
      setEditingId(null);
      toast({ title: t('saved') });
    }
  };

  const handleDownload = (item: LibraryItem) => {
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Transparent circular background
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (item.type === 'word') {
      ctx.font = `bold ${item.fontSize ? item.fontSize * 3 : 120}px ${item.fontFamily || 'sans-serif'}`;
      ctx.fillStyle = item.color || 'hsl(265, 90%, 65%)';
    } else {
      ctx.font = '200px sans-serif';
    }
    ctx.fillText(item.emoji, size / 2, size / 2);

    const link = document.createElement('a');
    link.download = `${item.name.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    toast({ title: t('downloaded') });
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          {t('myLibrary')}
        </span>
      </h1>
      <p className="text-muted-foreground mb-8 text-sm">{t('libraryDesc')} · {items.length} items</p>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <BookOpen size={48} className="text-muted-foreground/30 mb-4" />
          <h2 className="text-lg font-semibold text-muted-foreground">{t('noLibraryItems')}</h2>
          <p className="text-sm text-muted-foreground/70 mt-1">{t('addLibraryItems')}</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.03 }}
                className="glass-card rounded-xl p-4 relative group"
              >
                {/* Emoji display */}
                <div className="flex items-center justify-center h-20 mb-3">
                  {item.type === 'word' ? (
                    <span
                      className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                      style={{ fontFamily: item.fontFamily, color: item.color }}
                    >
                      {item.emoji}
                    </span>
                  ) : (
                    <span className={`text-5xl ${item.animation || ''}`}>{item.emoji}</span>
                  )}
                </div>

                {/* Name - editable */}
                {editingId === item.id ? (
                  <div className="flex gap-1">
                    <Input
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="h-7 text-xs"
                      autoFocus
                      onKeyDown={e => e.key === 'Enter' && saveEdit()}
                    />
                    <button onClick={saveEdit} className="text-neon-green"><Save size={14} /></button>
                    <button onClick={() => setEditingId(null)} className="text-muted-foreground"><X size={14} /></button>
                  </div>
                ) : (
                  <h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3>
                )}

                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {new Date(item.addedAt).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="flex gap-1 mt-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => startEdit(item)}
                    className="p-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-all flex-1 flex items-center justify-center"
                  >
                    <Pencil size={12} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDownload(item)}
                    className="p-1.5 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-all flex-1 flex items-center justify-center"
                  >
                    <Download size={12} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { removeItem(item.id); toast({ title: 'Deleted' }); }}
                    className="p-1.5 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-all flex-1 flex items-center justify-center"
                  >
                    <Trash2 size={12} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Library;
