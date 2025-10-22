import { useState, useEffect } from "react";
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
import { Badge } from "./ui/badge";
import { Calendar, Users, Euro, Mail, Phone, User, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: {
    title: string;
    bookTitle: string;
    bookAuthor: string;
    date: string;
    time: string;
    spotsLeft: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
  } | null;
}

const pricingRules = [
  { minPeople: 2, maxPeople: 2, adultPrice: 40, kidPrice: 30 },
  { minPeople: 3, maxPeople: 3, adultPrice: 30, kidPrice: 26 },
  { minPeople: 4, maxPeople: 4, adultPrice: 28, kidPrice: 24 },
  { minPeople: 5, maxPeople: 5, adultPrice: 26, kidPrice: 22 },
  { minPeople: 6, maxPeople: 8, adultPrice: 24, kidPrice: 20 },
];

function calculatePrice(adults: number, kids: number): number {
  const total = adults + kids;
  
  if (total < 2) return 0;
  
  const pricing = pricingRules.find(
    (rule) => total >= rule.minPeople && total <= rule.maxPeople
  );
  
  if (!pricing) return 0;
  
  return adults * pricing.adultPrice + kids * pricing.kidPrice;
}

export function RegisterDialog({
  open,
  onOpenChange,
  event,
}: RegisterDialogProps) {
  const [numAdults, setNumAdults] = useState(2);
  const [numKids, setNumKids] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(calculatePrice(numAdults, numKids));
  }, [numAdults, numKids]);

  if (!event) return null;

  const totalPeople = numAdults + numKids;
  const isValidGroup = totalPeople >= 2 && totalPeople <= 8;
  const hasAvailableSpots = totalPeople <= event.spotsLeft;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidGroup || !hasAvailableSpots) return;
    
    // Here you would normally send the booking data to your backend
    alert(`Boeking bevestigd!\n\nEvenement: ${event.title}\nDatum: ${event.date}\nTijd: ${event.time}\nGasten: ${numAdults} volwassenen, ${numKids} kinderen\nTotaal: €${totalPrice}\n\nContact: ${firstName} ${lastName}\nE-mail: ${email}`);
    
    // Reset form
    setNumAdults(2);
    setNumKids(0);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registreer voor Evenement</DialogTitle>
          <DialogDescription>
            Voltooi je boeking voor {event.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Details Summary */}
          <div className="p-4 bg-slate-50 rounded-lg space-y-2">
            <h3 className="text-slate-900">{event.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{event.time}</span>
              </div>
              <Badge variant="outline">{event.difficulty === "Beginner" ? "Beginner" : event.difficulty === "Intermediate" ? "Gemiddeld" : "Gevorderd"}</Badge>
            </div>
            <p className="text-sm text-slate-600">
              Verplichte Lectuur: <span className="font-medium">{event.bookTitle}</span> door {event.bookAuthor}
            </p>
          </div>

          <Separator />

          {/* Number of People */}
          <div>
            <h3 className="mb-4">Aantal personen</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adults">
                  <Users className="w-4 h-4 inline mr-2" />
                  Volwassenen
                </Label>
                <Select
                  value={numAdults.toString()}
                  onValueChange={(value) => setNumAdults(parseInt(value))}
                >
                  <SelectTrigger id="adults">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "volwassene" : "volwassenen"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kids">
                  <Users className="w-4 h-4 inline mr-2" />
                  Kinderen (7-12 jaar)
                </Label>
                <Select
                  value={numKids.toString()}
                  onValueChange={(value) => setNumKids(parseInt(value))}
                >
                  <SelectTrigger id="kids">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "kind" : "kinderen"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Validation Messages */}
            {!isValidGroup && totalPeople > 0 && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {totalPeople < 2
                    ? "Minimaal 2 personen vereist."
                    : "Maximaal 8 personen toegestaan."}
                </AlertDescription>
              </Alert>
            )}

            {isValidGroup && !hasAvailableSpots && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Niet genoeg beschikbare plaatsen. Er zijn nog maar {event.spotsLeft}{" "}
                  {event.spotsLeft === 1 ? "plaats" : "plaatsen"} beschikbaar.
                </AlertDescription>
              </Alert>
            )}

            {/* Price Calculation */}
            {isValidGroup && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-blue-900">
                      {numAdults > 0 && `${numAdults} volwassene${numAdults > 1 ? "n" : ""}`}
                      {numAdults > 0 && numKids > 0 && " + "}
                      {numKids > 0 && `${numKids} ${numKids === 1 ? "kind" : "kinderen"}`}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Totaal aantal personen: {totalPeople}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Euro className="w-5 h-5 text-blue-600" />
                      <span className="text-blue-900">{totalPrice}</span>
                    </div>
                    <p className="text-xs text-blue-700">Totaalprijs</p>
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
                <li>Zorg dat je het boek <strong>{event.bookTitle}</strong> hebt gelezen</li>
                <li>Kom 10 minuten voor aanvang voor de briefing</li>
                <li>Kinderen jonger dan 7 jaar kunnen niet deelnemen</li>
                <li>Je ontvangt een bevestigingsmail na registratie</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              size="lg"
              disabled={!isValidGroup || !hasAvailableSpots || !firstName || !lastName || !email || !phone}
            >
              Bevestig Boeking - €{totalPrice}
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
