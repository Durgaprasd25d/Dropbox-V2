import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({ children, className, onSubmit, ...props }) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-6", className)}
      onSubmit={onSubmit}
      {...props}
    >
      {children}
    </motion.form>
  );
};

export default Form;