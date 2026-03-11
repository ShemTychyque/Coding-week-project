// Medical Diagnosis Mock Data for Pediatric Appendicitis

export interface PatientData {
  // Demographics
  age: number;
  sex: 'male' | 'female';
  bmi: number;
  height: number; // cm
  weight: number; // kg
  
  // Symptoms
  painLocation: string[];
  painIntensity: number; // 1-10
  painDuration: number; // hours
  nausea: boolean;
  vomiting: boolean;
  fever: boolean;
  appetiteLoss: boolean;
  diarrhea: boolean;
  constipation: boolean;
  dysuria: boolean;
  
  // Clinical Signs
  tendernessLocation: string[];
  reboundTenderness: boolean;
  bodyTemperature: number; // Celsius
  wbcCount: number; // x10^9/L
  crpLevel: number; // mg/L
  migratoryPain: boolean;
  rlqPain: boolean;
}

export interface ShapValue {
  feature: string;
  value: number;
  contribution: number; // Positive increases probability, negative decreases
  description: string;
}

export interface DiagnosisResult {
  probability: number; // 0-1
  riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  shapValues: ShapValue[];
  recommendation: string;
  urgencyLevel: 'routine' | 'urgent' | 'emergency';
}

export const painLocations = [
  { id: 'rlq', label: 'Right Lower Quadrant', clinical: 'McBurney\'s Point' },
  { id: 'ruq', label: 'Right Upper Quadrant', clinical: 'RUQ' },
  { id: 'llq', label: 'Left Lower Quadrant', clinical: 'LLQ' },
  { id: 'luq', label: 'Left Upper Quadrant', clinical: 'LUQ' },
  { id: 'epigastric', label: 'Epigastric', clinical: 'Epigastric Region' },
  { id: 'periumbilical', label: 'Periumbilical', clinical: 'Around Navel' },
  { id: 'suprapubic', label: 'Suprapubic', clinical: 'Lower Abdomen' },
  { id: 'diffuse', label: 'Diffuse', clinical: 'Widespread' },
] as const;

export const symptomDescriptions: Record<string, string> = {
  nausea: 'Feeling of sickness or urge to vomit',
  vomiting: 'Forceful expulsion of stomach contents',
  fever: 'Elevated body temperature above 38°C',
  appetiteLoss: 'Decreased desire to eat',
  diarrhea: 'Loose or watery bowel movements',
  constipation: 'Difficulty passing stools',
  dysuria: 'Painful or difficult urination',
  migratoryPain: 'Pain that moves from one location to another',
  reboundTenderness: 'Pain when pressure is released',
};

export const clinicalReferenceRanges = {
  wbc: { min: 4.5, max: 13.5, unit: 'x10⁹/L', label: 'White Blood Cell Count' },
  crp: { min: 0, max: 10, unit: 'mg/L', label: 'C-Reactive Protein' },
  temperature: { min: 36.5, max: 37.5, unit: '°C', label: 'Body Temperature' },
  bmi: { min: 14, max: 24, unit: 'kg/m²', label: 'Body Mass Index' },
};

// Mock SHAP values for demonstration
export const mockShapValues: ShapValue[] = [
  { feature: 'RLQ Tenderness', value: 1, contribution: 0.18, description: 'Tenderness in right lower quadrant - strongly suggests appendicitis' },
  { feature: 'Rebound Tenderness', value: 1, contribution: 0.14, description: 'Pain upon release of pressure - classic appendicitis sign' },
  { feature: 'WBC Count', value: 15.2, contribution: 0.12, description: 'Elevated white blood cell count indicates infection' },
  { feature: 'Migratory Pain', value: 1, contribution: 0.11, description: 'Pain migration from periumbilical to RLQ is typical' },
  { feature: 'Fever', value: 1, contribution: 0.08, description: 'Fever suggests infectious process' },
  { feature: 'Nausea/Vomiting', value: 1, contribution: 0.07, description: 'Common gastrointestinal symptoms' },
  { feature: 'CRP Level', value: 45, contribution: 0.06, description: 'Elevated C-reactive protein indicates inflammation' },
  { feature: 'Anorexia', value: 1, contribution: 0.05, description: 'Loss of appetite is common in appendicitis' },
  { feature: 'Age', value: 12, contribution: 0.03, description: 'Peak incidence age group' },
  { feature: 'Pain Duration', value: 24, contribution: -0.02, description: 'Duration helps differentiate acute vs chronic' },
  { feature: 'Diarrhea', value: 0, contribution: -0.04, description: 'Diarrhea may suggest alternative diagnosis' },
  { feature: 'Dysuria', value: 0, contribution: -0.05, description: 'Painful urination may indicate UTI instead' },
];

export const defaultPatientData: PatientData = {
  age: 10,
  sex: 'male',
  bmi: 18.5,
  height: 140,
  weight: 36,
  painLocation: [],
  painIntensity: 5,
  painDuration: 12,
  nausea: false,
  vomiting: false,
  fever: false,
  appetiteLoss: false,
  diarrhea: false,
  constipation: false,
  dysuria: false,
  tendernessLocation: [],
  reboundTenderness: false,
  bodyTemperature: 37.0,
  wbcCount: 8.5,
  crpLevel: 5,
  migratoryPain: false,
  rlqPain: false,
};

