import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Printer, Ruler, Layers, CheckCircle2, ChevronRight } from "lucide-react";

export type FilamentStatus = "good" | "low" | "empty";

export interface FilamentColor {
  name: string;
  hex: string;
  status: FilamentStatus;
}

export interface Filament {
  name: string;
  colors: FilamentColor[];
}

export interface Printer {
  name: string;
  model: string;
  buildVolume: string;
  layerResolution: string;
  materials: string[];
  available: boolean;
  imageUrl: string;
  description: string;
  filaments?: Filament[];
}

interface PrinterDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  printer: Printer | null;
  onBook?: () => void;
}

const filamentStatusColors: { [key in FilamentStatus]: string } = {
  good: "bg-green-100 text-green-800 border-green-300",
  low: "bg-yellow-100 text-yellow-800 border-yellow-300",
  empty: "bg-red-100 text-red-800 border-red-300",
};

export function PrinterDetailDialog({
  open,
  onOpenChange,
  printer,
  onBook,
}: PrinterDetailDialogProps) {
  if (!printer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{printer.name}</DialogTitle>
          <DialogDescription>
            Complete printer specifications and filament availability
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Printer Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={printer.imageUrl}
              alt={printer.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className={printer.available ? "bg-green-100 text-green-800 border-green-300 border" : "bg-red-100 text-red-800 border-red-300 border"}>
                {printer.available ? "Available" : "In Use"}
              </Badge>
            </div>
          </div>

          {/* Printer Model */}
          <div>
            <p className="text-slate-600 text-sm mb-1">Model</p>
            <p className="text-slate-900 font-medium">{printer.model}</p>
          </div>

          {/* Description */}
          <div>
            <p className="text-slate-700">{printer.description}</p>
          </div>

          <Separator />

          {/* Specifications */}
          <div>
            <h3 className="text-slate-900 font-semibold mb-4">Specifications</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Ruler className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-500 text-sm">Build Volume</p>
                  <p className="text-slate-900 font-medium">{printer.buildVolume}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Layers className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-500 text-sm">Layer Resolution</p>
                  <p className="text-slate-900 font-medium">{printer.layerResolution}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Available Filaments & Colors (Only for 3D Printers) */}
          {printer.filaments && printer.filaments.length > 0 && (
            <>
              <div>
                <h3 className="text-slate-900 font-semibold mb-4">Available Filaments & Colors</h3>
                <p className="text-slate-600 text-sm mb-4">
                  The following filament types and colors are available for this printer. You can select your preference when booking.
                </p>
                <div className="space-y-4">
                  {printer.filaments.map((filament) => (
                    <div key={filament.name} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <h4 className="font-medium text-slate-900 mb-3">{filament.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {filament.colors.map((color) => (
                          <div
                            key={color.name}
                            className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200"
                          >
                            <div 
                              className="w-6 h-6 rounded-full border-2 border-slate-300 shadow-sm"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="text-sm font-medium text-slate-900">{color.name}</span>
                            <Badge className={`${filamentStatusColors[color.status]} border text-xs`}>
                              {color.status === "good" && "✓"}
                              {color.status === "low" && "⚠"}
                              {color.status === "empty" && "✗"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Supported Materials */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-purple-900 font-medium mb-2">Supported Materials</p>
            <div className="flex flex-wrap gap-2">
              {printer.materials.map((material, index) => (
                <Badge key={index} variant="outline" className="border-purple-300 text-purple-700">
                  {material}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
