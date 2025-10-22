import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Trophy, Clock, Users } from "lucide-react";

// Example data. Replace with real data source or props as needed.
const leaderboardData = [
  {
    teamName: "The Puzzlers",
    members: ["Alice", "Bob", "Charlie"],
    time: "45:32",
    room: "Moord in het Landhuis",
  },
  {
    teamName: "Escape Artists",
    members: ["Dana", "Eli", "Fay"],
    time: "47:10",
    room: "Moord in het Landhuis",
  },
  {
    teamName: "Key Masters",
    members: ["Gina", "Hank", "Ivy"],
    time: "49:05",
    room: "De Merkwaardige Zaak",
  },
  {
    teamName: "Lock Busters",
    members: ["Jack", "Kara", "Liam"],
    time: "52:20",
    room: "De Betoverde Bibliotheek",
  },
  {
    teamName: "Mystery Solvers",
    members: ["Maya", "Nick", "Olivia"],
    time: "54:15",
    room: "De Vergiftigde Pen",
  },
];

const medalRanks = [
  { label: "Gold", icon: "🥇", gradient: "from-yellow-400 to-yellow-600", border: "border-yellow-500", points: 100 },
  { label: "Silver", icon: "🥈", gradient: "from-gray-300 to-gray-500", border: "border-gray-400", points: 75 },
  { label: "Bronze", icon: "🥉", gradient: "from-orange-400 to-amber-600", border: "border-amber-600", points: 50 },
];

interface EscapeRoomsLeaderboardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EscapeRoomsLeaderboard({ open, onOpenChange }: EscapeRoomsLeaderboardProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-3xl">Escape Room Leaderboard</DialogTitle>
          </div>
          <DialogDescription>
            Top teams die onze literaire mysteries hebben ontcijferd
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-6">
          {leaderboardData.map((team, idx) => {
            const isTopThree = idx < 3;
            const rankInfo = isTopThree ? medalRanks[idx] : null;
            
            // Define border color classes explicitly
            let borderClass = "border-slate-300 hover:border-blue-400";
            if (idx === 0) borderClass = "border-yellow-500";
            else if (idx === 1) borderClass = "border-gray-400";
            else if (idx === 2) borderClass = "border-amber-600";
            
            return (
              <div
                key={team.teamName}
                className={`p-5 rounded-lg border-2 bg-white transition-all duration-200 hover:shadow-xl hover:scale-[1.02] ${borderClass}`}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Rank Badge */}
                  <div className="flex-shrink-0">
                    {isTopThree ? (
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${rankInfo?.gradient} flex flex-col items-center justify-center shadow-md`}>
                        <span className="text-2xl">{rankInfo?.icon}</span>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-2xl font-bold text-slate-600">#{idx + 1}</span>
                      </div>
                    )}
                  </div>

                  {/* Team Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-slate-900 truncate">{team.teamName}</h3>
                      {isTopThree && (
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/80 text-slate-700">
                          {rankInfo?.label}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="truncate">{team.members.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-slate-500 italic">
                        {team.room}
                      </div>
                      {isTopThree && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-100 text-green-700">
                          +{rankInfo?.points} punten
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Time Badge */}
                  <div className="flex-shrink-0 text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-50">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-xl font-mono font-bold text-slate-900">{team.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>🏆 Pro Tip:</strong> Teams die het boek volledig hebben gelezen presteren 40% beter! 
            Zorg dat je voorbereid bent voor je volgende escape room avontuur.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
