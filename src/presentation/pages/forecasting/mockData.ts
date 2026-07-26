export interface ForecastChartData {
  bandPath: string;
  historicalPoints: string;
  p50Points: string;
  todayX: number;
  viewBoxWidth: number;
  xLabels: string[];
  avgPredictedPrice: string;
}

export const FORECAST_CHART_BY_HORIZON: Record<'H+7' | 'H+30', ForecastChartData> = {
  'H+7': {
    bandPath:
      'M0,180 L100,175 L200,190 L300,185 L400,200 L500,195 L600,180 L600,100 L500,110 L400,105 L300,115 L200,120 ' +
      'L100,110 L0,115 Z',
    historicalPoints: '0,150 50,160 100,140 150,155 200,145 250,130 300,140 350,125 400,135 450,115 500,125',
    p50Points: '500,125 550,135 600,130 650,145 700,140 750,155 800,150 850,165 900,160 950,175 1000,170',
    todayX: 500,
    viewBoxWidth: 1000,
    xLabels: ['24 MAY', '26 MAY', '28 MAY', '30 MAY', '01 JUN', '03 JUN', '05 JUN', '07 JUN', '09 JUN'],
    avgPredictedPrice: 'Rp 48.500 / kg',
  },
  'H+30': {
    bandPath:
      'M0,170 L100,180 L200,165 L300,190 L400,175 L500,205 L600,185 L600,95 L500,120 L400,100 L300,130 L200,105 ' +
      'L100,120 L0,110 Z',
    historicalPoints: '0,150 50,160 100,140 150,155 200,145 250,130 300,140 350,125 400,135 450,115 500,125',
    p50Points: '500,125 550,140 600,150 650,160 700,175 750,165 800,185 850,170 900,195 950,180 1000,200',
    todayX: 500,
    viewBoxWidth: 1000,
    xLabels: ['24 MAY', '02 JUN', '11 JUN', '20 JUN', '29 JUN', '08 JUL', '17 JUL', '26 JUL', '04 AUG'],
    avgPredictedPrice: 'Rp 52.900 / kg',
  },
};

export const INVENTORY_HEALTH = {
  stockLevelPercent: 68,
  reorderPointMarkerPercent: 35,
  availableKg: 1250,
  daysUntilStockout: 5,
  optimalOrderQtyKg: 850,
  reorderPointThresholdKg: 645,
  recommendationReason:
    'Stock level is currently above the Reorder Point (35%). System suggests waiting 2 more days to align with lower forecasted prices.',
};
