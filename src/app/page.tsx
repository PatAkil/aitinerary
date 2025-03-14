"use client";

import { useState } from "react";

import PersonalDetailsForm from "@/components/personal-details-form";
import TravelDetailsForm from "@/components/travel-details-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SoloTravelFormData } from "@/types/form";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<SoloTravelFormData>({
    age: undefined,
    currentLocation: "",
    destination: "",
    experience: undefined,
    interests: [],
    transportation: [],
    travelPace: undefined,
  });

  const totalSteps = 3;
  const handleFormSubmit = async (data: Partial<SoloTravelFormData>) => {
    setFormData((prev: SoloTravelFormData) => ({ ...prev, ...data }));
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
    console.log({ ...formData, ...data });
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center ">
      <div className="flex items-center justify-center flex-col">
        <h1 className="mb-6 text-center text-2xl font-bold ">AItinerary</h1>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Ready for your next adventure?!</CardTitle>
            <CardDescription>
              Create your perfect itinerary in just a few clicks!
            </CardDescription>
            <Progress value={(100 / (totalSteps - 1)) * (currentStep - 1)} />
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <PersonalDetailsForm
                onFormSubmit={handleFormSubmit}
                initialForm={formData}
              />
            )}
            {currentStep === 2 && (
              <TravelDetailsForm
                onFormSubmit={handleFormSubmit}
                onBack={goBack}
                initialForm={formData}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
