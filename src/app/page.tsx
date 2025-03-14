"use client";

import { useState } from "react";

import PersonalInfoCard from "@/components/personal-info-card";
import { SoloTravelFormData } from "@/types/form";

export default function Home() {
  const [formData, setFormData] = useState<SoloTravelFormData>({
    age: undefined,
    continentContent: [],
    countryContent: [],
    currentLocation: "",
    destination: "",
    selectedContinent: "",
    selectedCountry: "",
    transportation: [],
    travelPace: undefined,
    interests: [],
  });

  const handleFormSubmit = async (data: Partial<SoloTravelFormData>) => {
    setFormData((prev: SoloTravelFormData) => ({ ...prev, ...data }));
    console.log(data);
  };

  return (
    <main className="flex min-h-screen items-center justify-center ">
      <div className="flex items-center justify-center flex-col">
        <h1 className="mb-6 text-center text-2xl font-bold ">AItinerary</h1>
        <PersonalInfoCard
          onFormSubmit={handleFormSubmit}
          initialForm={formData}
        />
      </div>
    </main>
  );
}
