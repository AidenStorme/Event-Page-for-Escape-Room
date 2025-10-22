import { useState } from "react";
import { PrinterCard } from "./PrinterCard";
import { PrinterBookingDialog } from "./PrinterBookingDialog";
import { PrinterDetailDialog } from "./PrinterDetailPage";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, Filter, Printer as PrinterIcon } from "lucide-react";
import { Input } from "./ui/input";

const printers = [
  {
    name: "HP LaserJet Pro M404dn",
    model: "HP LaserJet Pro M404dn",
    buildVolume: "N/A",
    layerResolution: "Tot 4800 x 600 verbeterde dpi",
    materials: ["Papier", "Enveloppen", "Labels"],
    available: true,
    imageUrl: "https://www.serversdirect.co.uk/Images/W1A53A_1_supersize.jpg?v=2",
    description: "Een betrouwbare monochrome laserprinter voor snel, hoogwaardig printen. Ideaal voor kantoor documenten.",
  },
  {
    name: "Epson EcoTank ET-2760",
    model: "Epson EcoTank ET-2760",
    buildVolume: "N/A",
    layerResolution: "5760 x 1440 geoptimaliseerde dpi",
    materials: ["Papier", "Fotopapier"],
    available: true,
    imageUrl: "https://crdms.images.consumerreports.org/prod/products/cr/models/400022-all-in-one-inkjet-printers-epson-ecotank-et-2760-10010174.png",
    description: "Een veelzijdige all-in-one printer met een inktreservoir van hoge capaciteit, perfect voor kleurenafdrukken en scannen.",
  },
  {
    name: "Brother HL-L2395DW",
    model: "Brother HL-L2395DW",
    buildVolume: "N/A",
    layerResolution: "2400 x 600 dpi",
    materials: ["Papier", "Karton", "Enveloppen"],
    available: false,
    imageUrl: "https://crdms.images.consumerreports.org/prod/products/cr/models/396001-regular-printers-brother-hl-l2395dw-10000169.png",
    description: "Een compacte monochrome laserprinter met draadloze connectiviteit en een flatbed scanner voor kopiëren en scannen.",
  },
];

export function NormalPrintersPage() {
  const [selectedPrinter, setSelectedPrinter] = useState<typeof printers[0] | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleBookNow = (printer: typeof printers[0]) => {
    setSelectedPrinter(printer);
    setBookingDialogOpen(true);
  };

  const handleViewDetails = (printer: typeof printers[0]) => {
    setSelectedPrinter(printer);
    setDetailDialogOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Kantoor Middelen
            </Badge>
            <h2 className="text-white mb-4">
              Document Printers
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Hoogwaardige printers voor al je documentbehoeften. Snel, betrouwbaar en gebruiksvriendelijk.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Boek een Printer
              </Button>
              <Button size="lg" variant="outline" className="bg-white/20 text-white border-white hover:bg-white/30">
                Bekijk Richtlijnen
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
                placeholder="Zoek op printernaam of type..."
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

      {/* Printers List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-slate-900 mb-2">Beschikbare Printers</h2>
          <p className="text-slate-600">
            Reserveer een tijdslot voor hoogwaardige documentprintwerk!
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
        />

        {/* Printer Booking Dialog */}
        <PrinterBookingDialog
          open={bookingDialogOpen}
          onOpenChange={setBookingDialogOpen}
          printer={selectedPrinter}
        />
      </main>
    </>
  );
}