export function generateMockDiagnosis(data: Partial<PatientData>): DiagnosisResult {
  // Calculate a realistic mock probability based on symptoms
  let probability = 0.15; // Base probability
  
  // Add contributions based on symptoms
  if (data.rlqPain) probability += 0.2;
  if (data.reboundTenderness) probability += 0.15;
  if (data.migratoryPain) probability += 0.12;
  if (data.fever) probability += 0.08;
  if (data.nausea) probability += 0.05;
  if (data.vomiting) probability += 0.07;
  if (data.appetiteLoss) probability += 0.05;
  if (data.wbcCount && data.wbcCount > 11) probability += 0.1;
  if (data.crpLevel && data.crpLevel > 20) probability += 0.08;
  if (data.painIntensity && data.painIntensity > 7) probability += 0.05;
  
  // Reduce probability for alternative symptoms
  if (data.diarrhea) probability -= 0.08;
  if (data.dysuria) probability -= 0.1;
  
  // Clamp probability
  probability = Math.max(0.05, Math.min(0.95, probability));
  
  // Determine risk level
  let riskLevel: DiagnosisResult['riskLevel'];
  if (probability < 0.25) riskLevel = 'low';
  else if (probability < 0.5) riskLevel = 'moderate';
  else if (probability < 0.75) riskLevel = 'high';
  else riskLevel = 'very-high';
  
  // Determine urgency
  let urgencyLevel: DiagnosisResult['urgencyLevel'];
  let recommendation: string;
  
  if (probability >= 0.75) {
    urgencyLevel = 'emergency';
    recommendation = 'Immediate surgical consultation recommended. High probability of acute appendicitis. Consider imaging and surgical intervention.';
  } else if (probability >= 0.5) {
    urgencyLevel = 'urgent';
    recommendation = 'Urgent evaluation recommended. Consider ultrasound or CT imaging. Monitor closely for progression.';
  } else if (probability >= 0.25) {
    urgencyLevel = 'routine';
    recommendation = 'Further observation recommended. Repeat examination in 4-6 hours. Consider imaging if symptoms persist.';
  } else {
    urgencyLevel = 'routine';
    recommendation = 'Low probability of appendicitis. Consider alternative diagnoses. Follow up if symptoms worsen.';
  }
  
  // Generate contextual SHAP values
  const shapValues: ShapValue[] = mockShapValues.map(sv => {
    let actualContribution = sv.contribution;
    let actualValue = sv.value;
    
    // Adjust based on actual input
    switch (sv.feature) {
      case 'RLQ Tenderness':
        actualValue = data.rlqPain ? 1 : 0;
        actualContribution = data.rlqPain ? sv.contribution : -sv.contribution * 0.5;
        break;
      case 'Rebound Tenderness':
        actualValue = data.reboundTenderness ? 1 : 0;
        actualContribution = data.reboundTenderness ? sv.contribution : 0;
        break;
      case 'WBC Count':
        actualValue = data.wbcCount ?? 8.5;
        actualContribution = actualValue > 11 ? sv.contribution : -sv.contribution * 0.3;
        break;
      case 'Migratory Pain':
        actualValue = data.migratoryPain ? 1 : 0;
        actualContribution = data.migratoryPain ? sv.contribution : 0;
        break;
      case 'Fever':
        actualValue = data.fever ? 1 : 0;
        actualContribution = data.fever ? sv.contribution : 0;
        break;
      case 'Nausea/Vomiting':
        actualValue = (data.nausea || data.vomiting) ? 1 : 0;
        actualContribution = actualValue ? sv.contribution : 0;
        break;
      case 'CRP Level':
        actualValue = data.crpLevel ?? 5;
        actualContribution = actualValue > 20 ? sv.contribution : -sv.contribution * 0.2;
        break;
      case 'Anorexia':
        actualValue = data.appetiteLoss ? 1 : 0;
        actualContribution = data.appetiteLoss ? sv.contribution : 0;
        break;
      case 'Age':
        actualValue = data.age ?? 10;
        actualContribution = (actualValue >= 5 && actualValue <= 15) ? sv.contribution : 0;
        break;
      case 'Pain Duration':
        actualValue = data.painDuration ?? 12;
        actualContribution = actualValue > 48 ? sv.contribution : -sv.contribution;
        break;
      case 'Diarrhea':
        actualValue = data.diarrhea ? 1 : 0;
        actualContribution = data.diarrhea ? sv.contribution : 0;
        break;
      case 'Dysuria':
        actualValue = data.dysuria ? 1 : 0;
        actualContribution = data.dysuria ? sv.contribution : 0;
        break;
    }
    
    return {
      ...sv,
      value: actualValue,
      contribution: actualContribution,
    };
  });
  
  return {
    probability,
    riskLevel,
    confidenceInterval: {
      lower: Math.max(0.05, probability - 0.12),
      upper: Math.min(0.98, probability + 0.12),
    },
    shapValues,
    recommendation,
    urgencyLevel,
  };
}
