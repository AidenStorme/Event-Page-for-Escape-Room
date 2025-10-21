import { useState } from "react";
import { EventCard } from "./EventCard";
import { EventInfoDialog } from "./EventInfoDialog";
import { RegisterDialog } from "./RegisterDialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "./ui/input";

const upcomingEvents = [
  {
    title: "Murder at the Manor: A Gothic Mystery",
    bookTitle: "The Silent Patient",
    bookAuthor: "Alex Michaelides",
    date: "November 2, 2025",
    time: "6:00 PM - 8:30 PM",
    spotsLeft: 2,
    totalSpots: 8,
    difficulty: "Advanced" as const,
    description: "Unravel the secrets of Thornfield Manor where a crime has shaken its foundations. Use your knowledge from The Silent Patient to decode psychological clues and unmask the killer.",
    imageUrl: "https://images.unsplash.com/photo-1569002925653-ed18f55d7292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc2NhcGUlMjByb29tJTIwbXlzdGVyeXxlbnwxfHx8fDE3NjEwMzQ4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "The Curious Case of the Missing Manuscript",
    bookTitle: "The Adventures of Sherlock Holmes",
    bookAuthor: "Arthur Conan Doyle",
    date: "November 9, 2025",
    time: "3:00 PM - 5:30 PM",
    spotsLeft: 6,
    totalSpots: 10,
    difficulty: "Intermediate" as const,
    description: "Step into Victorian London and solve a literary mystery worthy of Baker Street. Apply Holmes' deductive reasoning methods to recover a priceless stolen manuscript.",
    imageUrl: "https://images.unsplash.com/photo-1650178284536-2d6dff47f903?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXRlY3RpdmUlMjBib29rJTIwdmludGFnZXxlbnwxfHx8fDE3NjEwMzQ4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "The Enchanted Library Heist",
    bookTitle: "The Night Circus",
    bookAuthor: "Erin Morgenstern",
    date: "November 16, 2025",
    time: "7:00 PM - 9:00 PM",
    spotsLeft: 8,
    totalSpots: 12,
    difficulty: "Beginner" as const,
    description: "Navigate through magical puzzles and illusory challenges inspired by The Night Circus. Perfect for first-time escape room adventurers with a love for whimsical mysteries.",
    imageUrl: "https://images.unsplash.com/photo-1658792953327-e3c9e7223e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBteXN0ZXJ5fGVufDF8fHx8MTc2MTAzNDg2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    title: "The Poisoned Pen Society",
    bookTitle: "And Then There Were None",
    bookAuthor: "Agatha Christie",
    date: "November 23, 2025",
    time: "5:30 PM - 8:00 PM",
    spotsLeft: 1,
    totalSpots: 8,
    difficulty: "Advanced" as const,
    description: "Join an exclusive literary society's gathering that turns deadly. Channel your inner Agatha Christie to identify the killer among a cast of suspicious characters.",
    imageUrl: "https://images.unsplash.com/photo-1569002925653-ed18f55d7292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc2NhcGUlMjByb29tJTIwbXlzdGVyeXxlbnwxfHx8fDE3NjEwMzQ4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function EscapeRoomsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof upcomingEvents[0] | null>(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

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
              New Events Added
            </Badge>
            <h2 className="text-white mb-4">
              Literary Escape Room Adventures
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Immerse yourself in thrilling mysteries inspired by classic and contemporary literature. 
              Read the book, master the story, and unlock the secrets within our escape rooms.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Browse All Events
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                How It Works
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
                placeholder="Search by book title or author..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Events List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-slate-900 mb-2">Upcoming Events</h2>
          <p className="text-slate-600">
            Reserve your spot and make sure to finish reading the required book before the event!
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

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-blue-900 mb-3">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">
                1
              </div>
              <p className="text-blue-900 mb-1">Read the Book</p>
              <p className="text-sm text-blue-700">
                Complete the required reading before the event date. Knowledge from the book is essential to solving puzzles.
              </p>
            </div>
            <div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">
                2
              </div>
              <p className="text-blue-900 mb-1">Register & Prepare</p>
              <p className="text-sm text-blue-700">
                Secure your spot early as spaces are limited. Gather your team of fellow readers.
              </p>
            </div>
            <div>
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">
                3
              </div>
              <p className="text-blue-900 mb-1">Solve the Mystery</p>
              <p className="text-sm text-blue-700">
                Use your literary knowledge to decode clues, solve puzzles, and escape within the time limit.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
