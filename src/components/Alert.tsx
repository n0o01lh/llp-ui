import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

export interface AlertProps {
  message: string;
  duration?: number;
}

export const Alert: React.FC<AlertProps> = (props) => {
  const { message, duration: alertDuration } = props;
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const duration = alertDuration || 15; // duración en segundos

  console.log(visible);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration * 1000);

      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 100 / duration;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [visible]);

  useEffect(() => {
    setVisible(true);
  }, []);

  const closeAlert = () => {
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div
        className={`
          bg-primary border-l-4 border-accent text-primary-foreground p-4
          shadow-lg rounded-lg max-w-sm relative overflow-hidden
          transition-all duration-500 ease-in-out
          ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
          }
        `}
        role="alert"
      >
        <button
          onClick={closeAlert}
          className="absolute top-2 right-2 text-pimary-foreground"
          aria-label="Cerrar alerta"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span className="font-bold">¡Atención!</span>
        </div>
        <p className="mt-2 mb-4">{message}</p>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-500">
          <div
            className="h-full bg-white transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
