"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SoloTravelFormData } from "@/types/form";

const travelOptions = [
  { value: "walking", label: "Walking" },
  { value: "cycling", label: "Cycling" },
  { value: "metro", label: "Metro/Subway" },
  { value: "tram", label: "Tram/Light Rail" },
  { value: "bus", label: "Bus" },
  { value: "train", label: "Train (Regional)" },
  { value: "scooter", label: "Scooter / Moped" },
  { value: "ride share", label: "Taxi / Ride share" },
];

const formSchema = z.object({
  experience: z.enum(["beginner", "intermediate", "expert"], {}),
  travelPace: z.enum(["fast-paced", "balanced", "relaxed"], {}),
  destination: z.string().min(2, {
    message: "Please enter your destination.",
  }),
  transportation: z.array(z.string()).min(1, {}),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  onFormSubmit: (
    data: Pick<
      SoloTravelFormData,
      "travelPace" | "destination" | "transportation" | "experience"
    >,
  ) => void;
  onBack: () => void;
  initialForm?: Partial<SoloTravelFormData>;
}

export default function TravelDetailsForm({
  onFormSubmit,
  onBack,
  initialForm,
}: ProfileFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelPace: initialForm?.travelPace || undefined,
      experience: initialForm?.experience || undefined,
      destination: initialForm?.destination || "",
      transportation: initialForm?.transportation || [],
    },
  });
  const hasFormError =
    !!form.formState.errors.travelPace ||
    !!form.formState.errors.experience ||
    !!form.formState.errors.transportation;

  function onSubmit(values: FormValues) {
    onFormSubmit({
      travelPace: values.travelPace as "fast-paced" | "balanced" | "relaxed",
      experience: values.experience as "beginner" | "intermediate" | "expert",
      destination: values.destination,
      transportation: values.transportation,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full items-center gap-4"
      >
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" placeholder="London" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <Label htmlFor="experience">Travel experience</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="experience" className={"w-full"}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="beginner">
                    First-Time Solo Traveler
                  </SelectItem>
                  <SelectItem value="intermediate">
                    Occasional Solo Traveler
                  </SelectItem>
                  <SelectItem value="expert">Seasoned Solo Traveler</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="travelPace"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <Label htmlFor="travelPace">Travel pace</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="travelPace" className={"w-full"}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="relaxed">Relaxed</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="fast-paced">Fast-paced</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transportation"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <Label htmlFor="Age">How would you like to travel around?</Label>
              <ToggleGroup
                className="grid grid-cols-2 gap-2 border rounded-md p-2 w-full"
                type="multiple"
                onValueChange={field.onChange}
                value={field.value}
              >
                {travelOptions.map(({ value, label }) => (
                  <ToggleGroupItem key={value} value={value}>
                    {label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FormItem>
          )}
        />
        {hasFormError && (
          <div className="text-red-500 text-sm">
            <span>Please fill in all form fields</span>
          </div>
        )}
        <div className="flex justify-between">
          <Button size={"lg"} variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button size={"lg"} type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
}
