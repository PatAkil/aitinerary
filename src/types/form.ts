export interface UserDetails {
  age?: "18-24" | "25-34" | "35-44" | "45-54" | "55+";
  currentLocation?: string;
  interests?: string[];
}

export interface TravelDetails {
  destination?: string;
  travelPace?: "fast-paced" | "balanced" | "relaxed";
  experience?: "beginner" | "intermediate" | "expert";
  transportation: string[];
}

export interface SoloTravelFormData extends UserDetails, TravelDetails {}
