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
      if (raw == null) {
        // Set a hardcoded default points value on first load
        const defaultPoints = 1500; // hardcoded "random" amount
        window.localStorage.setItem("library_points", String(defaultPoints));
        setPoints(defaultPoints);
        // notify any listeners in-tab
        window.dispatchEvent(new CustomEvent("points:update", { detail: defaultPoints }));
      } else {
        const initial = Number(raw);
        const valid = Number.isFinite(initial) ? initial : 0;
        // Ensure the user has at least 1500 points as requested
        if (valid < 1500) {
          window.localStorage.setItem("library_points", String(1500));
          setPoints(1500);
          window.dispatchEvent(new CustomEvent("points:update", { detail: 1500 }));
        } else {
          setPoints(valid);
        }
      }

      // Listen for cross-tab updates
      const onStorage = (e: StorageEvent) => {
        if (e.key === "library_points") {
          const next = e.newValue ? Number(e.newValue) : 0;
          setPoints(Number.isFinite(next) ? next : 0);
        }
      };
      // Listen for same-tab updates via a custom event
      const onPointsUpdate = (e: Event) => {
        const custom = e as CustomEvent<number>;
        const next = typeof custom.detail === "number" ? custom.detail : Number(window.localStorage.getItem("library_points") || 0);
        setPoints(Number.isFinite(next) ? next : 0);
      };
      window.addEventListener("storage", onStorage);
      window.addEventListener("points:update", onPointsUpdate as EventListener);
      return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener("points:update", onPointsUpdate as EventListener);
      };
    }
  }, []);

  return (
    <Badge
      className={
        "rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 border-yellow-400 ring-1 ring-yellow-500/30 shadow-md h-9 px-4 text-sm flex items-center gap-2 transition-transform hover:scale-[1.02] " +
        className
      }
      title={`${points} punten verdiend`}
    >
  <Coins className="w-4 h-4 text-amber-600" />
      <span className="tabular-nums" aria-live="polite" aria-atomic="true">{points}</span>
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
  window.dispatchEvent(new CustomEvent("points:update", { detail: next }));
}

export function setPoints(value: number) {
  if (typeof window === "undefined") return;
  const next = Math.max(0, Math.floor(value));
  window.localStorage.setItem("library_points", String(next));
  window.dispatchEvent(new CustomEvent("points:update", { detail: next }));
}

export function setRandomPoints(min = 0, max = 250) {
  if (typeof window === "undefined") return;
  const a = Math.floor(min);
  const b = Math.floor(max);
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const val = Math.floor(Math.random() * (hi - lo + 1)) + lo;
  setPoints(val);
}
