import { useState, useMemo } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Search, Sparkles, BookOpen, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BookDetailDialog } from "./BookDetailDialog";
import { BookReserveDialog } from "./BookReserveDialog";

// Import images so Vite processes them for production (GitHub Pages)
import HarryCover from "../assets/Harry_Potter_&_De_Steen_Der_Wijzen.jpg";
import GeronimoGezonken from "../assets/Geronimo_Stilton_Het_mysterie_van_de_gezonken_stad.jpg";
import GeronimoMaan from "../assets/Geronimo_Stilton_een_muis_op_de_maan.jpg";
import HungerGames from "../assets/The_Hunger_Games.jpg";
import CatchingFire from "../assets/Catching_Fire.jpg";
import Mockingjay from "../assets/Mockingjay.jpg";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  tags: string[];
  availability: "beschikbaar" | "uitgeleend";
  price: number;
  onSale?: boolean;
  featuredInEscapeRoom?: boolean;
}

const allBooks: Book[] = [
  {
    id: 1,
    title: "Harry Potter & de Steen der Wijzen",
    author: "J.K. Rowling",
    description: "Het eerste boek uit de Harry Potter-serie: de ontdekking van magische werelden en vriendschap.",
    coverUrl: HarryCover,
    tags: ["Fantasy", "Young Adult"],
    availability: "beschikbaar",
    price: 12.99,
    onSale: true,
    featuredInEscapeRoom: true,
  },
  {
    id: 2,
    title: "Het Mysterie van de Verzonken Stad",
    author: "Geronimo Stilton",
    description: "Een spannend avontuur in de Geronimo Stilton-serie waarin Geronimo een oud mysterie ontrafelt.",
  coverUrl: GeronimoGezonken,
    tags: ["Kinderboek", "Geronimo Stilton"],
    availability: "uitgeleend",
    price: 8.49,
  },
  {
    id: 3,
    title: "Geronimo Stilton: Een muis op de maan",
    author: "Geronimo Stilton",
    description: "Een tweede vrolijk en grappig avontuur uit de Geronimo Stilton-serie.",
  coverUrl: GeronimoMaan,
    tags: ["Kinderboek", "Geronimo Stilton"],
    availability: "beschikbaar",
    price: 8.99,
  },
  {
    id: 4,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    description: "Het eerste boek uit de Hunger Games-trilogie: Katniss Everdeen strijdt om te overleven in de Games.",
  coverUrl: HungerGames,
    tags: ["Dystopie", "Young Adult"],
    availability: "beschikbaar",
    price: 10.99,
  },
  {
    id: 5,
    title: "Catching Fire",
    author: "Suzanne Collins",
    description: "Het tweede boek in de Hunger Games-serie, waarin de nasleep van de Games leidt tot nieuwe conflicten.",
  coverUrl: CatchingFire,
    tags: ["Dystopie", "Young Adult"],
    availability: "uitgeleend",
    price: 11.99,
  },
  {
    id: 6,
    title: "Mockingjay",
    author: "Suzanne Collins",
    description: "Het afsluitende deel van de Hunger Games-serie, met de climax van het verzet.",
  coverUrl: Mockingjay,
    tags: ["Dystopie", "Young Adult"],
    availability: "beschikbaar",
    price: 12.49,
  },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);

