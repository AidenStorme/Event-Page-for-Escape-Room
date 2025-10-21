import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";
import { Calendar as CalendarIcon, Clock, Euro, Mail, Phone, User, AlertCircle, FileText } from "lucide-react";
import { format } from "date-fns";

interface PrinterBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  printer: {
    name: string;
    model: string;
  } | null;
}

const timeSlots = [
  "09:00 - 11:00",
  "11:00 - 13:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "17:00 - 19:00",
];

const pricingTiers = [
  { duration: "1-2 uur", price: 5, description: "Kleine projecten" },
  { duration: "3-4 uur", price: 8, description: "Middelgrote projecten" },
  { duration: "5+ uur", price: 12, description: "Grote projecten" },
];

export function PrinterBookingDialog({
  open,
  onOpenChange,
  printer,
}: PrinterBookingDialogProps) {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [duration, setDuration] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [material, setMaterial] = useState("");

  if (!printer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    alert(`Booking confirmed!\n\nPrinter: ${printer.name}\nDate: ${date ? format(date, 'PPP') : ''}\nTime: ${timeSlot}\nDuration: ${duration}\nMaterial: ${material}\n\nContact: ${firstName} ${lastName}\nEmail: ${email}`);
    
    // Reset form
    setDate(undefined);
    setTimeSlot("");
    setDuration("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setProjectDescription("");
    setMaterial("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book 3D Printer</DialogTitle>
          <DialogDescription>
            Reserve a time slot for {printer.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Printer Details Summary */}
          <div className="p-4 bg-slate-50 rounded-lg space-y-2">
            <h3 className="text-slate-900">{printer.name}</h3>
            <p className="text-sm text-slate-600">{printer.model}</p>
          </div>

          <Separator />

          {/* Date and Time Selection */}
          <div>
            <h3 className="mb-4">Datum en tijd</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  <CalendarIcon className="w-4 h-4 inline mr-2" />
                  Datum
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      {date ? format(date, 'PPP') : "Selecteer datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => 
                        date < new Date() || date < new Date("2025-10-21")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSlot">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Tijdslot
                </Label>
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger id="timeSlot">
                    <SelectValue placeholder="Selecteer tijdslot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Project Details */}
          <div>
            <h3 className="mb-4">Projectdetails</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="duration">
                  Geschatte duur *
                </Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Selecteer duur" />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingTiers.map((tier) => (
                      <SelectItem key={tier.duration} value={tier.duration}>
                        {tier.duration} - €{tier.price} ({tier.description})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="material">
                  Materiaal *
                </Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger id="material">
                    <SelectValue placeholder="Selecteer materiaal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pla">PLA (Meest gebruikt)</SelectItem>
                    <SelectItem value="abs">ABS (Steviger)</SelectItem>
                    <SelectItem value="petg">PETG (Flexibel)</SelectItem>
                    <SelectItem value="tpu">TPU (Zeer flexibel)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Projectbeschrijving *
                </Label>
                <Textarea
                  id="description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Beschrijf wat je wilt printen..."
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Pricing Display */}
            {duration && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-900">
                      {duration}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Materiaalkosten niet inbegrepen
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Euro className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-900">
                        {pricingTiers.find(t => t.duration === duration)?.price}
                      </span>
                    </div>
                    <p className="text-xs text-blue-700">Basisprijs</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="mb-4">Contactgegevens</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  <User className="w-4 h-4 inline mr-2" />
                  Voornaam *
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jan"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  <User className="w-4 h-4 inline mr-2" />
                  Achternaam *
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Jansen"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-2" />
                  E-mailadres *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jan.jansen@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telefoonnummer *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+31 6 12345678"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Important Notes */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Breng je eigen 3D-bestand mee (.STL of .OBJ formaat)</li>
                <li>Kom 15 minuten voor je tijdslot voor instructies</li>
                <li>Materiaalkosten worden apart berekend op basis van gewicht</li>
                <li>Je ontvangt een bevestigingsmail na reservering</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              size="lg"
              disabled={!date || !timeSlot || !duration || !firstName || !lastName || !email || !phone || !projectDescription || !material}
            >
              Bevestig Reservering
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => onOpenChange(false)}
            >
              Annuleren
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
