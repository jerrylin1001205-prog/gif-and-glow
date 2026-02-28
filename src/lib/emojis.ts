export type EmojiCategory = 'all' | 'gif' | 'sound' | 'animated' | 'word' | 'standard';

export interface Emoji {
  id: string;
  name: string;
  emoji: string;
  category: EmojiCategory;
  price: number;
  creator: string;
  likes: number;
  isNew?: boolean;
  isTrending?: boolean;
  animationClass?: string;
  fontFamily?: string;
}

export interface GifEmoji {
  id: string;
  name: string;
  frames: string[];
  speed: number; // ms per frame
  price: number;
  creator: string;
  isNew?: boolean;
}

export const MOCK_EMOJIS: Emoji[] = [
  // Standard (free)
  { id: '1', name: 'Fire', emoji: '🔥', category: 'standard', price: 0, creator: 'EmojiTeam', likes: 4520 },
  { id: '2', name: 'Heart Eyes', emoji: '😍', category: 'standard', price: 0, creator: 'EmojiTeam', likes: 3891 },
  { id: '3', name: 'Rocket', emoji: '🚀', category: 'standard', price: 0, creator: 'EmojiTeam', likes: 3200 },
  { id: '4', name: 'Star', emoji: '⭐', category: 'standard', price: 0, creator: 'EmojiTeam', likes: 2800 },
  { id: '5', name: 'Lightning', emoji: '⚡', category: 'standard', price: 0, creator: 'EmojiTeam', likes: 2500 },
  { id: '6', name: 'Crown', emoji: '👑', category: 'standard', price: 0, creator: 'EmojiTeam', likes: 2100 },
  { id: '7', name: 'Diamond', emoji: '💎', category: 'standard', price: 0, creator: 'EmojiTeam', likes: 1950 },
  { id: '8', name: 'Sparkles', emoji: '✨', category: 'standard', price: 0, creator: 'EmojiTeam', likes: 1800 },
  // GIF-style (animated CSS)
  { id: '10', name: 'LOL Pack', emoji: '🤣', category: 'gif', price: 1.99, creator: 'GifMaster', likes: 890, isTrending: true, animationClass: 'animate-bounce' },
  { id: '11', name: 'Dance Pack', emoji: '💃', category: 'gif', price: 2.99, creator: 'GifMaster', likes: 760, animationClass: 'animate-wiggle' },
  { id: '12', name: 'Party Pack', emoji: '🎉', category: 'gif', price: 1.49, creator: 'PartyKing', likes: 650, isNew: true, animationClass: 'animate-pulse' },
  { id: '13', name: 'Love Pack', emoji: '💖', category: 'gif', price: 2.49, creator: 'LoveEmoji', likes: 1200, animationClass: 'animate-heartbeat' },
  { id: '14', name: 'Cool Pack', emoji: '😎', category: 'gif', price: 0.99, creator: 'CoolDude', likes: 540, animationClass: 'animate-float' },
  { id: '15', name: 'Clap Pack', emoji: '👏', category: 'gif', price: 1.29, creator: 'GifMaster', likes: 430, isNew: true, animationClass: 'animate-shake' },
  { id: '16', name: 'Wave Pack', emoji: '👋', category: 'gif', price: 0, creator: 'GifMaster', likes: 920, animationClass: 'animate-wave' },
  { id: '17', name: 'Cry Pack', emoji: '😭', category: 'gif', price: 1.99, creator: 'MoodEmoji', likes: 780, isTrending: true, animationClass: 'animate-bounce' },
  // Sound (ALL paid)
  { id: '20', name: 'Applause', emoji: '👏', category: 'sound', price: 0.99, creator: 'SoundFX', likes: 430 },
  { id: '21', name: 'Drum Roll', emoji: '🥁', category: 'sound', price: 1.49, creator: 'SoundFX', likes: 320 },
  { id: '22', name: 'Whistle', emoji: '🎵', category: 'sound', price: 0.99, creator: 'MusicMan', likes: 280, isNew: true },
  { id: '23', name: 'Explosion', emoji: '💥', category: 'sound', price: 1.99, creator: 'SoundFX', likes: 510, isTrending: true },
  { id: '24', name: 'Bell', emoji: '🔔', category: 'sound', price: 0.79, creator: 'SoundFX', likes: 190 },
  { id: '25', name: 'Air Horn', emoji: '📯', category: 'sound', price: 1.29, creator: 'SoundFX', likes: 340 },
  // Animated
  { id: '30', name: 'Bouncing Heart', emoji: '❤️', category: 'animated', price: 1.99, creator: 'AnimateIt', likes: 920, animationClass: 'animate-bounce' },
  { id: '31', name: 'Spinning Star', emoji: '🌟', category: 'animated', price: 2.49, creator: 'AnimateIt', likes: 780, animationClass: 'animate-spin', isTrending: true },
  { id: '32', name: 'Pulsing Fire', emoji: '🔥', category: 'animated', price: 1.49, creator: 'FlameArt', likes: 650, animationClass: 'animate-pulse' },
  { id: '33', name: 'Floating Ghost', emoji: '👻', category: 'animated', price: 0.99, creator: 'SpookyFun', likes: 430, animationClass: 'animate-float' },
  { id: '34', name: 'Wiggle Worm', emoji: '🪱', category: 'animated', price: 1.99, creator: 'AnimateIt', likes: 290, isNew: true, animationClass: 'animate-wiggle' },
  // Word-style
  { id: '40', name: 'YOLO', emoji: 'YOLO', category: 'word', price: 0.99, creator: 'WordArt', likes: 670, fontFamily: 'cursive' },
  { id: '41', name: 'LOVE', emoji: 'LOVE', category: 'word', price: 1.49, creator: 'WordArt', likes: 890, fontFamily: 'serif', isTrending: true },
  { id: '42', name: 'GG', emoji: 'GG', category: 'word', price: 0, creator: 'GamerTag', likes: 1200, fontFamily: 'monospace' },
  { id: '43', name: 'BRB', emoji: 'BRB', category: 'word', price: 0.49, creator: 'TextPro', likes: 340, fontFamily: 'fantasy' },
  { id: '44', name: 'OMG', emoji: 'OMG', category: 'word', price: 0.99, creator: 'WordArt', likes: 560, isNew: true },
  { id: '45', name: 'HYPE', emoji: 'HYPE', category: 'word', price: 1.99, creator: 'TextPro', likes: 430, fontFamily: 'sans-serif' },
];

