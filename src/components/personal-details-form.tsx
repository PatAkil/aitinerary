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

const interestOptions = [
  { value: "food", label: "Food" },
  { value: "nature", label: "Nature" },
  { value: "beach", label: "Beach" },
  { value: "nightlife", label: "Nightlife" },
  { value: "adventure", label: "Adventure" },
  { value: "history", label: "History" },
  { value: "art", label: "Art" },
  { value: "architecture", label: "Architecture" },
  { value: "music", label: "Music" },
  { value: "shopping", label: "Shopping" },
  { value: "hiking", label: "Hiking" },
  { value: "photography", label: "Photography" },
  { value: "wildlife", label: "Wildlife" },
  { value: "local-culture", label: "Local Culture" },
  { value: "festivals", label: "Festivals" },
  { value: "relaxation", label: "Relaxation" },
  { value: "sports", label: "Sports" },
  { value: "wellness", label: "Wellness" },
  { value: "wine-tasting", label: "Wine Tasting" },
  { value: "cooking", label: "Cooking" },
  { value: "anime", label: "Anime" },
];

const formSchema = z.object({
  age: z.enum(["18-24", "25-34", "35-44", "45-54", "55+"], {}),
  currentLocation: z.string().min(2, {
    message: "Please enter your current location.",
  }),
  interests: z.array(z.string()).min(1, {}),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  onFormSubmit: (
    data: Pick<SoloTravelFormData, "age" | "currentLocation" | "interests">,
  ) => void;
  initialForm?: Partial<SoloTravelFormData>;
}

export default function PersonalDetailsForm({
  onFormSubmit,
  initialForm,
}: ProfileFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: initialForm?.age || undefined,
      currentLocation: initialForm?.currentLocation || "",
      interests: initialForm?.interests || [],
    },
  });
  const hasFormError =
    !!form.formState.errors.currentLocation ||
    !!form.formState.errors.interests;

  function onSubmit(values: FormValues) {
    onFormSubmit({
      age: values.age as "18-24" | "25-34" | "35-44" | "45-54" | "55+",
      currentLocation: values.currentLocation,
      interests: values.interests,
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
          name="currentLocation"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <Label htmlFor="currentLocation">Current Location</Label>
              <Input id="currentLocation" placeholder="Amsterdam" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <Label htmlFor="Age">Age</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id="Age">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="18-24">18-24</SelectItem>
                  <SelectItem value="25-34">25-34</SelectItem>
                  <SelectItem value="35-44">35-44</SelectItem>
                  <SelectItem value="45-54">45-54</SelectItem>
                  <SelectItem value="55+">55+</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <Label htmlFor="Age">Interests</Label>
              <ToggleGroup
                className="grid grid-cols-3 gap-2 border rounded-md p-2 w-full"
                type="multiple"
                onValueChange={field.onChange}
                value={field.value}
              >
                {interestOptions.map(({ value, label }) => (
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
            <span>Please fill in all fields</span>
          </div>
        )}
        <div className="flex flex-row-reverse">
          <Button size={"lg"}>Next</Button>
        </div>
      </form>
    </Form>
  );
}
