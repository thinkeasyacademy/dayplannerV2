
import React, { useState } from 'react';

interface DatePickerProps {
  selectedDate: string; // YYYY-MM-DD
  onSelect: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onSelect }) => {
  const [currentViewDate, setCurrentViewDate] = useState(new Date(selectedDate || new Date()));
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth();
  const monthName = currentViewDate.toLocaleString('en-US', { month: 'long' });

  const prevMonth = () => setCurrentViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentViewDate(new Date(year, month + 1, 1));

  const handleDateClick = (day: number) => {
    const d = new Date(year, month, day);
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - (offset * 60 * 1000));
    onSelect(local.toISOString().split('T')[0]);
  };

  const today = new Date().toISOString().split('T')[0];
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);
  const days = [];

  // Padding for start of month
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`pad-${i}`} className="h-10 w-10"></div>);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = new Date(year, month, d).toISOString().split('T')[0];
    const isSelected = dateStr === selectedDate;
    const isToday = dateStr === today;

    days.push(
      <button
        key={d}
        type="button"
        onClick={() => handleDateClick(d)}
        className={`h-10 w-10 rounded-xl text-xs font-black transition-all flex items-center justify-center
          ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110' : 
            isToday ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-200 dark:border-blue-800' : 
            'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}
        `}
      >
        {d}
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-inner animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <button type="button" onClick={prevMonth} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="text-center">
          <h4 className="text-[13px] font-black text-slate-800 dark:text-white uppercase tracking-widest">{monthName}</h4>
          <p className="text-[10px] font-black text-slate-400 tracking-widest mt-0.5">{year}</p>
        </div>
        <button type="button" onClick={nextMonth} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <div key={idx} className="h-8 w-10 flex items-center justify-center text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};

export default DatePicker;
