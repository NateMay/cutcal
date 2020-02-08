// nx

export type FdcDataType = 'Branded' | 'Survey (FNDDS)' | 'SR Legacy' | 'Foundation';

export interface FDCFoodSearchResponse {
  foodSearchCriteria: FdcFoodSearchCriteria;
  totalHits: number;
  currentPage: number;
  totalPages: number;
  pageList: number[];
  foods: FdcFoodSearchFood[];
  aggregations: {
    dataType: { [key in FdcDataType]: number}
  }
}
export interface FdcFoodSearchCriteria {
  includeDataTypes: { [key: string]: boolean };
  generalSearchInput: string;
  pageNumber: number;
  requireAllWords: boolean;
  foodTypes: string[];
}

export interface FdcFoodSearchFood {
  fdcId: number;
  description: string;
  lowercaseDescription: string;
  additionalDescriptions?: string;
  ndbNumber?: string;
  dataType: string;
  foodCode?: string;
  publishedDate: string;
  allHighlightFields: string;
  score: number;
}