export const EXAMPLE_GIFS: GifEmoji[] = [
  { id: 'gif1', name: 'Happy Dance', frames: ['💃', '🕺', '💃', '🕺'], speed: 400, price: 0, creator: 'GifMaster' },
  { id: 'gif2', name: 'Heart Beat', frames: ['❤️', '💗', '💖', '💝', '💖', '💗'], speed: 300, price: 1.99, creator: 'LoveEmoji', isNew: true },
  { id: 'gif3', name: 'Star Twinkle', frames: ['⭐', '🌟', '✨', '💫', '✨', '🌟'], speed: 350, price: 0, creator: 'AnimateIt' },
  { id: 'gif4', name: 'Fire Blaze', frames: ['🔥', '💥', '🔥', '✨', '🔥'], speed: 250, price: 2.49, creator: 'FlameArt' },
  { id: 'gif5', name: 'Mood Swing', frames: ['😊', '😐', '😢', '😡', '😊'], speed: 500, price: 1.49, creator: 'MoodEmoji' },
  { id: 'gif6', name: 'Party Time', frames: ['🎉', '🎊', '🥳', '🎉', '🎊'], speed: 350, price: 0, creator: 'PartyKing' },
  { id: 'gif7', name: 'Space Travel', frames: ['🌍', '🚀', '🌙', '⭐', '🪐'], speed: 400, price: 1.99, creator: 'SpaceArt' },
  { id: 'gif8', name: 'Weather Cycle', frames: ['☀️', '🌤️', '⛅', '🌧️', '⛈️', '🌈'], speed: 450, price: 0.99, creator: 'WeatherFun' },
];

export const BACKGROUNDS = [
  { id: 'bg1', name: 'Cosmic Purple', gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #0d0221 100%)' },
  { id: 'bg2', name: 'Ocean Blue', gradient: 'linear-gradient(135deg, #0c1445 0%, #1a3a6c 50%, #0a0e27 100%)' },
  { id: 'bg3', name: 'Sunset', gradient: 'linear-gradient(135deg, #2d1b2e 0%, #5c2751 50%, #1a0a1a 100%)' },
  { id: 'bg4', name: 'Forest', gradient: 'linear-gradient(135deg, #0a2e1a 0%, #1a5c3a 50%, #061a0e 100%)' },
  { id: 'bg5', name: 'Midnight', gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #050510 100%)' },
  { id: 'bg6', name: 'Neon City', gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2e1a4a 30%, #0a1a3a 70%, #1a2e1a 100%)' },
  { id: 'bg7', name: 'Cherry', gradient: 'linear-gradient(135deg, #2e0a1a 0%, #4a1a2e 50%, #1a0a10 100%)' },
  { id: 'bg8', name: 'Arctic', gradient: 'linear-gradient(135deg, #0a1a2e 0%, #1a3a5c 50%, #0a0e1a 100%)' },
];

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'AnimateIt', avatar: '🎨', score: 9850, showName: true },
  { rank: 2, name: 'GifMaster', avatar: '🎬', score: 8720, showName: true },
  { rank: 3, name: 'WordArt', avatar: '✍️', score: 7690, showName: true },
  { rank: 4, name: 'SoundFX', avatar: '🎵', score: 6540, showName: true },
  { rank: 5, name: 'Anonymous', avatar: '🎭', score: 5430, showName: false },
  { rank: 6, name: 'FlameArt', avatar: '🔥', score: 4320, showName: true },
  { rank: 7, name: 'Anonymous', avatar: '🎭', score: 3210, showName: false },
  { rank: 8, name: 'PartyKing', avatar: '🎉', score: 2890, showName: true },
  { rank: 9, name: 'LoveEmoji', avatar: '💖', score: 2100, showName: true },
  { rank: 10, name: 'TextPro', avatar: '📝', score: 1560, showName: true },
];
