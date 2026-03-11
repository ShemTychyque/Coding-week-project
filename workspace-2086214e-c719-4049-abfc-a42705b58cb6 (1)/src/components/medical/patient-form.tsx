'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Activity,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  User,
  Stethoscope,
  Heart,
  Thermometer,
  Droplets,
  Ruler,
  Weight,
  Calendar,
  AlertCircle,
  Info,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { SymptomsInput } from './symptoms-input';
import { ClinicalSigns } from './clinical-signs';
import type { PatientData } from '@/lib/medical-data';

interface PatientFormProps {
  onSubmit: (data: Partial<PatientData>) => void;
  isLoading: boolean;
}

const steps = [
  { id: 'demographics', label: 'Demographics', description: 'Patient information', icon: User },
  { id: 'symptoms', label: 'Symptoms', description: 'Clinical presentation', icon: Activity },
  { id: 'clinical', label: 'Clinical Signs', description: 'Physical examination', icon: Stethoscope },
];

// Progress indicator component
function ProgressIndicator({ currentStep, steps }: { currentStep: number; steps: typeof steps }) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mb-10">
      {/* Steps */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className={cn(
                  'relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500',
                  index === currentStep
                    ? 'bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/30'
                    : index < currentStep
                    ? 'bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/30'
                    : 'bg-slate-100'
                )}
                whileHover={{ scale: 1.05 }}
              >
                {index < currentStep ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <step.icon className={cn(
                    'w-6 h-6',
                    index === currentStep ? 'text-white' : 'text-slate-400'
                  )} />
                )}
                
                {/* Pulse effect for active step */}
                {index === currentStep && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-cyan-500"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              <div className="hidden sm:block">
                <p className={cn(
                  'font-semibold transition-colors duration-300',
                  index === currentStep ? 'text-slate-800' : 'text-slate-400'
                )}>
                  {step.label}
                </p>
                <p className="text-xs text-slate-400">{step.description}</p>
              </div>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="hidden md:block w-20 h-1 mx-4 rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-500"
                  initial={{ width: '0%' }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Demographics step component
function DemographicsStep({
  age, setAge,
  sex, setSex,
  height, setHeight,
  weight, setWeight,
}: {
  age: number; setAge: (v: number) => void;
  sex: 'male' | 'female'; setSex: (v: 'male' | 'female') => void;
  height: number; setHeight: (v: number) => void;
  weight: number; setWeight: (v: number) => void;
}) {
  const bmi = weight / ((height / 100) ** 2);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Patient Demographics</h2>
          <p className="text-slate-500">Basic patient information for assessment</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Age */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <Label className="text-slate-700 font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-600" />
            Age (years)
          </Label>
          <div className="relative">
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min={0}
              max={18}
              className="h-14 text-lg rounded-xl border-slate-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all pl-4 pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">yrs</span>
          </div>
          <p className="text-xs text-slate-500">Patient age for pediatric assessment (0-18)</p>
        </motion.div>

        {/* Sex */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-3"
        >
          <Label className="text-slate-700 font-semibold flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-600" />
            Biological Sex
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {['male', 'female'].map((s) => (
              <motion.button
                key={s}
                onClick={() => setSex(s as 'male' | 'female')}
                className={cn(
                  'h-14 rounded-xl border-2 font-semibold transition-all duration-300 flex items-center justify-center gap-2',
                  sex === s
                    ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-teal-50 text-cyan-700 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {s === 'male' ? '♂' : '♀'} {s.charAt(0).toUpperCase() + s.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Height */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <Label className="text-slate-700 font-semibold flex items-center gap-2">
            <Ruler className="w-4 h-4 text-cyan-600" />
            Height (cm)
          </Label>
          <div className="relative">
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              min={50}
              max={200}
              className="h-14 text-lg rounded-xl border-slate-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all pl-4 pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">cm</span>
          </div>
        </motion.div>

        {/* Weight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-3"
        >
          <Label className="text-slate-700 font-semibold flex items-center gap-2">
            <Weight className="w-4 h-4 text-cyan-600" />
            Weight (kg)
          </Label>
          <div className="relative">
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              min={1}
              max={100}
              className="h-14 text-lg rounded-xl border-slate-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all pl-4 pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">kg</span>
          </div>
        </motion.div>
      </div>

      {/* BMI Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 rounded-2xl border border-cyan-100 shadow-lg shadow-cyan-500/5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-700">Calculated BMI</p>
              <p className="text-xs text-slate-500">Body Mass Index</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              {bmi.toFixed(1)}
            </span>
            <span className="text-slate-400 ml-1">kg/m²</span>
          </div>
        </div>
        
        <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-teal-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (bmi / 30) * 100)}%` }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        
        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
          <Info className="w-3 h-3" />
          Normal pediatric BMI range: 14-24 kg/m²
        </p>
      </motion.div>
    </motion.div>
  );
}

export function PatientForm({ onSubmit, isLoading }: PatientFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Demographics
  const [age, setAge] = useState(10);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState(140);
  const [weight, setWeight] = useState(36);
  const bmi = weight / ((height / 100) ** 2);
  
  // Symptoms
  const [painLocation, setPainLocation] = useState<string[]>([]);
  const [painIntensity, setPainIntensity] = useState(5);
  const [painDuration, setPainDuration] = useState(12);
  const [symptoms, setSymptoms] = useState({
    nausea: false,
    vomiting: false,
    fever: false,
    appetiteLoss: false,
    diarrhea: false,
    constipation: false,
    dysuria: false,
    migratoryPain: false,
  });
  
  // Clinical Signs
  const [tendernessLocation, setTendernessLocation] = useState<string[]>([]);
  const [reboundTenderness, setReboundTenderness] = useState(false);
  const [bodyTemperature, setBodyTemperature] = useState(37.0);
  const [wbcCount, setWbcCount] = useState(8.5);
  const [crpLevel, setCrpLevel] = useState(5);
  const [rlqPain, setRlqPain] = useState(false);

  const handleSymptomChange = (key: string, value: boolean) => {
    setSymptoms(prev => ({ ...prev, [key]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return age > 0 && height > 0 && weight > 0;
      case 1:
        return painLocation.length > 0;
      case 2:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSubmit({
        age,
        sex,
        bmi,
        height,
        weight,
        painLocation,
        painIntensity,
        painDuration,
        ...symptoms,
        tendernessLocation,
        reboundTenderness,
        bodyTemperature,
        wbcCount,
        crpLevel,
        rlqPain,
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="w-full">
      <ProgressIndicator currentStep={currentStep} steps={steps} />

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-100 overflow-hidden"
      >
        <div className="p-8 sm:p-10">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <DemographicsStep
                key="demographics"
                age={age} setAge={setAge}
                sex={sex} setSex={setSex}
                height={height} setHeight={setHeight}
                weight={weight} setWeight={setWeight}
              />
            )}

            {currentStep === 1 && (
              <motion.div
                key="symptoms"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <SymptomsInput
                  painLocation={painLocation}
                  onPainLocationChange={setPainLocation}
                  painIntensity={painIntensity}
                  onPainIntensityChange={setPainIntensity}
                  painDuration={painDuration}
                  onPainDurationChange={setPainDuration}
                  symptoms={symptoms}
                  onSymptomChange={handleSymptomChange}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="clinical"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <ClinicalSigns
                  tendernessLocation={tendernessLocation}
                  onTendernessLocationChange={setTendernessLocation}
                  reboundTenderness={reboundTenderness}
                  onReboundTendernessChange={setReboundTenderness}
                  bodyTemperature={bodyTemperature}
                  onBodyTemperatureChange={setBodyTemperature}
                  wbcCount={wbcCount}
                  onWbcCountChange={setWbcCount}
                  crpLevel={crpLevel}
                  onCrpLevelChange={setCrpLevel}
                  rlqPain={rlqPain}
                  onRlqPainChange={setRlqPain}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="px-8 sm:px-10 py-6 bg-gradient-to-r from-slate-50 to-slate-100/50 border-t border-slate-100">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={cn(
                'px-6 py-3 rounded-xl font-semibold transition-all',
                currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
              )}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </span>
              ) : currentStep === steps.length - 1 ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Run Diagnosis
                  <ChevronRight className="w-5 h-5" />
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  Next
                  <ChevronRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
