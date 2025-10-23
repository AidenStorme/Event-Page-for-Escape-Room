import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, Users, BookOpen, Lock } from "lucide-react";

interface EventCardProps {
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
  onLearnMore?: () => void;
  onRegister?: () => void;
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
  onLearnMore,
  onRegister,
}: EventCardProps) {
  const difficultyColors = {
    Beginner: "bg-green-100 text-green-800 border-green-300",
    Intermediate: "bg-amber-100 text-amber-800 border-amber-300",
    Advanced: "bg-red-100 text-red-800 border-red-300",
  };

  const difficultyTranslations = {
    Beginner: "Beginner",
    Intermediate: "Gemiddeld",
    Advanced: "Gevorderd",
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
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-slate-700">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{time}</span>
              </div>
            </div>

            {/* Spots Available */}
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
          </div>

          {/* Action Button */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 flex items-center justify-center" onClick={onRegister}>
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Registreer Nu</span>
              </div>
              <span className="ml-3 inline-flex items-center text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5 text-xs font-medium">
                +25 punten
              </span>
            </Button>
            <Button variant="outline" onClick={onLearnMore}>Meer Info</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
