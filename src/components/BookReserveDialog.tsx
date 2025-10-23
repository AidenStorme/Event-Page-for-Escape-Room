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
import { Calendar, User, Mail, Phone, BookOpen, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  availability: "beschikbaar" | "uitgeleend";
}

interface BookReserveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book | null;
}

export function BookReserveDialog({
  open,
  onOpenChange,
  book,
}: BookReserveDialogProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [success, setSuccess] = useState(false);

  if (!book) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally send the reservation data to your backend
    console.log({
      book: book.title,
      firstName,
      lastName,
      email,
      phone,
      pickupDate,
    });

    setSuccess(true);
    
    // Reset form after 2 seconds and close dialog
    setTimeout(() => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPickupDate("");
      setSuccess(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Boek Reserveren</DialogTitle>
          <DialogDescription>
            Vul je gegevens in om dit boek te reserveren
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Reservering Bevestigd!
            </h3>
            <p className="text-slate-600">
              Je ontvangt een bevestigingsmail op {email}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Book Info */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-1">{book.title}</h4>
              <p className="text-sm text-slate-600 mb-3">door {book.author}</p>
              <div className="flex justify-center">
                <img 
                  src={book.coverUrl} 
                  alt={book.title}
                  className="w-24 h-36 object-cover rounded shadow-md"
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    <User className="w-4 h-4 inline mr-2" />
                    Voornaam
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Achternaam</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-2" />
                  E-mailadres
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telefoonnummer
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupDate">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Gewenste Ophaaldatum
                </Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            {/* Info Alert */}
            <Alert>
              <BookOpen className="w-4 h-4" />
              <AlertDescription>
                Je kunt het boek ophalen op de gewenste datum. De uitleentermijn is 14 dagen.
              </AlertDescription>
            </Alert>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Annuleren
              </Button>
              <Button type="submit" className="flex-1">
                Bevestig Reservering
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
