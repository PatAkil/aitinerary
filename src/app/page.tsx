import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center ">
      <div className="flex items-center justify-center flex-col">
        <h1 className="mb-6 text-center text-2xl font-bold ">AItinerary</h1>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Ready for your next adventure?!</CardTitle>
            <CardDescription>
              Create your ideal itinerary in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input id="currentLocation" placeholder="Amsterdam" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Age">Age</Label>
                  <Select>
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
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Age">Interests</Label>
                  <ToggleGroup
                    className="grid grid-cols-3 gap-2 border rounded-md p-2"
                    type="multiple"
                  >
                    {interestOptions.map(({ value, label }) => (
                      <>
                        <ToggleGroupItem value={value}>{label}</ToggleGroupItem>
                      </>
                    ))}
                  </ToggleGroup>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-row-reverse">
            <Button>Next</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
