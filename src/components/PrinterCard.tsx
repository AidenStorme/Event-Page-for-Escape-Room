import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Printer, Ruler, Clock, Layers, CheckCircle } from "lucide-react";

interface PrinterCardProps {
  name: string;
  model: string;
  buildVolume: string;
  layerResolution: string;
  materials: string[];
  available: boolean;
  imageUrl: string;
  description: string;
  onBookNow?: () => void;
  onViewDetails?: () => void;
}

export function PrinterCard({
  name,
  model,
  buildVolume,
  layerResolution,
  materials,
  available,
  imageUrl,
  description,
  onBookNow,
  onViewDetails,
}: PrinterCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="grid md:grid-cols-[300px_1fr] gap-0">
        {/* Image Section */}
        <div className="relative h-64 md:h-auto bg-slate-100">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className={available ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300"}>
              {available ? "Available" : "In Use"}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col">
          <div className="flex-1">
            <h3 className="mb-1">{name}</h3>
            <p className="text-sm text-slate-600 mb-4">{model}</p>
            
            <p className="text-slate-600 mb-4">{description}</p>

            {/* Specifications */}
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-start gap-2 text-slate-700">
                <Ruler className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Build Volume</p>
                  <p className="text-sm">{buildVolume}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <Layers className="w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Layer Resolution</p>
                  <p className="text-sm">{layerResolution}</p>
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="mb-4">
              <p className="text-sm text-slate-700 mb-2">Supported Materials:</p>
              <div className="flex flex-wrap gap-2">
                {materials.map((material, index) => (
                  <Badge key={index} variant="outline">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              className="flex-1" 
              disabled={!available}
              onClick={onBookNow}
            >
              <Printer className="w-4 h-4 mr-2" />
              {available ? "Book Time Slot" : "Currently Unavailable"}
            </Button>
            <Button variant="outline" onClick={onViewDetails}>View Details</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
