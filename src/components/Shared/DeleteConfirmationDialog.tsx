import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DeleteConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DeleteConfirmationDialog({
  message,
  onConfirm,
  onCancel,
  isOpen,
  setIsOpen,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            ¿Are you sure?
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-500">{message}</p>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="mr-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="bg-[#0056D2] text-white hover:bg-[#00419E] focus:ring-2 focus:ring-[#0056D2] focus:ring-offset-2"
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
