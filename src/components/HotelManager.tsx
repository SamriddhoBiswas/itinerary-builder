import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Hotel } from "@/types/itinerary";

interface HotelManagerProps {
  hotels: Hotel[];
  onChange: (hotels: Hotel[]) => void;
}

export const HotelManager = ({ hotels, onChange }: HotelManagerProps) => {
  const addHotel = () => {
    const newHotel: Hotel = {
      id: `hotel-${Date.now()}`,
      name: '',
      city: '',
      checkIn: '',
      checkOut: '',
      nights: 1,
    };
    onChange([...hotels, newHotel]);
  };

  const removeHotel = (id: string) => {
    onChange(hotels.filter(h => h.id !== id));
  };

  const updateHotel = (id: string, field: keyof Hotel, value: string | number) => {
    onChange(hotels.map(hotel => hotel.id === id ? { ...hotel, [field]: value } : hotel));
  };

  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))] text-primary-foreground">
        <div className="flex justify-between items-center">
          <CardTitle>Hotel Bookings</CardTitle>
          <Button onClick={addHotel} variant="secondary" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Hotel
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {hotels.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No hotels added yet. Click "Add Hotel" to get started.</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.id} className="p-4 border rounded-lg space-y-3 bg-muted/30">
              <div className="flex justify-between items-start">
                <Label className="font-semibold">Hotel Details</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHotel(hotel.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm">Hotel Name</Label>
                  <Input
                    value={hotel.name}
                    onChange={(e) => updateHotel(hotel.id, 'name', e.target.value)}
                    placeholder="e.g., The Lalit Grand Palace"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">City</Label>
                  <Input
                    value={hotel.city}
                    onChange={(e) => updateHotel(hotel.id, 'city', e.target.value)}
                    placeholder="e.g., Srinagar"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm">Check-in</Label>
                  <Input
                    type="date"
                    value={hotel.checkIn}
                    onChange={(e) => updateHotel(hotel.id, 'checkIn', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Check-out</Label>
                  <Input
                    type="date"
                    value={hotel.checkOut}
                    onChange={(e) => updateHotel(hotel.id, 'checkOut', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Nights</Label>
                  <Input
                    type="number"
                    value={hotel.nights}
                    onChange={(e) => updateHotel(hotel.id, 'nights', parseInt(e.target.value) || 1)}
                    min="1"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
