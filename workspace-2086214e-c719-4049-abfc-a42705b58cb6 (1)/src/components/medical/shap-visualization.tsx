'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { ArrowDownRight, ArrowUpRight, Info, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ShapValue } from '@/lib/medical-data';
import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ShapVisualizationProps {
  shapValues: ShapValue[];
}

export function ShapVisualization({ shapValues }: ShapVisualizationProps) {
  // Sort by absolute contribution
  const sortedValues = [...shapValues].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
  
  // Separate positive and negative
  const positiveContributions = sortedValues.filter(s => s.contribution > 0);
  const negativeContributions = sortedValues.filter(s => s.contribution < 0);

  return (
    <div className="space-y-8">
      {/* Waterfall Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-3xl bg-white border border-slate-200/50 shadow-xl shadow-slate-900/5"
      >
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Feature Contribution Analysis</h3>
                <p className="text-sm text-slate-500">SHAP-based explainability</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500" />
                <span className="text-slate-600 font-medium">Increases Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500" />
                <span className="text-slate-600 font-medium">Decreases Risk</span>
              </div>
            </div>
          </div>
          
          <div className="h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedValues.slice(0, 10)}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  stroke="#64748b"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  type="category"
                  dataKey="feature"
                  stroke="#64748b"
                  fontSize={12}
                  width={140}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [`${(value * 100).toFixed(1)}% contribution`, 'Impact']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    padding: '12px 16px',
                  }}
                  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                />
                <ReferenceLine x={0} stroke="#94a3b8" strokeWidth={2} />
                <Bar dataKey="contribution" radius={[0, 8, 8, 0]} maxBarSize={40}>
                  {sortedValues.slice(0, 10).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.contribution > 0 ? 'url(#positiveGradient)' : 'url(#negativeGradient)'}
                    />
                  ))}
                </Bar>
                <defs>
                  <linearGradient id="positiveGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <linearGradient id="negativeGradient" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Detailed Feature Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Positive Contributions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 border border-cyan-100"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-cyan-800">Risk-Increasing Factors</h4>
                <p className="text-sm text-cyan-600">Contributing to higher probability</p>
              </div>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-cyan-200 scrollbar-track-transparent">
              {positiveContributions.map((item, index) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="group p-4 bg-white rounded-2xl border border-cyan-100 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-cyan-400 to-teal-500" />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">{item.feature}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-700 rounded-xl text-sm font-bold">
                        +{(item.contribution * 100).toFixed(1)}%
                      </span>
                      <TooltipProvider>
                        <UiTooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-slate-300 group-hover:text-cyan-400 transition-colors cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="font-medium">Value: {typeof item.value === 'number' ? item.value.toFixed(2) : item.value}</p>
                          </TooltipContent>
                        </UiTooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Negative Contributions */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border border-orange-100"
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <ArrowDownRight className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-orange-800">Risk-Decreasing Factors</h4>
                <p className="text-sm text-orange-600">Reducing probability</p>
              </div>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
              {negativeContributions.map((item, index) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="group p-4 bg-white rounded-2xl border border-orange-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-orange-400 to-amber-500" />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">{item.feature}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-xl text-sm font-bold">
                        {(item.contribution * 100).toFixed(1)}%
                      </span>
                      <TooltipProvider>
                        <UiTooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4 text-slate-300 group-hover:text-orange-400 transition-colors cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="font-medium">Value: {typeof item.value === 'number' ? item.value.toFixed(2) : item.value}</p>
                          </TooltipContent>
                        </UiTooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Force Plot Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="overflow-hidden rounded-3xl bg-white border border-slate-200/50 shadow-xl shadow-slate-900/5"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">SHAP Force Plot</h3>
              <p className="text-sm text-slate-500">Visual representation of feature contributions</p>
            </div>
          </div>
          
          <div className="relative py-8">
            {/* Center base line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300 -translate-x-1/2" />
            
            {/* Force visualization */}
            <div className="flex items-stretch justify-center min-h-[80px]">
              {/* Negative forces (left side) */}
              <div className="flex items-center">
                {negativeContributions.map((item, index) => (
                  <motion.div
                    key={item.feature}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width: `${Math.max(Math.abs(item.contribution) * 400, 0)}px`,
                      opacity: 1 
                    }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="h-16 bg-gradient-to-l from-orange-300 to-amber-400 first:rounded-l-xl flex items-center justify-end pr-2 overflow-hidden"
                    title={`${item.feature}: ${(item.contribution * 100).toFixed(1)}%`}
                  >
                    {Math.abs(item.contribution) > 0.02 && (
                      <span className="text-xs text-white font-semibold truncate px-2">
                        {item.feature}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Center base value */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="relative w-20 h-20 bg-white border-4 border-slate-800 rounded-full flex flex-col items-center justify-center z-10 shadow-xl"
              >
                <span className="text-lg font-bold text-slate-800">BASE</span>
                <span className="text-xs text-slate-500">15%</span>
              </motion.div>
              
              {/* Positive forces (right side) */}
              <div className="flex items-center">
                {positiveContributions.map((item, index) => (
                  <motion.div
                    key={item.feature}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width: `${Math.max(item.contribution * 400, 0)}px`,
                      opacity: 1 
                    }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="h-16 bg-gradient-to-r from-cyan-400 to-teal-500 last:rounded-r-xl flex items-center pl-2 overflow-hidden"
                    title={`${item.feature}: +${(item.contribution * 100).toFixed(1)}%`}
                  >
                    {item.contribution > 0.02 && (
                      <span className="text-xs text-white font-semibold truncate px-2">
                        {item.feature}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Labels */}
            <div className="flex justify-between mt-6 px-4">
              <div className="flex items-center gap-2 text-slate-600">
                <ArrowDownRight className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">Lower Risk</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="text-sm font-medium">Higher Risk</span>
                <ArrowUpRight className="w-5 h-5 text-cyan-500" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
