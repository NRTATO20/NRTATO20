export type RootStackParamList = {
    index: undefined; 
  
    indicativeinfo: {
      province: string;
      district: string;
      LLG: string;
      ward: string;
      censusunit: string;
      censusunittype: string;
      workloadno: string;
    };
  
    indicativeinfo2: {
      province: string;
      district: string;
      LLG: string;
      ward: string;
      censusunit: string;
      censusunittype: string;
      workloadno: string;
      locality: string;
      section: number;
      lot: number;
      structure: number;
      PDno: number;
      householdno: number;
    };
  
    indicativeinfo3: {
      province: string;
      district: string;
      LLG: string;
      ward: string;
      censusunit: string;
      censusunittype: string;
      workloadno: string;
      locality: string;
      section: number;
      lot: number;
      structure: number;
      PDno: number;
      householdno: number;
      totalpeople: number;
      isCitizen: string; // Added isCitizen field
      country: string | null; // Added country field (can be null if isCitizen is true)
    };
  
    dashboard: {
      province: string;
      district: string;
      LLG: string;
      ward: string;
      censusunit: string;
      censusunittype: string;
      workloadno: string;
      locality: string;
      section: number;
      lot: number;
      structure: number;
      PDno: number;
      householdno: number;
      totalpeople: string;
      isCitizen: string;  // Added isCitizen field
      country: string | null;  // Added country field
    };
  };
  