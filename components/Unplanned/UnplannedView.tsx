
import React from 'react';
import { Task } from '../../types';

interface UnplannedViewProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onAssignDate: (taskId: string, date: string) => void;
  onAddTask: () => void;
  onAddNote: () => void;
}

const UnplannedView: React.FC<UnplannedViewProps> = ({ tasks, onToggle, onEdit, onDelete, onAssignDate, onAddTask, onAddNote }) => {
  const unplannedTasks = tasks.filter(t => !t.date);

  const renderTextWithLinks = (text: string) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-blue-500 underline decoration-blue-500/30 hover:text-blue-600">
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="px-6 py-4 dark:bg-slate-900 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-400 text-sm font-medium">Unscheduled items for your timeline.</p>
        <div className="flex space-x-2">
          <button 
            onClick={onAddNote}
            className="w-8 h-8 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          </button>
          <button 
            onClick={onAddTask}
            className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>

      {unplannedTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-6 pt-20 text-center animate-fadeIn">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">No unplanned tasks</h3>
          <p className="text-slate-500 max-w-xs">Items without any assigned dates or projects are shown here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {unplannedTasks.map(task => (
            <div key={task.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm group animate-fadeIn">
              <div className="flex items-center space-x-4">
                {task.type === 'task' ? (
                  <div 
                    onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${
                      task.completed ? 'bg-blue-600 border-blue-600' : 'bg-white dark:bg-slate-900 border-blue-400'
                    }`}
                  >
                    {task.completed && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                  </div>
                ) : (
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  </div>
                )}
                <div className="flex-1 cursor-pointer" onClick={() => onEdit(task)}>
                  <h4 className={`text-lg font-bold flex items-center flex-wrap gap-2 ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {task.title}
                    {/* Note/Big Note Indicator Beside Title */}
                    {task.type === 'note' && (
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded-md inline-block">
                        {task.isBigNote ? 'Big Note' : 'Note'}
                      </span>
                    )}
                  </h4>
                  {task.details && (
                    <p className="text-xs text-blue-500 font-bold mt-1 break-words">{renderTextWithLinks(task.details)}</p>
                  )}
                  {task.isBigNote && task.description && (
                    <p className="text-sm text-slate-500 line-clamp-1 mt-1 whitespace-pre-wrap">{renderTextWithLinks(task.description)}</p>
                  )}
                  <div className="flex space-x-2 mt-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAssignDate(task.id, new Date().toISOString().split('T')[0]); }}
                      className="text-[10px] font-bold uppercase bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/30 hover:bg-blue-600 hover:text-white transition-all"
                    >
                      Schedule Today
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                      className="text-[10px] font-bold uppercase bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg border border-red-100 dark:border-red-900/30 hover:bg-red-600 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnplannedView;
