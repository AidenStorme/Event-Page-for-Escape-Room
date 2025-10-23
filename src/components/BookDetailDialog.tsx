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
}

interface BookDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book | null;
}

export function BookDetailDialog({ open, onOpenChange, book }: BookDetailDialogProps) {
  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>Door {book.author}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative rounded-lg border bg-slate-100 flex items-center justify-center p-2 max-h-[70vh] overflow-auto">
            <img
              src={book.coverUrl}
              alt={book.title}
              loading="lazy"
              className="max-w-full max-h-[65vh] w-auto h-auto object-contain"
            />
            <div className="absolute top-4 left-4">
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
