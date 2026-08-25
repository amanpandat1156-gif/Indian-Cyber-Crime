import React, { useState } from 'react';
import { Users, Check, X, ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockDb } from '../../services/mockDb';

export const AccountSwitcherDrawer: React.FC = () => {
  const { user, switchAccount, testAccounts, refreshUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    if (confirm('Reset mock database to initial seed data?')) {
      setResetting(true);
      mockDb.resetDatabase();
      await refreshUser();
      setResetting(false);
      window.location.reload();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0B2235] text-white text-xs font-semibold shadow-2xl border border-slate-700 hover:bg-[#12304A] transition-all"
        title="Switch Demo Test Account"
      >
        <Users className="w-3.5 h-3.5 text-[#FFAE42]" />
        <span className="hidden sm:inline">Demo User:</span>
        <span className="font-bold text-[#FFAE42] max-w-[120px] truncate">
          {user ? user.name.split(' ')[0] : 'Logged Out'}
        </span>
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </button>

      {/* Expanded Account Selection Menu */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-72 sm:w-80 bg-white rounded-[10px] border border-[#DDE2E4] shadow-2xl p-4 text-xs animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F0F2F3]">
            <div className="font-bold text-[#12304A] uppercase tracking-wider text-[11px]">
              Active Test Account (Stage 2)
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#5E6B73] hover:text-[#12304A]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 mb-3">
            {testAccounts.map((acc) => {
              const isCurrent = user?.id === acc.id;
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => {
                    switchAccount(acc.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-md text-left transition-colors ${
                    isCurrent
                      ? 'bg-[#EDF3F7] text-[#12304A] font-bold border border-[#12304A]/30'
                      : 'hover:bg-[#F8F9FA] text-[#1C252C] border border-transparent'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{acc.name}</div>
                    <div className="text-[10.5px] text-[#5E6B73]">
                      {acc.accountType === 'new' && 'Account A: New Citizen (0 Complaints)'}
                      {acc.accountType === 'active_complaint' && 'Account B: Active Case (Action Required)'}
                      {acc.accountType === 'resolved' && 'Account C: Resolved Complaint'}
                      {acc.accountType === 'multiple' && 'Account D: Multiple Complaints (3 Cases)'}
                    </div>
                  </div>
                  {isCurrent && <Check className="w-4 h-4 text-[#12304A]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#F0F2F3] flex items-center justify-between">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-[11px] text-[#8B2626] font-bold hover:underline"
              >
                Log Out
              </button>
            ) : (
              <span className="text-[11px] text-[#5E6B73]">Select account to log in</span>
            )}

            <button
              type="button"
              onClick={handleReset}
              disabled={resetting}
              className="inline-flex items-center gap-1 text-[11px] text-[#5E6B73] hover:text-[#12304A]"
              title="Reset mock database to initial state"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Mock DB</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
