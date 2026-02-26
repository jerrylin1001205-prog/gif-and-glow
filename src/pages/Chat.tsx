import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  emoji?: string;
}

const CONTACTS = [
  { id: '1', name: 'Alice ✨', avatar: '👩‍🎨', lastMsg: 'Check this emoji! 🔥', online: true },
  { id: '2', name: 'Bob 🎮', avatar: '👨‍💻', lastMsg: 'GG bro', online: true },
  { id: '3', name: 'Charlie 🎵', avatar: '🎤', lastMsg: 'New sound pack!', online: false },
  { id: '4', name: 'Diana 💎', avatar: '👸', lastMsg: 'Love the new update', online: true },
];

const QUICK_EMOJIS = ['😀', '😂', '❤️', '🔥', '👍', '🎉', '💯', '✨', '🚀', '💖', '😎', '🥳'];

const Chat = () => {
  const { t } = useLanguage();
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey! Check out this new emoji pack 🎨', sender: 'other', timestamp: new Date(Date.now() - 300000) },
    { id: '2', text: 'Wow looks amazing! 🔥🔥', sender: 'me', timestamp: new Date(Date.now() - 240000) },
    { id: '3', text: 'Right?! I just bought the premium bundle', sender: 'other', timestamp: new Date(Date.now() - 180000) },
    { id: '4', text: 'YOLO', sender: 'me', timestamp: new Date(Date.now() - 60000), emoji: 'word' },
  ]);
  const [input, setInput] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: input,
      sender: 'me',
      timestamp: new Date(),
    }]);
    setInput('');
    setShowEmojis(false);

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: ['Nice! 😄', 'Love it! 💖', 'Haha 🤣', 'Cool! 🚀', 'Amazing ✨'][Math.floor(Math.random() * 5)],
        sender: 'other',
        timestamp: new Date(),
      }]);
    }, 1500);
  };

  return (
    <div className="h-screen md:h-[calc(100vh-0px)] flex">
      {/* Contacts sidebar */}
      <div className="w-20 md:w-72 glass-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="hidden md:block text-lg font-bold text-foreground">{t('chat')}</h2>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {CONTACTS.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedContact(c)}
              className={`w-full flex items-center gap-3 p-3 md:p-4 transition-all ${
                selectedContact.id === c.id ? 'bg-primary/10 border-r-2 border-primary' : 'hover:bg-muted/50'
              }`}
            >
              <div className="relative">
                <span className="text-2xl">{c.avatar}</span>
                {c.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-neon-green border-2 border-background" />
                )}
              </div>
              <div className="hidden md:block text-left flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-card border-b border-border p-4 flex items-center gap-3">
          <span className="text-2xl">{selectedContact.avatar}</span>
          <div>
            <p className="font-semibold text-foreground text-sm">{selectedContact.name}</p>
            <p className="text-xs text-neon-green">{selectedContact.online ? 'Online' : 'Offline'}</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.sender === 'me'
                      ? 'gradient-primary text-primary-foreground rounded-br-md'
                      : 'glass-card text-foreground rounded-bl-md'
                  }`}
                >
                  {msg.text}
                  <div className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick emoji bar */}
        <AnimatePresence>
          {showEmojis && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border px-4 py-2 flex gap-2 flex-wrap overflow-hidden"
            >
              {QUICK_EMOJIS.map(e => (
                <button
                  key={e}
                  onClick={() => setInput(prev => prev + e)}
                  className="text-2xl hover:scale-125 transition-transform"
                >
                  {e}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <div className="p-4 border-t border-border flex items-center gap-2">
          <button
            onClick={() => setShowEmojis(!showEmojis)}
            className={`p-2 rounded-lg transition-all ${showEmojis ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Smile size={20} />
          </button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={t('typeMessage')}
            className="flex-1 glass-card border-border"
          />
          <Button onClick={sendMessage} className="gradient-primary text-primary-foreground neon-glow" size="icon">
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
