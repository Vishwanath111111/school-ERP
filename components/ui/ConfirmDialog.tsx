import React from 'react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  const iconColors = {
    danger: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    primary: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-full shrink-0 ${iconColors[variant]}`}>
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
            {title}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button variant={variant === 'primary' ? 'primary' : 'danger'} size="sm" onClick={onConfirm} isLoading={isLoading}>
          {confirmText}
        </Button>
      </div>
    </Dialog>
  );
};