function BookCard({ book, onDetails, onReserve }: { book: Book; onDetails: (b: Book) => void; onReserve: (b: Book) => void }) {
  return (
    <Card
      className={`overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 ${book.onSale ? 'border-rose-300' : ''}`}
      style={book.featuredInEscapeRoom ? {
        border: '3px solid #d97706',
        boxShadow: '0 20px 60px -15px rgba(217, 119, 6, 0.5), 0 0 0 1px rgba(217, 119, 6, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)',
        background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 25%, #fde68a 50%, #fef3c7 75%, #fffbeb 100%)',
        transform: 'translateY(-2px)'
      } : {}}
    >
      <CardHeader className="p-0 relative">
        <img src={book.coverUrl} alt={`Omslag van ${book.title}`} className="w-full h-64 object-cover" />
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 items-start">
          {book.featuredInEscapeRoom && (
            <Badge style={{ 
              backgroundColor: '#d97706', 
              color: '#ffffff', 
              borderColor: '#b45309',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)'
            }}>
              🔑 Escape Room Boek
            </Badge>
          )}
          {book.onSale && (
            <Badge style={{ backgroundColor: '#ffe4e6', color: '#9f1239', borderColor: '#fda4af' }}>
              🎉 SALE
            </Badge>
          )}
        </div>
        <Badge 
          className={`absolute top-4 right-4 border ${
            book.availability === 'beschikbaar' 
              ? 'bg-green-100 text-green-800 border-green-300' 
              : 'bg-slate-100 text-slate-800 border-slate-300'
          }`}
        >
          {book.availability === 'beschikbaar' ? 'Beschikbaar' : 'Uitgeleend'}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle
          className={`text-lg mb-2 line-clamp-2 ${
            book.featuredInEscapeRoom ? 'text-violet-700' : ''
          }`}
        >
          {book.title}
        </CardTitle>
        <p className="text-sm text-slate-600 mb-1">door {book.author}</p>
        <div className="mb-3">
          {book.onSale ? (
            <div className="flex items-center gap-2">
              <p className="text-base font-bold" style={{ color: '#dc2626' }}>{formatPrice(book.price * 0.8)}</p>
              <p className="text-xs text-slate-400" style={{ textDecoration: 'line-through' }}>{formatPrice(book.price)}</p>
            </div>
          ) : (
            <p className={`text-sm font-semibold ${
              book.featuredInEscapeRoom 
                ? 'text-violet-700 text-base' 
                : 'text-slate-900'
            }`}>{formatPrice(book.price)}</p>
          )}
        </div>
        <p className="text-sm text-slate-700 mb-3 line-clamp-3 flex-grow">{book.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {book.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onDetails(book)}>
          Details
        </Button>
        <Button 
          size="sm" 
          className="flex-1" 
          onClick={() => onReserve(book)}
          disabled={book.availability === "uitgeleend"}
        >
          {book.availability === "uitgeleend" ? "Uitgeleend" : "Leen"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [searchType, setSearchType] = useState<"normal" | "ai">("normal");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [reserveDialogOpen, setReserveDialogOpen] = useState(false);

  const filteredBooks = useMemo(() => {
    const query = searchType === "normal" ? searchQuery : aiQuery;
    if (!query) return allBooks;

    // This is a simple text search. For a true AI search, you would
    // make an API call to a vector database or a semantic search service.
    const lowerCaseQuery = query.toLowerCase();
    return allBooks.filter(book => 
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.description.toLowerCase().includes(lowerCaseQuery) ||
      book.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
  }, [searchQuery, aiQuery, searchType]);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-white mb-4">Digitale Bibliotheek</h2>
          <p className="text-indigo-100 text-lg max-w-3xl mx-auto">
            Verken onze collectie boeken. Gebruik onze AI-zoekfunctie om precies te vinden wat je zoekt.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-center gap-2 mb-6">
          <Button 
            variant={searchType === "normal" ? "default" : "outline"}
            onClick={() => setSearchType("normal")}
            className="flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Normaal Zoeken
          </Button>
          <Button 
            variant={searchType === "ai" ? "default" : "outline"}
            onClick={() => setSearchType("ai")}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            AI Zoeken
          </Button>
        </div>
        <Tabs value={searchType} className="w-full">
          <TabsContent value="normal" className="mt-0">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Zoek op titel, auteur, beschrijving of tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-base"
              />
            </div>
          </TabsContent>
          <TabsContent value="ai" className="mt-0">
            <div className="relative max-w-2xl mx-auto">
              <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Vraag in natuurlijke taal: 'Boeken over leiderschap' of 'Technische lectuur voor ontwikkelaars'..."
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-base"
              />
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </section>

      {/* Books List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-slate-900 mb-2">
              {(searchQuery || aiQuery) ? `Zoekresultaten` : "Onze Collectie"}
            </h2>
            <p className="text-slate-600">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'boek' : 'boeken'} {(searchQuery || aiQuery) ? 'gevonden' : 'beschikbaar'}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filteren
          </Button>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onDetails={(b) => { setSelectedBook(b); setDetailOpen(true); }}
                onReserve={(b) => { setSelectedBook(b); setReserveDialogOpen(true); }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg mb-2">Geen boeken gevonden</p>
            <p className="text-slate-500 text-sm">Probeer een andere zoekterm of blader door onze volledige collectie</p>
          </div>
        )}
      </main>
      {/* Book detail dialog */}
      <BookDetailDialog open={detailOpen} onOpenChange={setDetailOpen} book={selectedBook} />
      
      {/* Book reservation dialog */}
      <BookReserveDialog open={reserveDialogOpen} onOpenChange={setReserveDialogOpen} book={selectedBook} />
    </>
  );
}
