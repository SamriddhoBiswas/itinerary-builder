import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { PaymentInstallment } from "@/types/itinerary";

interface PaymentPlanBuilderProps {
  payments: PaymentInstallment[];
  onChange: (payments: PaymentInstallment[]) => void;
}

export const PaymentPlanBuilder = ({ payments, onChange }: PaymentPlanBuilderProps) => {
  const addPayment = () => {
    const newPayment: PaymentInstallment = {
      id: `payment-${Date.now()}`,
      amount: 0,
      dueDate: '',
      description: '',
    };
    onChange([...payments, newPayment]);
  };

  const removePayment = (id: string) => {
    onChange(payments.filter(p => p.id !== id));
  };

  const updatePayment = (id: string, field: keyof PaymentInstallment, value: string | number) => {
    onChange(payments.map(payment => payment.id === id ? { ...payment, [field]: value } : payment));
  };

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader className="bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--primary))] text-primary-foreground">
        <div className="flex justify-between items-center">
          <CardTitle>Payment Plan</CardTitle>
          <Button onClick={addPayment} variant="secondary" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Installment
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {payments.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No payment installments yet. Click "Add Installment" to start.</p>
        ) : (
          <>
            {payments.map((payment, index) => (
              <div key={payment.id} className="p-4 border rounded-lg space-y-3 bg-muted/30">
                <div className="flex justify-between items-start">
                  <Label className="font-semibold">Installment {index + 1}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removePayment(payment.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm">Amount (₹)</Label>
                    <Input
                      type="number"
                      value={payment.amount}
                      onChange={(e) => updatePayment(payment.id, 'amount', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Due Date</Label>
                    <Input
                      type="date"
                      value={payment.dueDate}
                      onChange={(e) => updatePayment(payment.id, 'dueDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Description</Label>
                    <Input
                      value={payment.description}
                      onChange={(e) => updatePayment(payment.id, 'description', e.target.value)}
                      placeholder="e.g., Booking deposit"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total Amount:</span>
                <span className="text-primary">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
