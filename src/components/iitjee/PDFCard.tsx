import { FileText, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface PDFCardProps {
  title: string;
  description: string;
  fileUrl: string;
  subject?: string;
}

export default function PDFCard({ title, description, fileUrl, subject }: PDFCardProps) {
  return (
    <Card 
      className="resource-card h-full flex flex-col bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-jeepurple-200 rounded-xl overflow-hidden"
    >
      <CardContent className="p-4 sm:p-6 flex-grow bg-gradient-to-br from-jeepurple-50 to-cogteal-50 animate-fade-in">
        <div className="flex items-start justify-between mb-3">
          <div className="rounded-full bg-jeepurple-100 p-2 sm:p-3">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-jeepurple-500 animate-pulse-slow" />
          </div>
          {subject && (
            <div className="flex items-center gap-1 bg-jeepurple-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              <BookOpen className="w-3 h-3" />
              <span className="hidden sm:inline">{subject}</span>
              <span className="sm:hidden">{subject.slice(0, 3)}</span>
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-base sm:text-lg text-jeepurple-700 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 sm:p-6 pt-0">
        <Button 
          variant="outline" 
          size="sm"
          className="w-full gap-2 border-jeepurple-200 text-jeepurple-500 bg-jeepurple-50 hover:bg-jeepurple-100 hover:text-jeepurple-600 hover:border-jeepurple-300 transition-all duration-300 group"
          asChild
        >
          <a href={fileUrl} download aria-label={`Download ${title}`}>
            <Download className="w-4 h-4 group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-xs sm:text-sm">Download PDF</span>
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}