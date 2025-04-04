export interface ChartConfig {
  colors: {
    revenueStandard: string;
    costStandard: string;
    revenueWakastart: string;
    costWakastart: string;
    breakeven: string;
    referenceGrid: string;
    referenceLine: string;
    axis: string;
  };
  gradientIds: {
    revenueStandard: string;
    costStandard: string;
    revenueWakastart: string;
    costWakastart: string;
  };
  tooltipStyle: {
    contentStyle: React.CSSProperties;
    labelStyle: React.CSSProperties;
    itemStyle: React.CSSProperties;
  };
  margins: {
    areaChart: {
      top: number;
      right: number;
      left: number;
      bottom: number;
    };
    composedChart: {
      top: number;
      right: number;
      left: number;
      bottom: number;
    };
  };
}