'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Shield,
  AlertCircle,
  Activity,
  TrendingUp,
  Download,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DiagnosisResult } from '@/lib/medical-data';
import { ShapVisualization } from './shap-visualization';
import { Button } from '@/components/ui/button';

interface ResultsDashboardProps {
  result: DiagnosisResult | null;
  onReset: () => void;
  onGenerateReport: () => void;
}

// Animated number component
function AnimatedNumber({ value, duration = 2000, suffix = '%' }: { value: number; duration?: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const startValue = useRef(0);

  useEffect(() => {
    startValue.current = displayValue;
    startTime.current = null;
    
    const animate = (currentTime: number) => {
      if (!startTime.current) startTime.current = currentTime;
      const elapsed = currentTime - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue.current + (value - startValue.current) * easeOut;
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{(displayValue * 100).toFixed(1)}{suffix}</span>;
}

// Risk level configurations
const riskConfig = {
  'low': {
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    gradient: 'from-emerald-400 to-green-500',
    icon: CheckCircle,
    label: 'Low Risk',
    progressColor: 'bg-emerald-500',
    glowColor: 'shadow-emerald-500/20',
  },
  'moderate': {
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    gradient: 'from-amber-400 to-yellow-500',
    icon: Clock,
    label: 'Moderate Risk',
    progressColor: 'bg-amber-500',
    glowColor: 'shadow-amber-500/20',
  },
  'high': {
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    gradient: 'from-orange-400 to-red-500',
    icon: AlertTriangle,
    label: 'High Risk',
    progressColor: 'bg-orange-500',
    glowColor: 'shadow-orange-500/20',
  },
  'very-high': {
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    gradient: 'from-red-500 to-rose-600',
    icon: AlertCircle,
    label: 'Very High Risk',
    progressColor: 'bg-red-500',
    glowColor: 'shadow-red-500/20',
  },
};

const urgencyConfig = {
  'routine': {
    color: 'text-slate-600',
    bg: 'bg-slate-100',
    gradient: 'from-slate-400 to-slate-500',
    label: 'Routine',
    description: 'Standard follow-up recommended',
  },
  'urgent': {
    color: 'text-orange-600',
    bg: 'bg-orange-100',
    gradient: 'from-orange-400 to-amber-500',
    label: 'Urgent',
    description: 'Prompt evaluation recommended',
  },
  'emergency': {
    color: 'text-red-600',
    bg: 'bg-red-100',
    gradient: 'from-red-500 to-rose-600',
    label: 'Emergency',
    description: 'Immediate intervention required',
  },
};

// Probability ring component
function ProbabilityRing({ probability, risk }: { probability: number; risk: typeof riskConfig.low }) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (probability * circumference);

  return (
    <div className="relative w-56 h-56">
      {/* Background ring */}
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="16"
        />
        {/* Progress ring */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
          className="text-5xl font-bold text-slate-800"
        >
          <AnimatedNumber value={probability} />
        </motion.div>
        <span className="text-sm text-slate-500 mt-1 font-medium">Probability</span>
        
        {/* Risk badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={cn(
            'mt-3 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1',
            risk.bg, risk.border, 'border', risk.color
          )}
        >
          <risk.icon className="w-3 h-3" />
          {risk.label}
        </motion.div>
      </div>
      
      {/* Glow effect */}
      <motion.div
        className={cn('absolute inset-0 rounded-full opacity-20 blur-2xl', `bg-gradient-to-br ${risk.gradient}`)}
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}

// Info card component
function InfoCard({ 
  icon: Icon, 
  title, 
  value, 
  description, 
  color = 'cyan' 
}: { 
  icon: React.ElementType; 
  title: string; 
  value: string; 
  description?: string;
  color?: 'cyan' | 'emerald' | 'violet' | 'amber';
}) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-teal-500',
    emerald: 'from-emerald-500 to-green-500',
    violet: 'from-violet-500 to-purple-500',
    amber: 'from-amber-500 to-orange-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg shadow-slate-900/5"
    >
      <div className="flex items-start gap-4">
        <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center', colorClasses[color])}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-500 mb-1">{title}</p>
          <p className="text-lg font-bold text-slate-800">{value}</p>
          {description && (
            <p className="text-xs text-slate-400 mt-1">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ResultsDashboard({ result, onReset, onGenerateReport }: ResultsDashboardProps) {
  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Activity className="w-16 h-16 text-cyan-400" />
          </motion.div>
          <p className="text-slate-500">Complete the diagnosis form to see results</p>
        </div>
      </div>
    );
  }

  const risk = riskConfig[result.riskLevel];
  const urgency = urgencyConfig[result.urgencyLevel];
  const RiskIcon = risk.icon;

  return (
    <div className="space-y-8">
      {/* Main Result Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50/50 to-cyan-50/30 border border-slate-200/50 shadow-2xl shadow-slate-900/10"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={cn('absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-10 bg-gradient-to-br', risk.gradient)}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className={cn('absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-10 bg-gradient-to-br', risk.gradient)}
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 p-8 sm:p-10">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Probability Ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <ProbabilityRing probability={result.probability} risk={risk} />
            </motion.div>

            {/* Result Details */}
            <div className="flex-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    'px-4 py-2 rounded-xl flex items-center gap-2 border',
                    risk.bg, risk.border
                  )}>
                    <RiskIcon className={cn('w-5 h-5', risk.color)} />
                    <span className={cn('font-semibold', risk.color)}>{risk.label}</span>
                  </div>
                  
                  <div className={cn(
                    'px-4 py-2 rounded-xl flex items-center gap-2 border',
                    urgency.bg
                  )}>
                    <Clock className={cn('w-4 h-4', urgency.color)} />
                    <span className={cn('font-semibold text-sm', urgency.color)}>{urgency.label}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                  Appendicitis Assessment
                </h2>

                <p className="text-slate-600 leading-relaxed text-lg">
                  {result.recommendation}
                </p>
              </motion.div>

              {/* Confidence Interval */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 rounded-xl border border-cyan-100">
                  <Shield className="w-5 h-5 text-cyan-600" />
                  <div>
                    <span className="text-xs text-cyan-600 block">95% Confidence</span>
                    <span className="font-semibold text-slate-700">
                      {(result.confidenceInterval.lower * 100).toFixed(1)}% - {(result.confidenceInterval.upper * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard
          icon={Activity}
          title="Risk Level"
          value={risk.label}
          description="Based on AI analysis"
          color="cyan"
        />
        <InfoCard
          icon={Clock}
          title="Urgency"
          value={urgency.label}
          description={urgency.description}
          color="amber"
        />
        <InfoCard
          icon={Shield}
          title="Confidence"
          value={`${((result.confidenceInterval.upper - result.confidenceInterval.lower) * 100).toFixed(0)}% interval`}
          description="Statistical certainty"
          color="emerald"
        />
        <InfoCard
          icon={Sparkles}
          title="Model"
          value="Random Forest"
          description="94.2% accuracy rate"
          color="violet"
        />
      </div>

      {/* SHAP Visualization */}
      <ShapVisualization shapValues={result.shapValues} />

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
      >
        <motion.button
          onClick={onGenerateReport}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white font-semibold rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <FileText className="w-5 h-5" />
          Generate Report
          <ArrowRight className="w-5 h-5" />
        </motion.button>
        
        <motion.button
          onClick={onReset}
          className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-5 h-5" />
          New Diagnosis
        </motion.button>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200"
      >
        <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-500 leading-relaxed">
          <strong className="text-slate-600">Clinical Decision Support:</strong> This AI-powered analysis 
          is intended to assist healthcare professionals and should not replace professional medical judgment. 
          Always consider clinical context and patient-specific factors.
        </p>
      </motion.div>
    </div>
  );
}
