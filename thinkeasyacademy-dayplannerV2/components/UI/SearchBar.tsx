
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClose }) => {
  return (
    <div className="px-6 py-2 bg-white dark:bg-slate-900 border-b dark:border-slate-800 animate-fadeIn flex items-center space-x-3">
      <div className="relative flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input 
          autoFocus
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search tasks, notes..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all font-medium dark:text-white text-sm"
        />
      </div>
      <button 
        onClick={onClose}
        className="text-slate-400 font-bold text-xs uppercase px-2 py-1"
      >
        Close
      </button>
    </div>
  );
};

export default SearchBar;
