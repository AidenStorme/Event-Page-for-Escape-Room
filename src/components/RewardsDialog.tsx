import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Gift, CheckCircle2, Lock, Coins } from "lucide-react";
import { addPoints } from "./PointsDisplay";
import { AspectRatio } from "./ui/aspect-ratio";

type RewardsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Reward = {
  id: string;
  title: string;
  description: string;
  cost: number;
  imageUrl: string;
};

const rewards: Reward[] = [
  {
    id: "gift-10",
    title: "€10 Cadeaubon",
    description: "Te gebruiken bij deelnemende winkels.",
    cost: 100,
    imageUrl:
      "https://www.brandsonly.be/cdn/shop/products/cadeaubon-1543850919177_700x.jpg?v=1671876314",
  },
  {
    id: "extend-loan",
    title: "Gratis Leenverlenging",
    description: "Verleng je boeklening één keer gratis.",
    cost: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  {
    id: "merch-pack",
    title: "Bibliotheek Merch Pack",
    description: "Sticker + boekenlegger + tote bag.",
    cost: 150,
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  },
  {
    id: "gift-25",
    title: "€25 Cadeaubon",
    description: "Voor grotere boekenaankopen of cadeaus.",
    cost: 250,
    imageUrl:
      "https://www.brandsonly.be/cdn/shop/products/cadeaubon-1543850919177_700x.jpg?v=1671876314",
  },
];

export default function RewardsDialog({ open, onOpenChange }: RewardsDialogProps) {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const read = () => {
      const raw = window.localStorage.getItem("library_points");
      const val = raw ? Number(raw) : 0;
      setPoints(Number.isFinite(val) ? val : 0);
    };
    read();
    const onUpdate = (e: Event) => {
      const ce = e as CustomEvent<number>;
      if (typeof ce.detail === "number") setPoints(ce.detail);
      else read();
    };
    window.addEventListener("points:update", onUpdate as EventListener);
    return () => window.removeEventListener("points:update", onUpdate as EventListener);
  }, []);

  const handleClaim = (reward: Reward) => {
    if (points < reward.cost) return;
    // Deduct immediately and confirm to user
    addPoints(-reward.cost);
    alert(`Geclaimd: ${reward.title} (−${reward.cost} punten)\nVeel plezier!`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Beloningen</DialogTitle>
          <DialogDescription>
            Wissel je punten in voor cadeaus en voordelen
          </DialogDescription>
        </DialogHeader>

        {/* Current points */}
        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg p-4 mb-2">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-slate-700" />
            <span className="text-slate-800 font-medium">Jouw punten</span>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 border-yellow-400 h-8 px-3">
            {points} punten
          </Badge>
        </div>

        {/* Rewards grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {rewards.map((r) => {
            const canClaim = points >= r.cost;
            return (
              <div
                key={r.id}
                className="group rounded-xl border border-slate-200 overflow-hidden bg-white flex flex-col h-full shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="relative overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={r.imageUrl}
                      alt={r.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </AspectRatio>
                </div>
                <div className="p-4 flex-1">
                  <p className="text-slate-900 font-semibold text-lg leading-snug">{r.title}</p>
                  <p className="text-slate-600 text-sm mt-1">{r.description}</p>
                </div>
                <div className="border-t border-slate-100" />
                <div className="p-4 pt-3 bg-slate-50 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 rounded-b-xl">
                  <Badge
                    variant="outline"
                    className="bg-white/80 backdrop-blur border-slate-300 text-slate-800 h-9 px-4 text-sm flex items-center gap-2 rounded-full w-full sm:w-auto max-w-full justify-center shadow-sm"
                  >
                    <Coins className="w-4 h-4 text-amber-600" />
                    {r.cost} punten
                  </Badge>
                  <Button
                    onClick={() => handleClaim(r)}
                    disabled={!canClaim}
                    className={(canClaim ? "" : "opacity-80 ") + "w-full sm:w-auto max-w-full shadow-sm rounded-full px-6 transition-shadow hover:shadow-md"}
                  >
                    {canClaim ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Claim
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        {r.cost - points} te kort
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
