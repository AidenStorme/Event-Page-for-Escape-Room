import { useState } from "react";
import { PrinterCard } from "./PrinterCard";
import { PrinterBookingDialog } from "./PrinterBookingDialog";
import { PrinterDetailDialog, Printer } from "./PrinterDetailPage";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, Filter, Printer as PrinterIcon } from "lucide-react";
import { Input } from "./ui/input";

const printers: Printer[] = [
  {
    name: "Prusa i3 MK3S+",
    model: "Original Prusa i3 MK3S+",
    buildVolume: "250 × 210 × 210 mm",
    layerResolution: "0.05 - 0.35 mm",
    materials: ["PLA", "PETG", "ASA", "ABS", "TPU"],
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1544704784-59bcc978c9c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZXIlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTAzNjMzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Reliable workhorse perfect for beginners and advanced users. Great for detailed prints with excellent layer adhesion.",
    filaments: [
        { name: "PLA", status: "good" },
        { name: "PETG", status: "low" },
        { name: "ABS", status: "good" },
        { name: "TPU", status: "empty" },
    ],
  },
  {
    name: "Creality Ender 3 V2",
    model: "Creality Ender 3 V2",
    buildVolume: "220 × 220 × 250 mm",
    layerResolution: "0.1 - 0.4 mm",
    materials: ["PLA", "ABS", "PETG", "TPU"],
    available: true,
    imageUrl: "https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjAzZCUyMHByaW50aW5nfGVufDF8fHx8MTc2MTAzNjMzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Popular entry-level printer with excellent community support. Ideal for learning 3D printing basics and small to medium projects.",
    filaments: [
        { name: "PLA", status: "good" },
        { name: "PETG", status: "good" },
        { name: "ABS", status: "low" },
        { name: "TPU", status: "good" },
    ],
  },
  {
    name: "Anycubic Photon Mono X",
    model: "Anycubic Photon Mono X (Resin)",
    buildVolume: "192 × 120 × 245 mm",
    layerResolution: "0.01 - 0.15 mm",
    materials: ["Standard Resin", "ABS-like Resin", "Flexible Resin"],
    available: false,
    imageUrl: "https://images.unsplash.com/photo-1703221561813-cdaa308cf9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZWQlMjBvYmplY3R8ZW58MXx8fHwxNzYxMDM2MzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Resin printer for ultra-detailed miniatures and precision parts. Produces incredibly smooth surfaces with fine details.",
    filaments: [
        { name: "Standard Resin", status: "low" },
        { name: "ABS-like Resin", status: "empty" },
        { name: "Flexible Resin", status: "good" },
    ],
  },
];

export function PrintersPage() {
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleBookNow = (printer: Printer) => {
    setSelectedPrinter(printer);
    setBookingDialogOpen(true);
  };

  const handleViewDetails = (printer: Printer) => {
    setSelectedPrinter(printer);
    setDetailDialogOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Maker Space
            </Badge>
            <h2 className="text-white mb-4">
              3D Printer Lab
            </h2>
            <p className="text-purple-100 text-lg mb-6">
              Turn your ideas into reality with our state-of-the-art 3D printers. 
              From prototypes to finished products, we provide the tools and support you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                Book a Printer
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                View Guidelines
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
                placeholder="Search by printer name or material..."
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

      {/* Printers List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-slate-900 mb-2">Available Printers</h2>
          <p className="text-slate-600">
            Reserve a time slot and bring your 3D model file to start printing!
          </p>
        </div>

        <div className="space-y-6">
          {printers.map((printer, index) => (
            <PrinterCard 
              key={index} 
              {...printer} 
              onBookNow={() => handleBookNow(printer)}
              onViewDetails={() => handleViewDetails(printer)}
            />
          ))}
        </div>

        {/* Printer Detail Dialog */}
        <PrinterDetailDialog
          open={detailDialogOpen}
          onOpenChange={setDetailDialogOpen}
          printer={selectedPrinter}
          onBook={() => {
            setDetailDialogOpen(false);
            setBookingDialogOpen(true);
          }}
        />

        {/* Printer Booking Dialog */}
        <PrinterBookingDialog
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
          printer={selectedPrinter}
        />

        {/* Info Sections */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {/* Pricing Info */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-purple-900 mb-4">Prijzen</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-purple-900">1-2 uur</p>
                  <p className="text-sm text-purple-700">Kleine projecten</p>
                </div>
                <p className="text-purple-900">€5</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-purple-900">3-4 uur</p>
                  <p className="text-sm text-purple-700">Middelgrote projecten</p>
                </div>
                <p className="text-purple-900">€8</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-purple-900">5+ uur</p>
                  <p className="text-sm text-purple-700">Grote projecten</p>
                </div>
                <p className="text-purple-900">€12</p>
              </div>
              <p className="text-sm text-purple-700 pt-3 border-t border-purple-200">
                * Materiaalkosten worden apart berekend op basis van gewicht
              </p>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-blue-900 mb-4">Belangrijke Richtlijnen</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start gap-2">
                <PrinterIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm">Breng je 3D-bestand mee in .STL of .OBJ formaat</span>
              </li>
              <li className="flex items-start gap-2">
                <PrinterIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm">Kom 15 minuten voor je tijdslot voor een korte instructie</span>
              </li>
              <li className="flex items-start gap-2">
                <PrinterIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm">Onze medewerkers helpen je graag met de eerste opzet</span>
              </li>
              <li className="flex items-start gap-2">
                <PrinterIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                <span className="text-sm">We bieden gratis workshops voor beginners elke maand</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-lg p-6">
          <h3 className="text-slate-900 mb-3">Hoe het werkt</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">
                1
              </div>
              <p className="text-slate-900 mb-1">Ontwerp of download</p>
              <p className="text-sm text-slate-700">
                Maak je eigen 3D-model of download er een van populaire websites.
              </p>
            </div>
            <div>
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">
                2
              </div>
              <p className="text-slate-900 mb-1">Reserveer een tijdslot</p>
              <p className="text-sm text-slate-700">
                Kies een beschikbare printer en boek je gewenste tijd.
              </p>
            </div>
            <div>
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">
                3
              </div>
              <p className="text-slate-900 mb-1">Print je ontwerp</p>
              <p className="text-sm text-slate-700">
                Kom naar de bibliotheek en start je printjob met hulp van ons team.
              </p>
            </div>
            <div>
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">
                4
              </div>
              <p className="text-slate-900 mb-1">Haal je print op</p>
              <p className="text-sm text-slate-700">
                Wacht terwijl je print wordt gemaakt of kom later terug om het op te halen.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
