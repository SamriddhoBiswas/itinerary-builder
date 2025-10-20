export interface TourOverview {
  title: string;
  duration: string;
  travelers: number;
  departureDate: string;
  returnDate: string;
  departureCity: string;
  arrivalCity: string;
  customerName?: string;
  departureFrom?: string;
  destination?: string;
}

export interface DayActivity {
  time: 'morning' | 'afternoon' | 'evening';
  description: string;
}

export interface Transport {
  type: 'flight' | 'transfer' | 'train' | 'other';
  details: string;
  time?: string;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  title: string;
  date?: string;
  activities: DayActivity[];
  transport?: Transport[];
  imageUrl?: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  checkIn: string;
  checkOut: string;
  nights: number;
}

export interface PaymentInstallment {
  id: string;
  amount: number;
  dueDate: string;
  description?: string;
}

export interface Flight {
  id: string;
  date: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
}

export interface Activity {
  city: string;
  activity: string;
  type: string;
  timeRequired: string;
}

export interface ScopeOfService {
  service: string;
  details: string;
}

export interface InclusionItem {
  category: string;
  count: string;
  details: string;
  status: string;
}

export interface ImportantNote {
  point: string;
  details: string;
}

export interface VisaDetails {
  visaType: string;
  validity: string;
  processingDate: string;
}

export interface ItineraryData {
  tourOverview: TourOverview;
  days: ItineraryDay[];
  hotels: Hotel[];
  paymentPlan: PaymentInstallment[];
  inclusions: string[];
  exclusions: string[];
  flights?: Flight[];
  activities: Activity[];
  scopeOfService: ScopeOfService[];
  inclusionItems: InclusionItem[];
  importantNotes: ImportantNote[];
  tcsAmount: string;
  visaDetails: VisaDetails;
}
