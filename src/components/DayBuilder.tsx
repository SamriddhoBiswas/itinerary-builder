import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { ItineraryDay, DayActivity } from "@/types/itinerary";

interface DayBuilderProps {
  days: ItineraryDay[];
  onChange: (days: ItineraryDay[]) => void;
}

export const DayBuilder = ({ days, onChange }: DayBuilderProps) => {
  const addDay = () => {
    const newDay: ItineraryDay = {
      id: `day-${Date.now()}`,
      dayNumber: days.length + 1,
      title: `Day ${days.length + 1}`,
      activities: [
        { time: 'morning', description: '' },
        { time: 'afternoon', description: '' },
        { time: 'evening', description: '' },
      ],
    };
    onChange([...days, newDay]);
  };

  const removeDay = (id: string) => {
    const filtered = days.filter(d => d.id !== id);
    const renumbered = filtered.map((day, idx) => ({
      ...day,
      dayNumber: idx + 1,
      title: day.title.includes('Day') ? `Day ${idx + 1}` : day.title,
    }));
    onChange(renumbered);
  };

  const updateDay = (id: string, field: keyof ItineraryDay, value: any) => {
    onChange(days.map(day => day.id === id ? { ...day, [field]: value } : day));
  };

  const updateActivity = (dayId: string, time: DayActivity['time'], description: string) => {
    onChange(days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.map(act => 
            act.time === time ? { ...act, description } : act
          ),
        };
      }
      return day;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Day-by-Day Itinerary</h2>
        <Button onClick={addDay} className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))]">
          <Plus className="mr-2 h-4 w-4" /> Add Day
        </Button>
      </div>

      {days.map((day) => (
        <Card key={day.id} className="shadow-[var(--shadow-card)]">
          <CardHeader className="bg-muted/50">
            <div className="flex justify-between items-center">
              <CardTitle>Day {day.dayNumber}</CardTitle>
              {days.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDay(day.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Day Title</Label>
              <Input
                value={day.title}
                onChange={(e) => updateDay(day.id, 'title', e.target.value)}
                placeholder="e.g., Arrival in Srinagar"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Morning Activities</Label>
              <Textarea
                value={day.activities.find(a => a.time === 'morning')?.description || ''}
                onChange={(e) => updateActivity(day.id, 'morning', e.target.value)}
                placeholder="Describe morning activities..."
                rows={2}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Afternoon Activities</Label>
              <Textarea
                value={day.activities.find(a => a.time === 'afternoon')?.description || ''}
                onChange={(e) => updateActivity(day.id, 'afternoon', e.target.value)}
                placeholder="Describe afternoon activities..."
                rows={2}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold">Evening Activities</Label>
              <Textarea
                value={day.activities.find(a => a.time === 'evening')?.description || ''}
                onChange={(e) => updateActivity(day.id, 'evening', e.target.value)}
                placeholder="Describe evening activities..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
