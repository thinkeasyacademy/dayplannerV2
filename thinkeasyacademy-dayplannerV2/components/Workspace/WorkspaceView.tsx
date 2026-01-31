
import React, { useState } from 'react';
import { Project, Profile, AppLockSettings } from '../../types';
import AppLockModal from '../UI/AppLockModal';

interface WorkspaceViewProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  notesCount: number;
  reminderTone: string;
  setReminderTone: (tone: string) => void;
  profile: Profile;
  onEditProfile: () => void;
  appLock: AppLockSettings;
  setAppLock: React.Dispatch<React.SetStateAction<AppLockSettings>>;
  onSignOut: () => void;
  onDeleteAccount: () => void;
}

const WorkspaceView: React.FC<WorkspaceViewProps> = ({ 
  projects, notesCount, reminderTone, setReminderTone, profile, onEditProfile, appLock, setAppLock, onSignOut, onDeleteAccount
}) => {
  const [isToneExpanded, setIsToneExpanded] = useState(false);
  const [isAppLockExpanded, setIsAppLockExpanded] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);

  const currentYear = Math.max(2026, new Date().getFullYear());

  return (
    <div className="px-6 py-6 space-y-6 dark:bg-slate-900 transition-colors pb-24 overflow-y-auto h-full scrollbar-hide">
      <div className="flex items-center space-x-4 bg-white dark:bg-slate-800 p-5 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="relative">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden border-2 border-slate-50 dark:border-slate-700 shadow-md">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            )}
          </div>
          <button onClick={onEditProfile} className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-800 shadow-lg transition-transform active:scale-90"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg></button>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight tracking-tight">{profile.name || 'Academy Member'}</h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold tracking-widest">{profile.email}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-6 space-y-3">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Account & Security</h4>
          <button onClick={onSignOut}
            className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl active:scale-[0.98] transition-all border border-slate-100 dark:border-slate-700/50"
          >
            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              <span className="text-[12px] font-black uppercase tracking-widest">Sign Out</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <button onClick={onDeleteAccount}
            className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl active:scale-[0.98] transition-all border border-red-100 dark:border-red-900/20"
          >
            <div className="flex items-center space-x-3 text-red-600 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
              <span className="text-[12px] font-black uppercase tracking-widest">Delete Account</span>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <button onClick={() => setIsToneExpanded(!isToneExpanded)} className="w-full flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg></div>
              <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter text-sm">Reminder Tone</h3>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isToneExpanded ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
          {isToneExpanded && (
            <div className="px-6 pb-6 pt-2 space-y-2 animate-fadeIn">
              {['louder', 'mellow', 'modern'].map(tone => (
                <button key={tone} onClick={() => setReminderTone(tone)}
                  className={`w-full p-4 rounded-2xl flex items-center justify-between font-bold text-xs uppercase tracking-widest transition-all ${reminderTone === tone ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-900 text-slate-500'}`}
                >
                  {tone}
                  {reminderTone === tone && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <button onClick={() => setIsAppLockExpanded(!isAppLockExpanded)} className="w-full flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-500"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
              <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter text-sm">App Lock</h3>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isAppLockExpanded ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
          {isAppLockExpanded && (
            <div className="px-6 pb-6 pt-2 animate-fadeIn">
              <button onClick={() => setIsLockModalOpen(true)}
                className={`w-full p-5 rounded-2xl flex items-center justify-center font-black uppercase tracking-[0.2em] text-xs transition-all ${appLock.enabled ? 'bg-blue-50 text-blue-600 border-2 border-blue-100' : 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'}`}
              >
                {appLock.enabled ? 'Change Security PIN' : 'Enable Security Lock'}
              </button>
              {appLock.enabled && (
                <button onClick={() => setAppLock({ enabled: false, pin: null, timeoutMinutes: 1, lastUnlockedAt: null })}
                  className="w-full mt-3 p-3 text-red-500 font-black uppercase tracking-widest text-[9px] hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
                >
                  Disable Protection
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="pt-8 pb-4 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-700">
          © {currentYear} Think Easy Academy
        </p>
      </div>

      {isLockModalOpen && <AppLockModal onClose={() => setIsLockModalOpen(false)} onSave={pin => { setAppLock(prev => ({ ...prev, pin, enabled: true, lastUnlockedAt: Date.now() })); setIsLockModalOpen(false); }} />}
    </div>
  );
};

export default WorkspaceView;
