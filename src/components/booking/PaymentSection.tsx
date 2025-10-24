import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Wallet } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentSectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export const PaymentSection = ({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            This is a demo. No actual payment will be processed.
          </AlertDescription>
        </Alert>

        <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
              <CreditCard className="w-5 h-5" />
              <span>Credit / Debit Card</span>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="wallet" id="wallet" />
            <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer flex-1">
              <Wallet className="w-5 h-5" />
              <span>Digital Wallet</span>
            </Label>
          </div>
        </RadioGroup>

        {paymentMethod === "card" && (
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
