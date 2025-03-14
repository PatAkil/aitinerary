export interface Profile {
  age?: "18-24" | "25-34" | "35-44" | "45-54" | "55+";
  currentLocation?: string;
  destination?: string;
  interests?: string[];
}

export interface Preferences {
  interests?: string[];
  travelPace?: "packed" | "balanced" | "free-flowing";
  transportation: string[];
}

interface Location {
  title: string;
  description: string;
}

export interface Continents {
  continentContent?: Location[];
  selectedContinent?: string;
}

export interface Countries {
  countryContent?: Location[];
  selectedCountry?: string;
}

export interface SoloTravelFormData
  extends Profile,
    Preferences,
    Continents,
    Countries {}
