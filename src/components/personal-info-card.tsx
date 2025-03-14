"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
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
  age: z.enum(["18-24", "25-34", "35-44", "45-54", "55+"], {
    message: "Please select your age range.",
  }),
  currentLocation: z.string().min(2, {
    message: "Please enter your current location.",
  }),
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one interest.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  onFormSubmit: (
    data: Pick<SoloTravelFormData, "age" | "currentLocation" | "interests">,
  ) => void;
  initialForm?: Partial<SoloTravelFormData>;
}

export default function PersonalInfoCard({
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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Ready for your next adventure?!</CardTitle>
        <CardDescription>
          Create your ideal itinerary in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                  <Input
                    id="currentLocation"
                    placeholder="Amsterdam"
                    {...field}
                  />
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
                      <SelectValue
                        placeholder="Select"
                        className={cn(
                          form.formState.errors.age
                            ? "border-red-500"
                            : "border-border",
                        )}
                      />
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
                    className="grid grid-cols-3 gap-2 border rounded-md p-2"
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
                <span>Please fill in all form fields</span>
              </div>
            )}
            <div className="flex flex-row-reverse">
              <Button>Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
