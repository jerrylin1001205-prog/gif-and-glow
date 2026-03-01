import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Sparkles, Star, Download, Palette, Film, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const Pricing = () => {
  const { t } = useLanguage();
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      desc: 'Get started with basics',
      price: 0,
      annualPrice: 0,
      icon: Sparkles,
      color: 'text-muted-foreground',
      bgClass: 'glass-card',
      features: [
        { text: 'Standard emoji downloads', included: true },
        { text: 'Basic emoji creator', included: true },
        { text: 'Up to 10 library saves', included: true },
        { text: 'Animated emojis', included: false },
        { text: 'GIF packs', included: false },
        { text: 'Sound emojis', included: false },
        { text: 'AI customization', included: false },
        { text: 'Animated GIF export', included: false },
      ],
      buttonText: t('currentPlan'),
      buttonClass: 'border-border text-muted-foreground',
      isCurrent: true,
    },
    {
      name: 'Pro',
      desc: 'For emoji enthusiasts',
      price: 9.99,
      annualPrice: 7.99,
      icon: Zap,
      color: 'text-primary',
      bgClass: 'glass-card border-2 border-primary/50 relative',
      features: [
        { text: 'Everything in Free', included: true },
        { text: 'All animated emojis', included: true },
        { text: 'All GIF packs', included: true },
        { text: 'Sound emojis', included: true },
        { text: 'AI emoji customization', included: true },
        { text: 'Animated GIF export', included: true },
        { text: 'Unlimited library saves', included: true },
        { text: 'Priority support', included: false },
      ],
      buttonText: t('upgradePlan'),
      buttonClass: 'gradient-primary text-primary-foreground neon-glow',
      popular: true,
    },
    {
      name: 'Premium',
      desc: 'For creators & businesses',
      price: 19.99,
      annualPrice: 15.99,
      icon: Crown,
      color: 'text-neon-orange',
      bgClass: 'glass-card',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Commercial license', included: true },
        { text: 'Priority support', included: true },
        { text: 'Early access to new packs', included: true },
        { text: 'Custom brand emojis', included: true },
        { text: 'Bulk export tools', included: true },
        { text: 'Analytics dashboard', included: true },
        { text: 'API access', included: true },
      ],
      buttonText: t('upgradePlan'),
      buttonClass: 'bg-neon-orange/20 text-neon-orange border border-neon-orange/30 hover:bg-neon-orange/30',
    },
  ];

  const handleUpgrade = (planName: string) => {
    toast({
      title: '🚀 Coming Soon!',
      description: `${planName} subscriptions will be available soon. Stay tuned!`,
    });
  };

  const highlights = [
    { icon: Download, label: 'Unlimited Downloads', desc: 'Download any emoji, GIF, or sound' },
    { icon: Film, label: 'GIF Export', desc: 'Export animated GIFs for social media' },
    { icon: Volume2, label: 'Sound Packs', desc: 'Access all sound emoji collections' },
    { icon: Palette, label: 'AI Creator', desc: 'AI-powered emoji customization' },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-primary via-accent to-neon-orange bg-clip-text text-transparent">
            Unlock Premium Emojis
          </span>
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Get unlimited access to animated emojis, GIFs, sound packs, and AI tools
        </p>

        {/* Annual toggle */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`text-sm ${!annual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-primary' : 'bg-muted'}`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${annual ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-sm ${annual ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
            Annual <span className="text-neon-green text-xs font-bold">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pro highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {highlights.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-3 text-center"
          >
            <h.icon size={20} className="text-primary mx-auto mb-2" />
            <p className="text-xs font-semibold text-foreground">{h.label}</p>
            <p className="text-[10px] text-muted-foreground">{h.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-5">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-5 flex flex-col ${plan.bgClass}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="gradient-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star size={10} /> MOST POPULAR
                </span>
              </div>
            )}

            <plan.icon size={24} className={`${plan.color} mb-3`} />
            <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
            <p className="text-xs text-muted-foreground mb-4">{plan.desc}</p>

            <div className="mb-5">
              <span className="text-3xl font-bold text-foreground">
                {plan.price === 0 ? 'Free' : `$${annual ? plan.annualPrice : plan.price}`}
              </span>
              {plan.price > 0 && (
                <span className="text-muted-foreground text-xs">/mo</span>
              )}
              {annual && plan.price > 0 && (
                <p className="text-[10px] text-muted-foreground line-through">${plan.price}/mo</p>
              )}
            </div>

            <div className="space-y-2.5 flex-1 mb-5">
              {plan.features.map((feat, j) => (
                <div key={j} className="flex items-center gap-2">
                  {feat.included ? (
                    <Check size={14} className="text-neon-green shrink-0" />
                  ) : (
                    <X size={14} className="text-muted-foreground/40 shrink-0" />
                  )}
                  <span className={`text-xs ${feat.included ? 'text-foreground' : 'text-muted-foreground/50'}`}>
                    {feat.text}
                  </span>
                </div>
              ))}
            </div>

            <Button
              className={`w-full ${plan.buttonClass}`}
              variant={plan.isCurrent ? 'outline' : 'default'}
              disabled={plan.isCurrent}
              onClick={() => handleUpgrade(plan.name)}
            >
              {plan.buttonText}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* FAQ-style trust */}
      <div className="mt-12 text-center">
        <p className="text-xs text-muted-foreground">
          Cancel anytime • No hidden fees • Instant access after upgrade
        </p>
      </div>
    </div>
  );
};

export default Pricing;
