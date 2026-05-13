import React from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface FormFieldProps {
  label: string;
  error?: string;
  isValid?: boolean;
  required?: boolean;
  children: React.ReactNode;
  id: string;
}

export function FormField({ label, error, isValid, required, children, id }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <label 
        htmlFor={id}
        className={cn(
          "text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300",
          error ? "text-red-500" : isValid ? "text-green-600" : "text-gray-400 group-focus-within:text-black"
        )}
      >
        {label} {required && <span className="text-red-400 font-bold">*</span>}
      </label>
      <div className="relative">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              id,
              className: cn(
                child.props.className,
                "w-full bg-[#111] border rounded-lg px-4 py-3.5 text-sm md:text-base text-white outline-none transition-all duration-300 placeholder:text-gray-700",
                error 
                  ? "border-red-500 bg-red-500/5 focus:bg-red-500/10" 
                  : isValid 
                    ? "border-green-500 bg-green-500/5" 
                    : "border-white/10 focus:border-white focus:bg-[#181818]"
              )
            });
          }
          return child;
        })}
      </div>
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p 
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[11px] text-red-500 font-medium"
          >
            {error}
          </motion.p>
        ) : isValid ? (
          <motion.p 
            key="valid"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-[11px] text-green-600 font-medium flex items-center gap-1"
          >
            <span className="w-1 h-1 bg-green-600 rounded-full" />
            Field valid
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
