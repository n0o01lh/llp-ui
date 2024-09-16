import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ValidationFieldsProps {
  missingFields: string[];
  onClose?: () => void;
}

export default function ValidationFields({
  missingFields = [],
  onClose,
}: ValidationFieldsProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className=" mt-4 bg-red-50 border-2 border-red-500 rounded-lg shadow-sm overflow-hidden"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-red-800">
                Missing required fields
              </h3>
              <button
                onClick={handleClose}
                className="ml-4 text-red-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                aria-label="Cerrar alerta"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {missingFields.map((field, index) => (
                <li key={index} className="text-sm text-red-700">
                  • {field}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
