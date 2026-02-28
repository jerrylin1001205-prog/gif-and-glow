import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('freePlan'),
      desc: t('freePlanDesc'),
      price: 0,
      icon: Sparkles,
      color: 'text-muted-foreground',
      bgClass: 'glass-card',
      features: [t('freeFeat1'), t('freeFeat2'), t('freeFeat3')],
      buttonText: t('currentPlan'),
      buttonClass: 'border-border text-muted-foreground',
      isCurrent: true,
    },
    {
      name: t('proPlan'),
      desc: t('proPlanDesc'),
      price: 9.99,
      icon: Zap,
      color: 'text-primary',
      bgClass: 'glass-card border-2 border-primary/50',
      features: [t('proFeat1'), t('proFeat2'), t('proFeat3'), t('proFeat4')],
      buttonText: t('upgradePlan'),
      buttonClass: 'gradient-primary text-primary-foreground neon-glow',
      popular: true,
    },
    {
      name: t('premiumPlan'),
      desc: t('premiumPlanDesc'),
      price: 19.99,
      icon: Crown,
      color: 'text-neon-orange',
      bgClass: 'glass-card',
      features: [t('premFeat1'), t('premFeat2'), t('premFeat3'), t('premFeat4'), t('premFeat5')],
      buttonText: t('upgradePlan'),
      buttonClass: 'bg-neon-orange/20 text-neon-orange border border-neon-orange/30 hover:bg-neon-orange/30',
    },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          <span className="bg-gradient-to-r from-primary via-accent to-neon-orange bg-clip-text text-transparent">
            {t('pricingTitle')}
          </span>
        </h1>
        <p className="text-muted-foreground">{t('pricingDesc')}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-2xl p-6 relative flex flex-col ${plan.bgClass}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="gradient-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  {t('mostPopular')}
                </span>
              </div>
            )}

            <plan.icon size={28} className={`${plan.color} mb-4`} />
            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">
                {plan.price === 0 ? t('free') : `$${plan.price}`}
              </span>
              {plan.price > 0 && (
                <span className="text-muted-foreground text-sm">{t('perMonth')}</span>
              )}
            </div>

            <div className="space-y-3 flex-1 mb-6">
              {plan.features.map((feat, j) => (
                <div key={j} className="flex items-center gap-2">
                  <Check size={16} className={plan.color} />
                  <span className="text-sm text-foreground">{feat}</span>
                </div>
              ))}
            </div>

            <Button
              className={`w-full ${plan.buttonClass}`}
              variant={plan.isCurrent ? 'outline' : 'default'}
              disabled={plan.isCurrent}
            >
              {plan.buttonText}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
