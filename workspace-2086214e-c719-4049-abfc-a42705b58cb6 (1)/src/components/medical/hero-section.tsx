'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Activity, 
  ArrowRight, 
  Brain, 
  CheckCircle2, 
  Heart, 
  Shield, 
  Sparkles, 
  Stethoscope, 
  Zap,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  onStartDiagnosis: () => void;
}

// Animated background gradient
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient orb */}
      <motion.div
        className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(20, 184, 166, 0.1) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary gradient orb */}
      <motion.div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Center accent orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0f172a 1px, transparent 1px),
            linear-gradient(to bottom, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// Floating medical icons
function FloatingIcons() {
  const icons = [
    { Icon: Activity, x: '5%', y: '20%', size: 24, delay: 0 },
    { Icon: Heart, x: '90%', y: '15%', size: 28, delay: 0.5 },
    { Icon: Stethoscope, x: '85%', y: '70%', size: 32, delay: 1 },
    { Icon: Brain, x: '10%', y: '75%', size: 26, delay: 1.5 },
    { Icon: Shield, x: '92%', y: '45%', size: 22, delay: 2 },
    { Icon: Zap, x: '3%', y: '50%', size: 24, delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-cyan-400/20"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
          }}
          transition={{
            opacity: { duration: 4, delay: item.delay, repeat: Infinity },
            scale: { duration: 6, delay: item.delay, repeat: Infinity },
            y: { duration: 5, delay: item.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <item.Icon size={item.size} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}

// Trust badges
function TrustBadges() {
  const badges = [
    { icon: Shield, text: 'HIPAA Compliant' },
    { icon: CheckCircle2, text: 'FDA Recognized' },
    { icon: Star, text: 'CE Marked' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="flex flex-wrap items-center justify-center gap-6 mt-12"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.text}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 + index * 0.1 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200/50 shadow-sm"
        >
          <badge.icon className="w-4 h-4 text-cyan-600" />
          <span className="text-sm font-medium text-slate-600">{badge.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Main CTA buttons
function CTAButtons({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      {/* Primary CTA */}
      <motion.button
        onClick={onStart}
        className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-cyan-500/30 overflow-hidden"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <span className="relative z-10 flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Stethoscope className="w-5 h-5" />
          </motion.div>
          Start Diagnosis
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </span>
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      </motion.button>

      {/* Secondary CTA */}
      <motion.button
        className="px-8 py-4 text-slate-700 font-semibold text-lg rounded-2xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-cyan-500" />
          Learn More
        </span>
      </motion.button>
    </motion.div>
  );
}

// Feature cards
function FeatureCards() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Machine learning models trained on thousands of pediatric cases with continuous improvement.',
      gradient: 'from-violet-500 to-purple-600',
      stats: '94.2% Accuracy',
    },
    {
      icon: Shield,
      title: 'Explainable Results',
      description: 'SHAP-based interpretability ensures every prediction is transparent and clinically actionable.',
      gradient: 'from-cyan-500 to-teal-600',
      stats: '100% Traceable',
    },
    {
      icon: Zap,
      title: 'Instant Assessment',
      description: 'Real-time probability calculation with confidence intervals delivered in seconds.',
      gradient: 'from-amber-500 to-orange-600',
      stats: '<2s Analysis',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="mt-24 grid md:grid-cols-3 gap-6"
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 overflow-hidden"
        >
          {/* Gradient overlay on hover */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500",
            `bg-gradient-to-br ${feature.gradient}`
          )} />
          
          <div className="relative z-10">
            <motion.div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
            >
              <feature.icon className="w-7 h-7 text-white" />
            </motion.div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-4">{feature.description}</p>
            
            <div className="flex items-center gap-2">
              <div className={cn(
                "px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r text-white",
                feature.gradient
              )}>
                {feature.stats}
              </div>
            </div>
          </div>
          
          {/* Arrow indicator */}
          <ArrowRight className="absolute bottom-8 right-8 w-5 h-5 text-cyan-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function HeroSection({ onStartDiagnosis }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <AnimatedBackground />
      <FloatingIcons />
      
      {/* Main content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-50 via-teal-50 to-emerald-50 border border-cyan-200/50 shadow-lg shadow-cyan-500/5 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Brain className="w-5 h-5 text-cyan-600" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              AI-Powered Clinical Decision Support
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block text-slate-800">Pediatric Appendicitis</span>
              <span className="block bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent mt-2">
                Diagnosis Support
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Advanced machine learning diagnostics with{' '}
            <span className="font-semibold text-cyan-600">interpretable predictions</span>.
            Empowering pediatricians with evidence-based clinical decision support
            and transparent SHAP explainability.
          </motion.p>

          {/* CTA Buttons */}
          <CTAButtons onStart={onStartDiagnosis} />
          
          {/* Trust badges */}
          <TrustBadges />
          
          {/* Feature cards */}
          <FeatureCards />
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
