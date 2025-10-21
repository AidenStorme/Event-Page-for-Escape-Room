import { useState, useMemo } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Search, Sparkles, BookOpen, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  tags: string[];
  availability: "available" | "checked-out";
}

const allBooks: Book[] = [
  {
    id: 1,
    title: "The Phoenix Project",
    author: "Gene Kim, Kevin Behr, George Spafford",
    description: "A novel about IT, DevOps, and helping your business win.",
    coverUrl: "https://covers.openlibrary.org/b/id/8247200-L.jpg",
    tags: ["DevOps", "IT Management", "Business"],
    availability: "available",
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A handbook of agile software craftsmanship. A must-read for every developer.",
    coverUrl: "https://covers.openlibrary.org/b/id/8234349-L.jpg",
    tags: ["Software Engineering", "Programming", "Best Practices"],
    availability: "checked-out",
  },
  {
    id: 3,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    description: "The big ideas behind reliable, scalable, and maintainable systems.",
    coverUrl: "https://covers.openlibrary.org/b/id/8259795-L.jpg",
    tags: ["System Design", "Databases", "Architecture"],
    availability: "available",
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    description: "Your journey to mastery, from journeyman to master.",
    coverUrl: "https://covers.openlibrary.org/b/id/9105454-L.jpg",
    tags: ["Programming", "Software Development", "Career"],
    availability: "available",
  },
  {
    id: 5,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    description: "The most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence.",
    coverUrl: "https://covers.openlibrary.org/b/id/10045267-L.jpg",
    tags: ["AI", "Machine Learning", "Computer Science"],
    availability: "checked-out",
  },
  {
    id: 6,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description: "A groundbreaking narrative of humanity's creation and evolution.",
    coverUrl: "https://covers.openlibrary.org/b/id/8262032-L.jpg",
    tags: ["History", "Anthropology", "Science"],
    availability: "available",
  },
];

function BookCard({ book }: { book: Book }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 relative">
        <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="w-full h-64 object-cover" />
        <Badge 
          className={`absolute top-4 right-4 border ${
            book.availability === 'available' 
              ? 'bg-green-100 text-green-800 border-green-300' 
              : 'bg-slate-100 text-slate-800 border-slate-300'
          }`}
        >
          {book.availability === 'available' ? 'Available' : 'Checked Out'}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-lg mb-2 line-clamp-2">{book.title}</CardTitle>
        <p className="text-sm text-slate-600 mb-3">by {book.author}</p>
        <p className="text-sm text-slate-700 mb-3 line-clamp-3 flex-grow">{book.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {book.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [searchType, setSearchType] = useState<"normal" | "ai">("normal");

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
          <h2 className="text-white mb-4">Digital Library</h2>
          <p className="text-indigo-100 text-lg max-w-3xl mx-auto">
            Explore our collection of books. Use our AI-powered search to find exactly what you're looking for.
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
            Normal Search
          </Button>
          <Button 
            variant={searchType === "ai" ? "default" : "outline"}
            onClick={() => setSearchType("ai")}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            AI Search
          </Button>
        </div>
        <Tabs value={searchType} className="w-full">
          <TabsContent value="normal" className="mt-0">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by title, author, description, or tags..."
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
                placeholder="Ask in natural language: 'Books about leadership' or 'Technical reads for developers'..."
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
              {(searchQuery || aiQuery) ? `Search Results` : "Our Collection"}
            </h2>
            <p className="text-slate-600">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} {(searchQuery || aiQuery) ? 'found' : 'available'}
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg mb-2">No books found</p>
            <p className="text-slate-500 text-sm">Try a different search term or browse our full collection</p>
          </div>
        )}
      </main>
    </>
  );
}
