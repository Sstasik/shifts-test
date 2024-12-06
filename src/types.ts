export interface IEmployyes {
  id: string;
  name: string;
  imgUrl?: string;
  role: string;
}

export enum Section {
  CAISSE = "Caisse",
  CAMION = "Camion",
  FERMETURE = "Fermeture",
  OUVERTURE = "Ouverture",
}

export enum AbsenceType {
  MALADIE = "Maladie", 
  CONGE = "Congé", 
  RECUPERATION = "Récupération" 
}

export enum WarningType {
  OVERLAP = "Overlap with another shift",
  POTENTIAL_OVERTIME = "Potential overtime",
  MISSING_BREAK = "Missing break details",
}

export interface IShift {
  id: string;
  employeeId: string;
  day: string;
  timeInterval: {
    start: string; 
    end: string; 
  };
  totalHours: string; 
  paidBreak: string; 
  unpaidBreak: string; 
  section?: Section; 
  label: string; 
  isNonCountable: boolean; 
  hrCode: string | null; 
  wage: number; 
  warnings?: WarningType[]; 
  absenceType?: AbsenceType
}

export interface IUpdatedShift {
  id: string;
  timeInterval: {
    start: string; 
    end: string; 
  };
  paidBreak: string; 
  unpaidBreak: string;
  hrCode: string | null; 
  section?: Section;
  employeeId?: string;
}

