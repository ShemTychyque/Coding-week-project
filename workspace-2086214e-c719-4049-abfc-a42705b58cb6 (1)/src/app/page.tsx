'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Brain, 
  Shield, 
  Sparkles,
  Stethoscope,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { HeroSection } from '@/components/medical/hero-section';
import { PatientForm } from '@/components/medical/patient-form';
import { ResultsDashboard } from '@/components/medical/results-dashboard';
import { cn } from '@/lib/utils';
import type { PatientData, DiagnosisResult } from '@/lib/medical-data';

type AppView = 'hero' | 'form' | 'results';

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Navigation component
function Navigation({ view, onNavigate, isScrolled }: { 
  view: AppView; 
  onNavigate: (v: AppView) => void;
  isScrolled: boolean;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-white/80 backdrop-blur-2xl shadow-lg shadow-slate-900/5 border-b border-slate-200/50" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate('hero')}
          >
            <div className="relative">
              <motion.div
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/25"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Heart className="w-6 h-6 text-white" fill="white" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                PediAppend
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">AI Clinical Support</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {['Features', 'Methodology', 'Research'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-cyan-600 rounded-xl hover:bg-cyan-50/50 transition-all duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => onNavigate('form')}
              className="ml-4 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Stethoscope className="w-4 h-4" />
              Start Diagnosis
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50"
          >
            <div className="px-4 py-4 space-y-2">
              {['Features', 'Methodology', 'Research'].map((item) => (
                <a key={item} href="#" className="block px-4 py-3 text-slate-600 hover:bg-cyan-50 rounded-xl transition-colors">
                  {item}
                </a>
              ))}
              <button 
                onClick={() => { onNavigate('form'); setMobileMenuOpen(false); }}
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl"
              >
                Start Diagnosis
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// Stats section
function StatsSection() {
  const stats = [
    { icon: Users, value: '50K+', label: 'Patients Analyzed', color: 'from-cyan-500 to-teal-500' },
    { icon: TrendingUp, value: '94.2%', label: 'Accuracy Rate', color: 'from-emerald-500 to-green-500' },
    { icon: Clock, value: '<2s', label: 'Analysis Time', color: 'from-violet-500 to-purple-500' },
    { icon: Shield, value: 'HIPAA', label: 'Compliant', color: 'from-orange-500 to-amber-500' },
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-slate-50 via-cyan-50/50 to-slate-50 border-y border-slate-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div
                className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-7 h-7 text-white" />
              </motion.div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Features section
function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'Explainable AI',
      description: 'SHAP-based interpretability ensures transparent clinical decisions. Every prediction comes with clear explanations.',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: Activity,
      title: 'Real-time Analysis',
      description: 'Instant probability calculation with confidence intervals. Get actionable insights in seconds, not hours.',
      gradient: 'from-cyan-500 to-teal-600',
    },
    {
      icon: Shield,
      title: 'Clinical-Grade Security',
      description: 'HIPAA-compliant architecture with end-to-end encryption. Your patient data stays protected.',
      gradient: 'from-emerald-500 to-green-600',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-100 text-sm font-medium text-cyan-700 mb-4">
            <Sparkles className="w-4 h-4" />
            Advanced Features
          </span>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Built for Modern Healthcare
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Combining cutting-edge machine learning with clinical expertise to deliver reliable diagnostic support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500"
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              <ChevronRight className="absolute bottom-8 right-8 w-5 h-5 text-cyan-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <span className="text-xl font-bold">PediAppend</span>
                <p className="text-sm text-slate-400">AI Clinical Support</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Advanced clinical decision support for pediatric appendicitis diagnosis. 
              Empowering healthcare professionals with interpretable AI insights.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Methodology</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">HIPAA Compliance</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2025 PediAppend. For clinical decision support only. Not a substitute for professional medical judgment.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Version 1.0.0</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>Last Updated: 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [view, setView] = useState<AppView>('hero');
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartDiagnosis = () => {
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitDiagnosis = async (data: Partial<PatientData>) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/diagnosis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      setDiagnosisResult(result);
      setView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Diagnosis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setDiagnosisResult(null);
    setView('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateReport = () => {
    alert('Report generation would create a downloadable PDF with diagnosis details.');
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navigation 
        view={view} 
        onNavigate={(v) => {
          setView(v);
          setDiagnosisResult(null);
        }}
        isScrolled={isScrolled || view !== 'hero'}
      />

      <AnimatePresence mode="wait">
        {view === 'hero' && (
          <motion.div key="hero">
            <HeroSection onStartDiagnosis={handleStartDiagnosis} />
            <StatsSection />
            <FeaturesSection />
          </motion.div>
        )}

        {view === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-slate-50 via-cyan-50/30 to-white"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-10"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-100 text-sm font-medium text-cyan-700 mb-4">
                  <Stethoscope className="w-4 h-4" />
                  Clinical Assessment
                </span>
                <h1 className="text-4xl font-bold text-slate-800 mb-3">
                  Patient Assessment Form
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Enter patient symptoms and clinical data for AI-powered appendicitis risk assessment with explainable results.
                </p>
              </motion.div>
              
              <PatientForm onSubmit={handleSubmitDiagnosis} isLoading={isLoading} />
            </div>
          </motion.div>
        )}

        {view === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-slate-50 via-cyan-50/30 to-white"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-10"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-100 text-sm font-medium text-cyan-700 mb-4">
                  <CheckCircle2 className="w-4 h-4" />
                  Analysis Complete
                </span>
                <h1 className="text-4xl font-bold text-slate-800 mb-3">
                  Diagnosis Results
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  AI-powered analysis with interpretable SHAP explanations for transparent clinical decisions.
                </p>
              </motion.div>
              
              <ResultsDashboard
                result={diagnosisResult}
                onReset={handleReset}
                onGenerateReport={handleGenerateReport}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      
      <FloatingParticles />
    </main>
  );
}
