import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";
import { Calendar as CalendarIcon, Clock, Euro, Mail, Phone, User, AlertCircle, FileText, CheckCircle2, Upload } from "lucide-react";
import { format } from "date-fns";
import { Printer, Filament, FilamentColor, FilamentStatus } from "./PrinterDetailPage";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface PrinterBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  printer: Printer | null;
}

const filamentStatusColors: { [key in FilamentStatus]: string } = {
  good: "bg-green-100 text-green-800 border-green-300",
  low: "bg-yellow-100 text-yellow-800 border-yellow-300",
  empty: "bg-red-100 text-red-800 border-red-300",
};

const timeSlots = [
  "09:00 - 11:00",
  "11:00 - 13:00",
  "13:00 - 15:00",
  "15:00 - 17:00",
  "17:00 - 19:00",
];

export function PrinterBookingDialog({
  open,
  onOpenChange,
  printer,
}: PrinterBookingDialogProps) {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedFilamentType, setSelectedFilamentType] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [uploadOption, setUploadOption] = useState("later");
  const [file, setFile] = useState<File | null>(null);

  if (!printer) return null;

  const selectedFilament = printer.filaments?.find(f => f.name === selectedFilamentType);
  const availableColors = selectedFilament?.colors.filter(c => c.status !== "empty") || [];
  const is3DPrinter = printer.filaments && printer.filaments.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filamentInfo = is3DPrinter ? `\nFilament: ${selectedFilamentType} - ${selectedColor}` : '';
    alert(`Booking goedgekeurd!\n\nPrinter: ${printer.name}\nDate: ${date ? format(date, 'PPP') : ''}\nTime: ${timeSlot}${filamentInfo}\n\nContact: ${firstName} ${lastName}\nEmail: ${email}`);
    
    // Reset form
    setDate(undefined);
    setTimeSlot("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setProjectDescription("");
    setSelectedFilamentType("");
    setSelectedColor("");
    setUploadOption("later");
    setFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book {is3DPrinter ? '3D Printer' : 'Printer'}</DialogTitle>
          <DialogDescription>
            Reserve a time slot for {printer.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Printer Details Summary */}
          <div className="p-4 bg-slate-50 rounded-lg space-y-2">
            <h3 className="text-slate-900">{printer.name}</h3>
            <p className="text-sm text-slate-600">{printer.model}</p>
          </div>

          <Separator />

          {/* Date and Time Selection */}
          <div>
            <h3 className="mb-4">Datum en tijd</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  <CalendarIcon className="w-4 h-4 inline mr-2" />
                  Datum
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      {date ? format(date, 'PPP') : "Selecteer datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date: Date) => 
                        date < new Date() || date < new Date("2025-10-21")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeSlot">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Tijdslot
                </Label>
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger id="timeSlot">
                    <SelectValue placeholder="Selecteer tijdslot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* File Upload Section */}
          <div>
            <h3 className="mb-4">Hoe wil je {is3DPrinter ? 'printen' : 'printen'}?</h3>
            <p className="text-sm text-slate-600 mb-4">
              {is3DPrinter 
                ? 'Kies of je het 3D-bestand nu wilt uploaden of dat je het mee wilt nemen om ter plaatse te printen.'
                : 'Kies of je het document nu wilt uploaden voor latere afhaling, of dat je het bestand mee wilt nemen om ter plaatse te printen.'}
            </p>
            
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => setUploadOption("later")}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  uploadOption === "later"
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    uploadOption === "later" ? "border-blue-500" : "border-slate-300"
                  }`}>
                    {uploadOption === "later" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-slate-900">{is3DPrinter ? 'Bestand meenemen' : 'Print on-site'}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {is3DPrinter 
                        ? 'Neem je 3D-bestand mee op een USB-stick en print direct ter plaatse tijdens je tijdslot.'
                        : 'Neem je bestand mee op een USB-stick en print direct ter plaatse tijdens je tijdslot.'}
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUploadOption("now")}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  uploadOption === "now"
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    uploadOption === "now" ? "border-blue-500" : "border-slate-300"
                  }`}>
                    {uploadOption === "now" && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-slate-900">{is3DPrinter ? 'Upload nu' : 'Upload & Pick Up'}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {is3DPrinter
                        ? 'Upload je 3D-bestand nu en we zorgen dat het klaar is tijdens je tijdslot.'
                        : 'Upload je document nu en haal het op het gekozen tijdstip op - klaar om mee te nemen!'}
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {uploadOption === 'now' && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Label htmlFor="file-upload" className="text-sm font-semibold text-slate-900 mb-3 block">
                  Upload je {is3DPrinter ? '3D-bestand' : 'document'}
                </Label>
                <div className="space-y-3">
                  <div className="relative">
                    <Input 
                      id="file-upload" 
                      type="file" 
                      onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                      accept={is3DPrinter ? ".stl,.obj,.3mf,.gcode" : ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"}
                    />
                  </div>
                  {file && (
                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-200">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-slate-500">
                    {is3DPrinter 
                      ? 'Ondersteunde formaten: STL, OBJ, 3MF, GCODE (Max 50MB)'
                      : 'Ondersteunde formaten: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Filament Selection (Only for 3D Printers) */}
          {is3DPrinter && (
            <>
              <div>
                <h3 className="mb-4">Filament selectie</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="filamentType">
                      Filament type *
                    </Label>
                    <Select value={selectedFilamentType} onValueChange={(value: string) => {
                      setSelectedFilamentType(value);
                      setSelectedColor("");
                    }}>
                      <SelectTrigger id="filamentType">
                        <SelectValue placeholder="Selecteer filament type" />
                      </SelectTrigger>
                      <SelectContent>
                        {printer.filaments!.map((filament) => {
                          const availableCount = filament.colors.filter(c => c.status !== "empty").length;
                          return (
                            <SelectItem key={filament.name} value={filament.name} disabled={availableCount === 0}>
                              {filament.name} ({availableCount} kleuren beschikbaar)
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

              {selectedFilamentType && (
                <div className="space-y-2">
                  <Label>Kleur *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableColors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedColor === color.name
                            ? "border-purple-500 bg-purple-50"
                            : "border-slate-200 bg-white hover:border-purple-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-slate-300 shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="flex-1 text-left">
                            <span className="text-sm font-medium text-slate-900">{color.name}</span>
                            <Badge className={`${filamentStatusColors[color.status]} border text-xs ml-2`}>
                              {color.status === "good" ? "✓" : "⚠"}
                            </Badge>
                          </div>
                          {selectedColor === color.name && (
                            <CheckCircle2 className="w-4 h-4 text-purple-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />
          </>
          )}

          {/* Project Details */}
          <div>
            <h3 className="mb-4">{is3DPrinter ? 'Projectdetails' : 'Print Details'}</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">
                  <FileText className="w-4 h-4 inline mr-2" />
                  {is3DPrinter ? 'Projectbeschrijving' : 'Opmerking'} *
                </Label>
                <Textarea
                  id="description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder={is3DPrinter ? "Beschrijf wat je wilt printen..." : "Voeg eventuele opmerkingen toe..."}
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Pricing Display */}
            {!is3DPrinter && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Euro className="w-5 h-5" />
                  Printkosten
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-900">Zwart-wit printen</span>
                    <span className="text-sm font-semibold text-blue-900">€0.10 per pagina</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-900">Kleur printen</span>
                    <span className="text-sm font-semibold text-blue-900">€0.25 per pagina</span>
                  </div>
                </div>
                <p className="text-xs text-blue-700 mt-3">
                  Kosten worden berekend op basis van het aantal pagina's
                </p>
              </div>
            )}

            {is3DPrinter && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm text-purple-900">
                  <strong>Let op:</strong> Materiaalkosten worden apart berekend op basis van gewicht.
                </p>
              </div>
            )}
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="mb-4">Contactgegevens</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  <User className="w-4 h-4 inline mr-2" />
                  Voornaam *
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jan"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  <User className="w-4 h-4 inline mr-2" />
                  Achternaam *
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Jansen"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-2" />
                  E-mailadres *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jan.jansen@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telefoonnummer *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+31 6 12345678"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Important Notes */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <ul className="list-disc list-inside space-y-1 mt-1">
                {is3DPrinter ? (
                  <>
                    <li>Upload je 3D-bestand (.STL, .OBJ, .3MF of .GCODE) of neem het mee op USB</li>
                    <li>Kom 15 minuten voor je tijdslot voor instructies</li>
                    <li>Materiaalkosten worden apart berekend op basis van gewicht</li>
                  </>
                ) : (
                  <>
                    <li>Upload je document of neem het mee op een USB-stick</li>
                    <li>Zorg dat je document klaar is om te printen</li>
                    <li>Kosten worden berekend per pagina bij afhaling</li>
                  </>
                )}
                <li>Je ontvangt een bevestigingsmail na reservering</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1"
              size="lg"
              disabled={
                !date || 
                !timeSlot || 
                (is3DPrinter && (!selectedFilamentType || !selectedColor)) || 
                !firstName || 
                !lastName || 
                !email || 
                !phone || 
                !projectDescription ||
                (uploadOption === 'now' && !file)
              }
            >
              Bevestig Reservering
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => onOpenChange(false)}
            >
              Annuleren
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
