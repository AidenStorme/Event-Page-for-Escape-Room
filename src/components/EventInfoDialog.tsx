import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Separator } from "./ui/separator";
import { Calendar, Clock, Users, BookOpen, Lock, MapPin, Info } from "lucide-react";

interface EventInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: {
    title: string;
    bookTitle: string;
    bookAuthor: string;
    date: string;
    time: string;
    spotsLeft: number;
    totalSpots: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    description: string;
    imageUrl: string;
  } | null;
  onRegister?: () => void;
}

const pricingData = [
  { people: "2 personen", adults: "40 €", kids: "30 €" },
  { people: "3 personen", adults: "30 €", kids: "26 €" },
  { people: "4 personen", adults: "28 €", kids: "24 €" },
  { people: "5 personen", adults: "26 €", kids: "22 €" },
  { people: "6/7/8 personen", adults: "24 €", kids: "20 €" },
];

export function EventInfoDialog({
  open,
  onOpenChange,
  event,
  onRegister,
}: EventInfoDialogProps) {
  if (!event) return null;

  const difficultyColors = {
    Beginner: "bg-green-100 text-green-800 border-green-300",
    Intermediate: "bg-amber-100 text-amber-800 border-amber-300",
    Advanced: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            Complete event details and pricing information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className={`${difficultyColors[event.difficulty]} border`}>
                {event.difficulty}
              </Badge>
            </div>
          </div>

          {/* Required Book */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-blue-900 mb-1">
                  <span className="font-medium">Required Reading:</span> {event.bookTitle}
                </p>
                <p className="text-blue-700">by {event.bookAuthor}</p>
                <p className="text-sm text-blue-600 mt-2">
                  You must have read this book to participate. Plot knowledge is essential for solving the escape room puzzles!
                </p>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h3 className="mb-3">Event Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Calendar className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="text-sm text-slate-600">Date</p>
                  <p className="text-slate-900">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Clock className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="text-sm text-slate-600">Time</p>
                  <p className="text-slate-900">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Users className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="text-sm text-slate-600">Availability</p>
                  <p className="text-slate-900">
                    {event.spotsLeft} of {event.totalSpots} spots left
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <MapPin className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="text-sm text-slate-600">Location</p>
                  <p className="text-slate-900">Library Event Room</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="mb-2">About This Event</h3>
            <p className="text-slate-600">{event.description}</p>
          </div>

          <Separator />

          {/* Pricing Table */}
          <div>
            <h3 className="mb-3">Prijzen</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aantal personen</TableHead>
                    <TableHead>Volwassenen</TableHead>
                    <TableHead>Kids (7-12 jaar)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pricingData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.people}</TableCell>
                      <TableCell>{row.adults}</TableCell>
                      <TableCell>{row.kids}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-900">
                Prijzen zijn per persoon. Minimaal 2 personen vereist. Kinderen jonger dan 7 jaar kunnen niet deelnemen.
              </p>
            </div>
          </div>

          <Separator />

          {/* What to Bring */}
          <div>
            <h3 className="mb-2">What to Bring</h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>A thorough understanding of the required book</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Your team spirit and problem-solving skills</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Arrive 10 minutes early for briefing</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              className="flex-1" 
              size="lg"
              onClick={() => {
                onOpenChange(false);
                onRegister?.();
              }}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Register Now
            </Button>
            <Button variant="outline" size="lg" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
