import { useState } from "react";
import { EventCard } from "./EventCard";
import { EventInfoDialog } from "./EventInfoDialog";
import { RegisterDialog } from "./RegisterDialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, Filter, Trophy } from "lucide-react";
import { Input } from "./ui/input";
import EscapeRoomsLeaderboard from "./EscapeRoomsLeaderboard";

const upcomingEvents = [
  {
    title: "Moord in het Landhuis: Een Gotisch Mysterie",
    bookTitle: "The Silent Patient",
    bookAuthor: "Alex Michaelides",
    date: "2 november 2025",
    time: "18:00 - 20:30",
    spotsLeft: 2,
    totalSpots: 8,
    difficulty: "Advanced" as const,
    description: "Ontrafel de geheimen van Thornfield Manor waar een misdaad de fundamenten heeft doen schudden. Gebruik je kennis van The Silent Patient om psychologische aanwijzingen te ontcijferen en de moordenaar te ontmaskeren.",
    imageUrl: "https://images.unsplash.com/photo-1569002925653-ed18f55d7292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc2NhcGUlMjByb29tJTIwbXlzdGVyeXxlbnwxfHx8fDE3NjEwMzQ4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "De Merkwaardige Zaak van het Vermiste Manuscript",
    bookTitle: "The Adventures of Sherlock Holmes",
    bookAuthor: "Arthur Conan Doyle",
    date: "9 november 2025",
    time: "15:00 - 17:30",
    spotsLeft: 6,
    totalSpots: 10,
    difficulty: "Intermediate" as const,
    description: "Stap het Victoriaanse Londen binnen en los een literair mysterie op dat Baker Street waardig is. Pas Holmes' deductieve redeneermethoden toe om een onbetaalbaar gestolen manuscript terug te vinden.",
    imageUrl: "https://images.unsplash.com/photo-1650178284536-2d6dff47f903?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXRlY3RpdmUlMjBib29rJTIwdmludGFnZXxlbnwxfHx8fDE3NjEwMzQ4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "De Betoverde Bibliotheek Overval",
    bookTitle: "The Night Circus",
    bookAuthor: "Erin Morgenstern",
    date: "16 november 2025",
    time: "19:00 - 21:00",
    spotsLeft: 8,
    totalSpots: 12,
    difficulty: "Beginner" as const,
    description: "Navigeer door magische puzzels en illusoire uitdagingen geïnspireerd door The Night Circus. Perfect voor beginnende escape room avonturiers met een liefde voor grillige mysteries.",
    imageUrl: "https://images.unsplash.com/photo-1658792953327-e3c9e7223e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBteXN0ZXJ5fGVufDF8fHx8MTc2MTAzNDg2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "De Vergiftigde Pen Genootschap",
    bookTitle: "And Then There Were None",
    bookAuthor: "Agatha Christie",
    date: "23 november 2025",
    time: "17:30 - 20:00",
    spotsLeft: 1,
    totalSpots: 8,
    difficulty: "Advanced" as const,
    description: "Sluit je aan bij een exclusieve bijeenkomst van een literair genootschap die dodelijk afloopt. Kanaliseer je innerlijke Agatha Christie om de moordenaar te identificeren tussen een cast van verdachte personages.",
    imageUrl: "https://images.unsplash.com/photo-1569002925653-ed18f55d7292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc2NhcGUlMjByb29tJTIwbXlzdGVyeXxlbnwxfHx8fDE3NjEwMzQ4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function EscapeRoomsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof upcomingEvents[0] | null>(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  const handleLearnMore = (event: typeof upcomingEvents[0]) => {
    setSelectedEvent(event);
    setInfoDialogOpen(true);
  };

  const handleRegister = (event: typeof upcomingEvents[0]) => {
    setSelectedEvent(event);
    setRegisterDialogOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Nieuwe Evenementen Toegevoegd
            </Badge>
            <h2 className="text-white mb-4">
              Literaire Escape Room Avonturen
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Dompel jezelf onder in spannende mysteries geïnspireerd door klassieke en hedendaagse literatuur. 
              Lees het boek, beheers het verhaal en ontgrendel de geheimen binnen onze escape rooms.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Bekijk Alle Evenementen
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-yellow-500/90 text-white border-yellow-600 hover:bg-yellow-600 hover:border-yellow-700"
                onClick={() => setLeaderboardOpen(true)}
              >
                <Trophy className="w-5 h-5 mr-2" />
                Bekijk Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Zoek op boektitel of auteur..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filteren
            </Button>
          </div>
        </div>
      </section>

      {/* Events List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-slate-900 mb-2">Aankomende Evenementen</h2>
          <p className="text-slate-600">
            Reserveer je plek en zorg ervoor dat je het vereiste boek hebt uitgelezen voor het evenement!
          </p>
        </div>

        <div className="space-y-6">
          {upcomingEvents.map((event, index) => (
            <EventCard 
              key={index} 
              {...event} 
              onLearnMore={() => handleLearnMore(event)}
              onRegister={() => handleRegister(event)}
            />
          ))}
        </div>

        {/* Event Info Dialog */}
        <EventInfoDialog
          open={infoDialogOpen}
          onOpenChange={setInfoDialogOpen}
          event={selectedEvent}
          onRegister={() => {
            setInfoDialogOpen(false);
            setRegisterDialogOpen(true);
          }}
        />

        {/* Register Dialog */}
        <RegisterDialog
          open={registerDialogOpen}
          onOpenChange={setRegisterDialogOpen}
          event={selectedEvent}
        />

        {/* Leaderboard Dialog */}
        <EscapeRoomsLeaderboard
          open={leaderboardOpen}
          onOpenChange={setLeaderboardOpen}
        />

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-blue-900 mb-3">Hoe Het Werkt</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">
                1
              </div>
              <p className="text-blue-900 mb-1">Lees het Boek</p>
              <p className="text-sm text-blue-700">
                Voltooi de verplichte lectuur voor de datum van het evenement. Kennis van het boek is essentieel voor het oplossen van puzzels.
              </p>
            </div>
            <div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">
                2
              </div>
              <p className="text-blue-900 mb-1">Registreer & Bereid Voor</p>
              <p className="text-sm text-blue-700">
                Verzeker je plek vroeg want de plaatsen zijn beperkt. Verzamel je team van medelezers.
              </p>
            </div>
            <div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">
                3
              </div>
              <p className="text-blue-900 mb-1">Los het Mysterie Op</p>
              <p className="text-sm text-blue-700">
                Gebruik je literaire kennis om aanwijzingen te ontcijferen, puzzels op te lossen en te ontsnappen binnen de tijdslimiet.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
