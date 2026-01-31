import React from 'react';

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Yes, Proceed", 
  cancelText = "Cancel" 
}) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onCancel}></div>
      <div className="bg-white dark:bg-slate-900 w-full max-w-xs rounded-[2.5rem] shadow-2xl relative animate-slideIn overflow-hidden p-8 border border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-black text-slate-800 dark:text-white mb-3 text-center tracking-tight">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium text-center mb-8 leading-relaxed">
          {message}
        </p>
        <div className="space-y-3">
          <button 
            onClick={onConfirm}
            className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg ${title.toLowerCase().includes('delete') ? 'bg-red-600 text-white shadow-red-500/20' : 'bg-blue-600 text-white shadow-blue-500/20'}`}
          >
            {confirmText}
          </button>
          <button 
            onClick={onCancel}
            className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest rounded-2xl text-[10px] active:scale-95 transition-all"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;