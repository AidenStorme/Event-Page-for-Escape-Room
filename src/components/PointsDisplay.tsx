import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Coins } from "lucide-react";

/**
 * PointsDisplay
 * Shows the user's current points total. Points are read from localStorage under the key "library_points".
 * If no points are stored yet, it defaults to 0. Updates live if the value changes in another tab.
 */
export function PointsDisplay({ className = "" }: { className?: string }) {
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    // Read initial value from localStorage if available
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem("library_points");
      const initial = raw ? Number(raw) : 0;
      setPoints(Number.isFinite(initial) ? initial : 0);

      // Listen for cross-tab updates
      const onStorage = (e: StorageEvent) => {
        if (e.key === "library_points") {
          const next = e.newValue ? Number(e.newValue) : 0;
          setPoints(Number.isFinite(next) ? next : 0);
        }
      };
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
  }, []);

  return (
    <Badge
      className={
        "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 border-yellow-400 shadow-sm h-9 px-4 text-sm flex items-center gap-1 " +
        className
      }
      title={`${points} punten verdiend`}
    >
      <Coins className="w-4 h-4" />
      <span className="tabular-nums">{points}</span>
      <span className="hidden sm:inline">punten</span>
    </Badge>
  );
}

/** Small helper to mutate points in localStorage safely */
export function addPoints(amount: number) {
  if (typeof window === "undefined") return;
  const current = Number(window.localStorage.getItem("library_points") || 0);
  const next = Math.max(0, (Number.isFinite(current) ? current : 0) + amount);
  window.localStorage.setItem("library_points", String(next));
}
