import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TourOverview } from "@/types/itinerary";

interface TourOverviewFormProps {
  data: TourOverview;
  onChange: (data: TourOverview) => void;
}

export const TourOverviewForm = ({ data, onChange }: TourOverviewFormProps) => {
  const handleChange = (field: keyof TourOverview, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))] text-primary-foreground">
        <CardTitle>Tour Overview</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Trip Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Majestic Kashmir"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={data.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="e.g., 7 Days 6 Nights"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="travelers">Number of Travelers</Label>
            <Input
              id="travelers"
              type="number"
              value={data.travelers}
              onChange={(e) => handleChange('travelers', parseInt(e.target.value) || 0)}
              placeholder="2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              type="date"
              value={data.departureDate}
              onChange={(e) => handleChange('departureDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="returnDate">Return Date</Label>
            <Input
              id="returnDate"
              type="date"
              value={data.returnDate}
              onChange={(e) => handleChange('returnDate', e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="departureCity">Departure City</Label>
            <Input
              id="departureCity"
              value={data.departureCity}
              onChange={(e) => handleChange('departureCity', e.target.value)}
              placeholder="e.g., Delhi"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="arrivalCity">Arrival City</Label>
            <Input
              id="arrivalCity"
              value={data.arrivalCity}
              onChange={(e) => handleChange('arrivalCity', e.target.value)}
              placeholder="e.g., Srinagar"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
