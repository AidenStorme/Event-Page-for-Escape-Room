import { useState } from "react";
import { EscapeRoomsPage } from "./components/EscapeRoomsPage";
import { PrintersPage } from "./components/3DPrintersPage";
import { NormalPrintersPage } from "./components/NormalPrintersPage";
import { Button } from "./components/ui/button";
import { BookOpen, Printer } from "lucide-react";

type Page = "escape-rooms" | "printers" | "normal-printers";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("escape-rooms");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`${currentPage === "escape-rooms" ? "bg-blue-600" : currentPage === "printers" ? "bg-purple-600" : "bg-blue-600"} text-white p-2 rounded-lg transition-colors`}>
                {currentPage === "escape-rooms" ? (
                  <BookOpen className="w-6 h-6" />
                ) : (
                  <Printer className="w-6 h-6" />
                )}
              </div>
              <div>
                <h1 className="text-slate-900">Riverside Public Library</h1>
                <p className="text-sm text-slate-600">
                  {currentPage === "escape-rooms" ? "Literary Escape Rooms" : currentPage === "printers" ? "3D Printer Lab" : "Document Printers"}
                </p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex gap-2">
              <Button
                variant={currentPage === "escape-rooms" ? "default" : "outline"}
                onClick={() => setCurrentPage("escape-rooms")}
                className={currentPage === "escape-rooms" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Escape Rooms
              </Button>
              <Button
                variant={currentPage === "printers" ? "default" : "outline"}
                onClick={() => setCurrentPage("printers")}
                className={currentPage === "printers" ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                <Printer className="w-4 h-4 mr-2" />
                3D Printers
              </Button>
              <Button
                variant={currentPage === "normal-printers" ? "default" : "outline"}
                onClick={() => setCurrentPage("normal-printers")}
                className={currentPage === "normal-printers" ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <Printer className="w-4 h-4 mr-2" />
                Printers
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      {currentPage === "escape-rooms" && <EscapeRoomsPage />}
      {currentPage === "printers" && <PrintersPage />}
      {currentPage === "normal-printers" && <NormalPrintersPage />}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 Riverside Public Library. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                FAQ
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Library Policies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
