import React from "react";
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

export interface Book {
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

interface BookDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book | null;
}

export function BookDetailDialog({ open, onOpenChange, book }: BookDetailDialogProps) {
  if (!book) return null;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={"max-w-4xl max-h-[90vh] overflow-y-auto"}>
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>Door {book.author}</DialogDescription>
          {book.featuredInEscapeRoom && (
            <Badge className="w-fit !bg-violet-700 !text-white border border-violet-800 shadow-md mt-2">
              🔑 Featured in Escape Room Experience
            </Badge>
          )}
          <div className={`mt-2 text-base font-semibold ${
            book.featuredInEscapeRoom 
              ? 'text-amber-700 text-lg' 
              : book.onSale 
              ? 'text-rose-700' 
              : 'text-slate-900'
          }`}>
            {formatPrice(book.price)}
            {book.onSale && book.featuredInEscapeRoom && (
              <span className="ml-2 text-sm text-rose-600">🎉 Special Sale!</span>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className={"relative rounded-lg border bg-slate-100 flex items-center justify-center p-2 max-h-[70vh] overflow-auto"}>
            <img
              src={book.coverUrl}
              alt={book.title}
              loading="lazy"
              className="max-w-full max-h-[65vh] w-auto h-auto object-contain"
            />
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 items-start">
              {book.featuredInEscapeRoom && (
                <Badge className="bg-amber-600/95 text-white border border-amber-700 shadow-md">🔑 Escape Room Boek</Badge>
              )}
              {book.onSale && (
                <Badge className="bg-fuchsia-600/95 text-white border border-fuchsia-700 shadow-md">🎉 SALE</Badge>
              )}
            </div>
            <div className="absolute top-4 right-4">
              <Badge className={book.availability === 'beschikbaar' ? 'bg-green-100 text-green-800 border-green-300 border' : 'bg-slate-100 text-slate-800 border-slate-300 border'}>
                {book.availability === 'beschikbaar' ? 'Beschikbaar' : 'Uitgeleend'}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-slate-700">{book.description}</p>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            {book.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="pt-4">
            <Button onClick={() => onOpenChange(false)}>Sluit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BookDetailDialog;
