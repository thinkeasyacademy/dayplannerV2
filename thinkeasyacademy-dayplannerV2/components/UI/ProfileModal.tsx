import React, { useState } from 'react';
import { Profile } from '../../types';
import { supabase } from '../../App';

interface ProfileModalProps {
  profile: Profile;
  onClose: () => void;
  onSave: (p: Profile) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onClose, onSave }) => {
  const [name, setName] = useState(profile.name);
  const [email] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) return setPwError("At least 6 chars required");
    setPwLoading(true);
    setPwError('');
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: oldPassword });
      if (signInError) throw new Error("Incorrect current password");
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;
      alert("Password updated! Signing out...");
      await supabase.auth.signOut();
    } catch (err: any) {
      setPwError(err.message || "Update failed");
      setPwLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] overflow-y-auto max-h-[90vh] shadow-2xl relative animate-slideIn transition-colors scrollbar-hide">
        <div className="p-8">
          <h3 className="text-xl font-black text-slate-800 dark:text-white mb-6">Profile Settings</h3>
          
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900 rounded-full flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                {avatar ? <img src={avatar} alt="P" className="w-full h-full object-cover" /> : <span className="text-3xl">👤</span>}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-xl cursor-pointer shadow-lg active:scale-90 transition-transform">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </label>
            </div>
          </div>

          {!isChangingPassword ? (
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Display Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl font-bold dark:text-white border-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
              </div>
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Email Address</label>
                <input type="email" value={email} readOnly className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl font-bold text-slate-400 dark:text-slate-500 border-none cursor-not-allowed" />
              </div>

              <button onClick={() => setIsChangingPassword(true)} className="w-full p-4 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Change Password
              </button>

              <div className="flex gap-4">
                <button onClick={onClose} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase text-slate-500">Cancel</button>
                <button onClick={() => onSave({ name, email, avatar })} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-blue-500/20 active:scale-95 transition-transform">Save Changes</button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">Current Password</label>
                <div className="relative">
                  <input 
                    type={showOldPassword ? "text" : "password"} 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    placeholder="Enter current password" 
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl font-bold dark:text-white text-sm border-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowOldPassword(!showOldPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 p-2 hover:text-blue-500 transition-colors"
                  >
                    {showOldPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88 3.59 3.59"/><path d="m21 21-6.41-6.41"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><path d="m3 3 18 18"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    placeholder="Min 6 characters" 
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 rounded-2xl font-bold dark:text-white text-sm border-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowNewPassword(!showNewPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 p-2 hover:text-blue-500 transition-colors"
                  >
                    {showNewPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88 3.59 3.59"/><path d="m21 21-6.41-6.41"/><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><path d="m3 3 18 18"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {pwError && (
                <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-900/20">
                  <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-wider">{pwError}</p>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button onClick={() => setIsChangingPassword(false)} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-[10px] font-black uppercase text-slate-500">Back</button>
                <button onClick={handleChangePassword} disabled={pwLoading} className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                  {pwLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;