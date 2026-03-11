'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BodyDiagramProps {
  selectedAreas: string[];
  onAreaSelect: (area: string) => void;
  type: 'pain' | 'tenderness';
}

const bodyRegions = [
  // Right side
  { id: 'ruq', path: 'M 85 75 Q 85 85 75 95 L 55 95 Q 50 85 55 75 Z', label: 'RUQ', cx: 68, cy: 85 },
  { id: 'rlq', path: 'M 75 95 Q 75 115 65 130 L 50 130 Q 50 110 55 95 Z', label: 'RLQ', cx: 62, cy: 112 },
  // Left side
  { id: 'luq', path: 'M 15 75 Q 15 85 25 95 L 45 95 Q 50 85 45 75 Z', label: 'LUQ', cx: 32, cy: 85 },
  { id: 'llq', path: 'M 25 95 Q 25 115 35 130 L 50 130 Q 50 110 45 95 Z', label: 'LLQ', cx: 38, cy: 112 },
  // Center
  { id: 'epigastric', path: 'M 45 60 Q 55 60 55 75 L 55 85 Q 50 90 45 85 L 45 75 Z', label: 'Epigastric', cx: 50, cy: 72 },
  { id: 'periumbilical', path: 'M 40 90 Q 50 85 60 90 Q 60 100 50 105 Q 40 100 40 90 Z', label: 'Periumbilical', cx: 50, cy: 95 },
  { id: 'suprapubic', path: 'M 35 130 Q 50 125 65 130 Q 65 145 50 150 Q 35 145 35 130 Z', label: 'Suprapubic', cx: 50, cy: 138 },
];

export function BodyDiagram({ selectedAreas, onAreaSelect, type }: BodyDiagramProps) {
  const colorClass = type === 'pain' 
    ? { fill: 'fill-orange-400/30', stroke: 'stroke-orange-500', selected: 'fill-orange-500/50 stroke-orange-600' }
    : { fill: 'fill-red-400/30', stroke: 'stroke-red-500', selected: 'fill-red-500/50 stroke-red-600' };

  return (
    <div className="flex flex-col items-center">
      <motion.svg
        viewBox="0 0 100 180"
        className="w-48 h-72 sm:w-56 sm:h-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Body outline */}
        <motion.ellipse
          cx="50"
          cy="25"
          rx="20"
          ry="22"
          className="fill-slate-100 stroke-slate-300"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        />
        
        {/* Torso outline */}
        <motion.path
          d="M 30 47 Q 25 50 20 70 L 20 140 Q 30 160 50 165 Q 70 160 80 140 L 80 70 Q 75 50 70 47 Z"
          className="fill-slate-50 stroke-slate-300"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        {/* Interactive regions */}
        {bodyRegions.map((region, index) => {
          const isSelected = selectedAreas.includes(region.id);
          return (
            <motion.g
              key={region.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <motion.path
                d={region.path}
                className={cn(
                  'cursor-pointer transition-all duration-200',
                  isSelected ? colorClass.selected : `${colorClass.fill} ${colorClass.stroke}`
                )}
                strokeWidth={isSelected ? 2 : 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAreaSelect(region.id)}
              />
              {/* Label */}
              <text
                x={region.cx}
                y={region.cy}
                textAnchor="middle"
                className={cn(
                  'text-[6px] font-medium pointer-events-none transition-colors duration-200',
                  isSelected ? 'fill-white' : 'fill-slate-600'
                )}
              >
                {region.label}
              </text>
            </motion.g>
          );
        })}

        {/* Navel marker */}
        <circle cx="50" cy="95" r="2" className="fill-slate-400" />
      </motion.svg>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs text-slate-600">
        <div className="flex items-center gap-1">
          <div className={cn('w-3 h-3 rounded', type === 'pain' ? 'bg-orange-400/50' : 'bg-red-400/50')} />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-slate-200" />
          <span>Available</span>
        </div>
      </div>
    </div>
  );
}
