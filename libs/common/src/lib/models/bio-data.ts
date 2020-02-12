
export interface BioData {
  height?: Heights,
  weight?: Weights,
  dob?: string;
}


export interface Heights {
  current: Height;
  history?: Height[];
}
export interface Height {
  measure: number;
  units: 'in' | 'cm';
  date: string;
}

export interface Weights {
  current: Weight;
  history?: Weight[];
}
export interface Weight {
  measure: number;
  units: 'lb' | 'kg';
  date: string;
}
