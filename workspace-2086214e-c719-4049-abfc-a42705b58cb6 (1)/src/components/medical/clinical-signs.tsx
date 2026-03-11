'use client';

import { motion } from 'framer-motion';
import { 
  Stethoscope, 
  Thermometer, 
  Droplets, 
  Activity, 
  AlertTriangle,
  MapPin,
  Info,
  Zap
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { clinicalReferenceRanges } from '@/lib/medical-data';

interface ClinicalSignsProps {
  tendernessLocation: string[];
  onTendernessLocationChange: (locations: string[]) => void;
  reboundTenderness: boolean;
  onReboundTendernessChange: (value: boolean) => void;
  bodyTemperature: number;
  onBodyTemperatureChange: (value: number) => void;
  wbcCount: number;
  onWbcCountChange: (value: number) => void;
  crpLevel: number;
  onCrpLevelChange: (value: number) => void;
  rlqPain: boolean;
  onRlqPainChange: (value: boolean) => void;
}

const tendernessLocations = [
  { id: 'rlq', label: 'Right Lower Quadrant', highlight: true },
  { id: 'ruq', label: 'Right Upper Quadrant' },
  { id: 'llq', label: 'Left Lower Quadrant' },
  { id: 'luq', label: 'Left Upper Quadrant' },
  { id: 'epigastric', label: 'Epigastric' },
  { id: 'suprapubic', label: 'Suprapubic' },
];

export function ClinicalSigns({
  tendernessLocation,
  onTendernessLocationChange,
  reboundTenderness,
  onReboundTendernessChange,
  bodyTemperature,
  onBodyTemperatureChange,
  wbcCount,
  onWbcCountChange,
  crpLevel,
  onCrpLevelChange,
  rlqPain,
  onRlqPainChange,
}: ClinicalSignsProps) {
  const toggleTenderness = (id: string) => {
    if (tendernessLocation.includes(id)) {
      onTendernessLocationChange(tendernessLocation.filter(loc => loc !== id));
    } else {
      onTendernessLocationChange([...tendernessLocation, id]);
    }
  };

  const getWBCStatus = (value: number) => {
    if (value < clinicalReferenceRanges.wbc.min) return { color: 'text-blue-600', label: 'Low' };
    if (value > clinicalReferenceRanges.wbc.max) return { color: 'text-red-600', label: 'Elevated' };
    return { color: 'text-green-600', label: 'Normal' };
  };

  const getCRPStatus = (value: number) => {
    if (value > 50) return { color: 'text-red-600', label: 'Highly Elevated' };
    if (value > clinicalReferenceRanges.crp.max) return { color: 'text-orange-600', label: 'Elevated' };
    return { color: 'text-green-600', label: 'Normal' };
  };

  const getTempStatus = (value: number) => {
    if (value > 38.5) return { color: 'text-red-600', label: 'High Fever' };
    if (value > 38) return { color: 'text-orange-600', label: 'Fever' };
    if (value < 36) return { color: 'text-blue-600', label: 'Low' };
    return { color: 'text-green-600', label: 'Normal' };
  };

  const wbcStatus = getWBCStatus(wbcCount);
  const crpStatus = getCRPStatus(crpLevel);
  const tempStatus = getTempStatus(bodyTemperature);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
          <Stethoscope className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Clinical Signs</h2>
          <p className="text-slate-500">Physical examination findings and lab results</p>
        </div>
      </div>

      {/* Abdominal Tenderness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <Label className="text-slate-700 font-semibold flex items-center gap-2 text-lg">
          <MapPin className="w-5 h-5 text-teal-600" />
          Abdominal Tenderness Location
        </Label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {tendernessLocations.map((location, index) => (
            <motion.button
              key={location.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.03 }}
              onClick={() => toggleTenderness(location.id)}
              className={cn(
                'p-4 rounded-xl border-2 transition-all duration-300 text-left',
                tendernessLocation.includes(location.id)
                  ? location.highlight
                    ? 'border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg shadow-red-500/10'
                    : 'border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-lg shadow-teal-500/10'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
                location.highlight && !tendernessLocation.includes(location.id) && 'border-orange-200 bg-orange-50/30'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">{location.label}</span>
                {location.highlight && (
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                )}
              </div>
              {location.highlight && (
                <p className="text-xs text-orange-600 mt-1">Classic appendicitis sign</p>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Key Clinical Signs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 gap-4"
      >
        {/* RLQ Pain */}
        <div className={cn(
          'p-5 rounded-2xl border-2 transition-all duration-300',
          rlqPain
            ? 'border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg shadow-red-500/10'
            : 'border-slate-200 hover:border-slate-300'
        )}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                rlqPain ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'
              )}>
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">RLQ Pain</p>
                <p className="text-xs text-slate-500">McBurney's Point</p>
              </div>
            </div>
            <Switch
              checked={rlqPain}
              onCheckedChange={onRlqPainChange}
            />
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Pain at McBurney's point is highly indicative of appendicitis
          </p>
        </div>

        {/* Rebound Tenderness */}
        <div className={cn(
          'p-5 rounded-2xl border-2 transition-all duration-300',
          reboundTenderness
            ? 'border-red-500 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg shadow-red-500/10'
            : 'border-slate-200 hover:border-slate-300'
        )}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center',
                reboundTenderness ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-500'
              )}>
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Rebound Tenderness</p>
                <p className="text-xs text-slate-500">Blumberg's Sign</p>
              </div>
            </div>
            <Switch
              checked={reboundTenderness}
              onCheckedChange={onReboundTendernessChange}
            />
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <Info className="w-3 h-3" />
            Pain upon release of pressure suggests peritoneal irritation
          </p>
        </div>
      </motion.div>

      {/* Lab Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <Label className="text-slate-700 font-semibold flex items-center gap-2 text-lg">
          <Droplets className="w-5 h-5 text-teal-600" />
          Laboratory Results
        </Label>

        <div className="grid sm:grid-cols-3 gap-4">
          {/* Body Temperature */}
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50">
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-slate-700">Temperature</span>
            </div>
            
            <div className="relative mb-3">
              <Input
                type="number"
                value={bodyTemperature}
                onChange={(e) => onBodyTemperatureChange(Number(e.target.value))}
                step={0.1}
                min={35}
                max={42}
                className="h-12 text-lg font-semibold pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">°C</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={cn('text-sm font-medium', tempStatus.color)}>{tempStatus.label}</span>
              <span className="text-xs text-slate-400">36.5-37.5°C</span>
            </div>
          </div>

          {/* WBC Count */}
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-violet-500" />
              <span className="font-medium text-slate-700">WBC Count</span>
            </div>
            
            <div className="relative mb-3">
              <Input
                type="number"
                value={wbcCount}
                onChange={(e) => onWbcCountChange(Number(e.target.value))}
                step={0.1}
                min={0}
                max={50}
                className="h-12 text-lg font-semibold pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">x10⁹/L</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={cn('text-sm font-medium', wbcStatus.color)}>{wbcStatus.label}</span>
              <span className="text-xs text-slate-400">4.5-13.5</span>
            </div>
          </div>

          {/* CRP Level */}
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-5 h-5 text-red-500" />
              <span className="font-medium text-slate-700">CRP Level</span>
            </div>
            
            <div className="relative mb-3">
              <Input
                type="number"
                value={crpLevel}
                onChange={(e) => onCrpLevelChange(Number(e.target.value))}
                step={1}
                min={0}
                max={500}
                className="h-12 text-lg font-semibold pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">mg/L</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={cn('text-sm font-medium', crpStatus.color)}>{crpStatus.label}</span>
              <span className="text-xs text-slate-400">&lt;10 mg/L</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reference Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100"
      >
        <p className="text-sm text-teal-800 flex items-start gap-2">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>
            <strong>Clinical Note:</strong> Elevated WBC and CRP levels combined with RLQ tenderness 
            and positive rebound tenderness are strong indicators of acute appendicitis.
          </span>
        </p>
      </motion.div>
    </div>
  );
}
