import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export interface FeatureDetailContent {
  title: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
}

interface FeatureDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: FeatureDetailContent;
}

export function FeatureDetailModal({
  isOpen,
  onClose,
  content,
}: FeatureDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] border border-gray-800 bg-black/90 backdrop-blur-sm text-white">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            {content.icon && <div className="flex-shrink-0">{content.icon}</div>}
            <DialogTitle className="text-xl sm:text-2xl">{content.title}</DialogTitle>
          </div>
        </DialogHeader>
        
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        <div className="py-4">
          <div className="space-y-4">
            {content.description}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}