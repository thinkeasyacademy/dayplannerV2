
import React, { useState, useEffect } from 'react';
import { Task, Project, TimelineItemType } from '../../types';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';

interface TaskModalProps {
  task: Task | null;
  projects: Project[];
  onClose: () => void;
  onSave: (taskData: Partial<Task>) => void;
  onDelete: () => void;
  defaultDate: string;
  forceType?: TimelineItemType;
  isBigNoteInitial?: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, projects, onClose, onSave, onDelete, defaultDate, forceType, isBigNoteInitial }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [time, setTime] = useState(task?.time || '10:00');
  const [date, setDate] = useState<string | null>(task ? task.date : defaultDate);
  const [projectId, setProjectId] = useState(task?.projectId || '');
  const [type, setType] = useState<TimelineItemType>(task?.type || forceType || 'task');
  const [isBigNote, setIsBigNote] = useState(task?.isBigNote || isBigNoteInitial || false);
  const [description, setDescription] = useState(task?.description || '');
  const [details, setDetails] = useState(task?.details || '');
  const [reminderMinutes, setReminderMinutes] = useState<number | undefined>(task?.reminderMinutes);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!task) {
      setType(forceType || 'task');
      setIsBigNote(isBigNoteInitial || false);
    }
  }, [forceType, isBigNoteInitial, task]);

  const handleSave = () => {
    if (!title.trim()) return alert("Please enter a title");
    onSave({ 
      title, 
      time: date ? time : '10:00', 
      date, 
      projectId: projectId || null, 
      type, 
      isBigNote, 
      description: description.trim(), 
      details: details.trim(), 
      reminderMinutes: reminderMinutes === -1 ? undefined : reminderMinutes 
    });
  };

  const getWordCount = (text: string) => {
    if (!text.trim()) return 0;
    // Regex matches words in both English and Bengali/Indic scripts
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  const format12h = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
  };

  const formatDateLong = (dStr: string) => new Date(dStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  const reminderOptions = [
    { label: 'No Reminder', value: -1 },
    { label: 'At time of event', value: 0 },
    { label: '5 minutes before', value: 5 },
    { label: '15 minutes before', value: 15 },
    { label: '30 minutes before', value: 30 },
    { label: '1 hour before', value: 60 },
    { label: '2 hours before', value: 120 },
    { label: '4 hours before', value: 240 },
    { label: '12 hours before', value: 720 },
    { label: '1 day before', value: 1440 },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-[#121212] flex flex-col animate-slideUp transition-colors overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 flex items-center justify-between border-b dark:border-white/5 bg-white dark:bg-[#121212] sticky top-0 z-10">
        <button onClick={onClose} className="p-2 -ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors active:scale-90">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">
          {task ? 'Edit Item' : 'Create New'}
        </h3>
        <div className="flex items-center space-x-1">
          {task && (
            <button 
              onClick={onDelete} 
              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            </button>
          )}
          <button onClick={handleSave} className="ml-2 px-5 py-2.5 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
            Done
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-8 pb-40">
        <div className="max-w-md mx-auto space-y-8">
          
          {/* Type Selector */}
          <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl">
            <button onClick={() => { setType('task'); setIsBigNote(false); }} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${type === 'task' && !isBigNote ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500'}`}>Task</button>
            <button onClick={() => { setType('note'); setIsBigNote(false); }} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${type === 'note' && !isBigNote ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500'}`}>Note</button>
            <button onClick={() => { setType('note'); setIsBigNote(true); }} className={`flex-1 py-3 text-[10px] font-black uppercase rounded-xl transition-all ${isBigNote ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500'}`}>Big Note</button>
          </div>

          <div className="space-y-6">
            <div>
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">What is on your mind?</label>
               <input 
                autoFocus 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Item title..." 
                className="w-full px-0 py-3 bg-transparent text-2xl font-black dark:text-white border-none focus:ring-0 placeholder-slate-200 dark:placeholder-slate-700 transition-all" 
              />
            </div>
            
            <div>
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Additional Context (Links allowed)</label>
               <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Subtitle or location hint" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl font-bold dark:text-white border-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm" />
            </div>

            {isBigNote && (
              <div className="animate-fadeIn relative">
                <div className="flex justify-between items-center mb-2 px-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Description</label>
                  <span className="text-[9px] font-black text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-md uppercase tracking-widest">
                    {getWordCount(description)} Words
                  </span>
                </div>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Write your thoughts here..." 
                  className="w-full px-5 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl min-h-[220px] text-base font-medium dark:text-white resize-none border-none focus:ring-2 focus:ring-blue-500/50 transition-all leading-relaxed whitespace-pre-wrap" 
                />
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => { setDate(date || defaultDate); setShowDatePicker(true); }} className={`flex-1 py-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-1 ${date ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/10 text-blue-600' : 'border-transparent bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                <span className="text-[10px] font-black uppercase tracking-widest">Schedule</span>
                {date && <span className="text-[11px] font-bold">{formatDateLong(date)}</span>}
              </button>
              <button onClick={() => { setDate(null); setShowDatePicker(false); setShowTimePicker(false); }} className={`flex-1 py-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-1 ${!date ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/10 text-blue-600' : 'border-transparent bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                <span className="text-[10px] font-black uppercase tracking-widest">Unplanned</span>
                {!date && <span className="text-[11px] font-bold">No date set</span>}
              </button>
            </div>

            {date && (
              <div className="space-y-4 pt-2 animate-fadeIn">
                <div className="flex gap-3">
                  <button onClick={() => setShowDatePicker(!showDatePicker)} className="flex-1 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-left text-xs font-bold dark:text-white flex justify-between items-center group border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                    <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-blue-600"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> {formatDateLong(date)}</span>
                  </button>
                  <button onClick={() => setShowTimePicker(!showTimePicker)} className="flex-1 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-left text-xs font-bold dark:text-white flex justify-between items-center group border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                    <span className="flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-blue-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> {format12h(time)}</span>
                  </button>
                </div>

                {showDatePicker && (
                  <div className="pt-2 animate-slideIn">
                    <DatePicker selectedDate={date} onSelect={(d) => { setDate(d); setShowDatePicker(false); }} />
                  </div>
                )}
                
                {showTimePicker && (
                  <div className="pt-2 animate-slideIn">
                    <TimePicker initialTime={time} onSelect={setTime} />
                  </div>
                )}

                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Reminder Alert</label>
                   <div className="relative">
                     <select value={reminderMinutes === undefined ? -1 : reminderMinutes} onChange={(e) => setReminderMinutes(parseInt(e.target.value))} className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-xs font-bold dark:text-white outline-none border-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer">
                       {reminderOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                     </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                     </div>
                   </div>
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Assigned Project</label>
              <div className="relative">
                <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-xs font-bold dark:text-white outline-none border-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer">
                  <option value="">No Project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default TaskModal;
