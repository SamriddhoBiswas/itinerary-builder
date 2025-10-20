import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface InclusionsExclusionsProps {
  inclusions: string[];
  exclusions: string[];
  onInclusionsChange: (inclusions: string[]) => void;
  onExclusionsChange: (exclusions: string[]) => void;
}

export const InclusionsExclusions = ({
  inclusions,
  exclusions,
  onInclusionsChange,
  onExclusionsChange,
}: InclusionsExclusionsProps) => {
  const addInclusion = () => {
    onInclusionsChange([...inclusions, '']);
  };

  const removeInclusion = (index: number) => {
    onInclusionsChange(inclusions.filter((_, i) => i !== index));
  };

  const updateInclusion = (index: number, value: string) => {
    onInclusionsChange(inclusions.map((item, i) => i === index ? value : item));
  };

  const addExclusion = () => {
    onExclusionsChange([...exclusions, '']);
  };

  const removeExclusion = (index: number) => {
    onExclusionsChange(exclusions.filter((_, i) => i !== index));
  };

  const updateExclusion = (index: number, value: string) => {
    onExclusionsChange(exclusions.map((item, i) => i === index ? value : item));
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex justify-between items-center">
            <CardTitle>Inclusions</CardTitle>
            <Button onClick={addInclusion} variant="secondary" size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          {inclusions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No inclusions added yet.</p>
          ) : (
            inclusions.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateInclusion(index, e.target.value)}
                  placeholder="e.g., All meals included"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeInclusion(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="flex justify-between items-center">
            <CardTitle>Exclusions</CardTitle>
            <Button onClick={addExclusion} variant="secondary" size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          {exclusions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No exclusions added yet.</p>
          ) : (
            exclusions.map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateExclusion(index, e.target.value)}
                  placeholder="e.g., International flights"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExclusion(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
