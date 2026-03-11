'use client';

import { motion } from 'framer-motion';
import { 
  Activity, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Thermometer, 
  Info,
  Zap,
  Heart
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { painLocations, symptomDescriptions } from '@/lib/medical-data';

interface SymptomsInputProps {
  painLocation: string[];
  onPainLocationChange: (locations: string[]) => void;
  painIntensity: number;
  onPainIntensityChange: (intensity: number) => void;
  painDuration: number;
  onPainDurationChange: (duration: number) => void;
  symptoms: {
    nausea: boolean;
    vomiting: boolean;
    fever: boolean;
    appetiteLoss: boolean;
    diarrhea: boolean;
    constipation: boolean;
    dysuria: boolean;
    migratoryPain: boolean;
  };
  onSymptomChange: (key: string, value: boolean) => void;
}

const symptomOptions = [
  { key: 'nausea', label: 'Nausea', icon: '🤢' },
  { key: 'vomiting', label: 'Vomiting', icon: '🤮' },
  { key: 'fever', label: 'Fever', icon: '🌡️' },
  { key: 'appetiteLoss', label: 'Appetite Loss', icon: '🍽️' },
  { key: 'diarrhea', label: 'Diarrhea', icon: '💧' },
  { key: 'constipation', label: 'Constipation', icon: '🚫' },
  { key: 'dysuria', label: 'Dysuria', icon: '⚠️' },
  { key: 'migratoryPain', label: 'Migratory Pain', icon: '↗️' },
];

export function SymptomsInput({
  painLocation,
  onPainLocationChange,
  painIntensity,
  onPainIntensityChange,
  painDuration,
  onPainDurationChange,
  symptoms,
  onSymptomChange,
}: SymptomsInputProps) {
  const togglePainLocation = (id: string) => {
    if (painLocation.includes(id)) {
      onPainLocationChange(painLocation.filter(loc => loc !== id));
    } else {
      onPainLocationChange([...painLocation, id]);
    }
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return 'from-green-400 to-emerald-500';
    if (intensity <= 6) return 'from-yellow-400 to-amber-500';
    if (intensity <= 8) return 'from-orange-400 to-red-500';
    return 'from-red-500 to-rose-600';
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Symptom Assessment</h2>
          <p className="text-slate-500">Describe the patient's current symptoms</p>
        </div>
      </div>

      {/* Pain Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <Label className="text-slate-700 font-semibold flex items-center gap-2 text-lg">
          <MapPin className="w-5 h-5 text-cyan-600" />
          Pain Location
          <span className="text-sm font-normal text-slate-400">(Select all that apply)</span>
        </Label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {painLocations.map((location, index) => (
            <motion.button
              key={location.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => togglePainLocation(location.id)}
              className={cn(
                'relative p-4 rounded-xl border-2 text-left transition-all duration-300',
                painLocation.includes(location.id)
                  ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-teal-50 shadow-lg shadow-cyan-500/10'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Selection indicator */}
              <div className={cn(
                'absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                painLocation.includes(location.id)
                  ? 'border-cyan-500 bg-cyan-500'
                  : 'border-slate-300'
              )}>
                {painLocation.includes(location.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                )}
              </div>
              
              <p className="font-semibold text-slate-700 text-sm">{location.label}</p>
              <p className="text-xs text-slate-400 mt-1">{location.clinical}</p>
              
              {/* RLQ highlight */}
              {location.id === 'rlq' && (
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-xs font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Key area
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Pain Intensity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <Label className="text-slate-700 font-semibold flex items-center gap-2 text-lg">
          <Zap className="w-5 h-5 text-cyan-600" />
          Pain Intensity
          <span className="ml-auto text-2xl font-bold bg-gradient-to-r text-transparent bg-clip-text">
            {painIntensity}/10
          </span>
        </Label>
        
        <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100">
          <Slider
            value={[painIntensity]}
            onValueChange={([value]) => onPainIntensityChange(value)}
            min={1}
            max={10}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between mt-3 text-xs text-slate-400">
            <span>Mild</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
          
          {/* Intensity indicator */}
          <motion.div
            className="mt-4 h-2 rounded-full overflow-hidden"
            style={{ background: '#e2e8f0' }}
          >
            <motion.div
              className={cn('h-full rounded-full bg-gradient-to-r', getIntensityColor(painIntensity))}
              initial={{ width: 0 }}
              animate={{ width: `${(painIntensity / 10) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Pain Duration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <Label className="text-slate-700 font-semibold flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5 text-cyan-600" />
          Pain Duration
          <span className="ml-auto text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            {painDuration}h
          </span>
        </Label>
        
        <div className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100">
          <Slider
            value={[painDuration]}
            onValueChange={([value]) => onPainDurationChange(value)}
            min={1}
            max={72}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between mt-3 text-xs text-slate-400">
            <span>1h</span>
            <span>24h</span>
            <span>48h</span>
            <span>72h+</span>
          </div>
        </div>
      </motion.div>

      {/* Associated Symptoms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <Label className="text-slate-700 font-semibold flex items-center gap-2 text-lg">
          <Heart className="w-5 h-5 text-cyan-600" />
          Associated Symptoms
        </Label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {symptomOptions.map((symptom, index) => (
            <motion.div
              key={symptom.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className={cn(
                'p-4 rounded-xl border-2 transition-all duration-300',
                symptoms[symptom.key as keyof typeof symptoms]
                  ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-teal-50 shadow-lg shadow-cyan-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{symptom.icon}</span>
                <Switch
                  checked={symptoms[symptom.key as keyof typeof symptoms]}
                  onCheckedChange={(checked) => onSymptomChange(symptom.key, checked)}
                />
              </div>
              <p className="font-medium text-slate-700 text-sm">{symptom.label}</p>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {symptomDescriptions[symptom.key]}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
