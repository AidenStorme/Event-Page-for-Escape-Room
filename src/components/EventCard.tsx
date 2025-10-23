import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, Users, BookOpen, Lock } from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  spotsLeft: number;
  totalSpots: number;
  isFull: boolean;
}

interface EventCardProps {
  title: string;
  bookTitle: string;
  bookAuthor: string;
  date: string;
  time?: string;
  spotsLeft: number;
  totalSpots: number;
  difficulty: "Beginner" | "Gematigd" | "Gevorderd";
  description: string;
  imageUrl: string;
  timeSlots?: TimeSlot[];
  onLearnMore?: () => void;
  onRegister?: (timeSlot?: TimeSlot) => void;
}

export function EventCard({
  title,
  bookTitle,
  bookAuthor,
  date,
  time,
  spotsLeft,
  totalSpots,
  difficulty,
  description,
  imageUrl,
  timeSlots,
  onLearnMore,
  onRegister,
}: EventCardProps) {
  const difficultyColors: Record<"Beginner" | "Gematigd" | "Gevorderd", string> = {
    Beginner: "bg-green-100 text-green-800 border-green-300",
    Gematigd: "bg-amber-100 text-amber-800 border-amber-300",
    Gevorderd: "bg-red-100 text-red-800 border-red-300",
  };

  const difficultyTranslations: Record<"Beginner" | "Gematigd" | "Gevorderd", string> = {
    Beginner: "Beginner",
    Gematigd: "Gematigd",
    Gevorderd: "Gevorderd",
  };

  const spotsLow = spotsLeft <= 3;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="grid md:grid-cols-[300px_1fr] gap-0">
        {/* Image Section */}
        <div className="relative h-64 md:h-auto bg-slate-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className={`${difficultyColors[difficulty]} border`}>
              {difficultyTranslations[difficulty]}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col">
          <div className="flex-1">
            <h3 className="mb-2">{title}</h3>
            
            {/* Required Book */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-900">
                    <span className="font-medium">Verplichte Lectuur:</span> {bookTitle}
                  </p>
                  <p className="text-sm text-blue-700">door {bookAuthor}</p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 mb-4">{description}</p>

            {/* Event Details */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{date}</span>
              </div>
            </div>

            {/* Time Slots */}
            {timeSlots && timeSlots.length > 0 ? (
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Beschikbare Tijdsloten:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        slot.isFull
                          ? 'bg-slate-50 border-slate-200'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-900">{slot.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-slate-600" />
                          <span className="text-sm text-slate-600">
                            {slot.spotsLeft}/{slot.totalSpots}
                          </span>
                        </div>
                        {slot.spotsLeft <= 3 && !slot.isFull && (
                          <Badge variant="destructive" className="text-xs">Bijna Vol</Badge>
                        )}
                        <Button 
                          size="sm" 
                          onClick={() => onRegister?.(slot)}
                          className="text-xs h-8"
                          disabled={slot.isFull}
                        >
                          {slot.isFull ? 'Vol' : 'Reserveer'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4 text-slate-700" />
                <span className="text-sm text-slate-700">
                  {spotsLeft} van {totalSpots} plaatsen beschikbaar
                </span>
                {spotsLow && (
                  <Badge variant="destructive" className="ml-2">
                    Bijna Vol!
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {!timeSlots || timeSlots.length === 0 ? (
              <Button className="flex-1 flex items-center justify-center" onClick={() => onRegister?.()}>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Registreer Nu</span>
                </div>
                <span className="ml-3 inline-flex items-center text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5 text-xs font-medium">
                  +25 punten
                </span>
              </Button>
            ) : null}
            <Button variant="outline" onClick={onLearnMore} className={timeSlots && timeSlots.length > 0 ? 'flex-1' : ''}>Meer Info</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
