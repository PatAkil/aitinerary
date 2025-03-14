"use client";

import React, { useState } from "react";

import { ItineraryRenderer } from "@/components/itinerary-renderer";
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
  const [content, setContent] = useState<string>("");
  const onChunk = React.useCallback(
    (chunk: string) => setContent((currentData) => currentData + chunk),
    [],
  );

  const totalSteps = 3;
  const handleFormSubmit = async (data: Partial<SoloTravelFormData>) => {
    setFormData((prev: SoloTravelFormData) => ({ ...prev, ...data }));
    const newStep = currentStep + 1;
    if (currentStep <= totalSteps) {
      setCurrentStep(newStep);
    }

    console.log(newStep);
    if (newStep !== 3) {
      return;
    }

    const response = await fetch("/api/streamItinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: { ...formData, ...data },
      }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let isStreaming = true;
    let buffer = "";

    while (isStreaming) {
      const { value, done } = await reader.read();
      if (done) {
        isStreaming = false;
        break;
      }
      const chunkValue = decoder.decode(value);
      buffer += chunkValue;

      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      const dataPrefix = "data: ";
      for (const line of lines) {
        if (!line.startsWith(dataPrefix)) {
          continue;
        }

        const dataStr = line.slice(dataPrefix.length);
        const data = JSON.parse(dataStr);
        if (data?.data?.content === "null") {
          continue;
        }
        onChunk(data?.data?.content);
      }
    }
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
            {currentStep !== 3 && (
              <>
                <CardDescription>
                  Create the perfect 5-day itinerary instantly
                </CardDescription>
                <Progress
                  value={(100 / (totalSteps - 1)) * (currentStep - 1)}
                />
              </>
            )}
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
            {currentStep === totalSteps && (
              <ItineraryRenderer content={content} />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
