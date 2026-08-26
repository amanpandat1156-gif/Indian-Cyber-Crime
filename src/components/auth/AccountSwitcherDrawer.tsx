import React, { useState } from 'react';
import { Users, Check, X, ChevronUp, ChevronDown, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDemo, DEMO_PERSONAS } from '../../context/DemoContext';

export const AccountSwitcherDrawer: React.FC = () => {
  const { user, logout } = useAuth();
  const { switchToPersona, resetDatabase } = useDemo();
  const [isOpen, setIsOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    if (confirm('Reset mock database to initial hackathon test cases & clean state?')) {
      setResetting(true);
      await resetDatabase();
      setResetting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 backdrop-blur-sm text-slate-200 text-xs font-semibold shadow-2xl border border-slate-700 hover:bg-slate-800 transition-all group"
        title="Hackathon Quick-Switch: Change Demo Persona"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400"></span>
        </span>
        <Users className="w-3.5 h-3.5 text-sky-400" />
        <span className="hidden sm:inline text-slate-300 font-normal">Demo Persona:</span>
        <span className="font-bold text-sky-400 max-w-[130px] truncate">
          {user ? user.name.split(' ')[0] : 'Logged Out'}
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 text-slate-400" />}
      </button>

      {/* Expanded Quick-Switch Drawer Menu */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-[calc(100vw-32px)] sm:w-96 max-h-[80vh] overflow-y-auto bg-white rounded-[12px] border border-[#DDE2E4] shadow-2xl p-3.5 sm:p-4 text-xs animate-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0F2F3]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#EA580C]" />
              <div>
                <div className="font-bold text-[#12304A] text-xs">
                  Hackathon Judge Personas
                </div>
                <div className="text-[10px] text-[#5E6B73]">
                  Instant 1-Click Evaluation Accounts
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#5E6B73] hover:text-[#12304A] rounded-md hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 mb-3">
            {DEMO_PERSONAS.map((persona) => {
              const isCurrent = user?.id === persona.id;
              return (
                <div
                  key={persona.id}
                  className={`p-3 rounded-[8px] border transition-all ${
                    isCurrent
                      ? 'bg-[#EDF3F7] border-[#12304A] shadow-xs'
                      : 'bg-[#FBFBFA] border-[#E5E9EB] hover:bg-white hover:border-[#CCD3D6]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-[#12304A]">{persona.name}</span>
                        <span
                          className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                            persona.id === 'usr_priya_01'
                              ? 'bg-amber-100 text-amber-800'
                              : persona.id === 'usr_rahul_02'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {persona.badge}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium text-[#2C3840] mb-1">
                        {persona.role}
                      </div>
                      <div className="text-[10px] text-[#5E6B73] leading-relaxed">
                        {persona.subtitle}
                      </div>
                    </div>
                    {isCurrent && <Check className="w-4 h-4 text-[#12304A] shrink-0 mt-1" />}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#E5E9EB] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        await switchToPersona(persona.id, false);
                        setIsOpen(false);
                      }}
                      className="px-2.5 py-1 rounded bg-white border border-[#CCD3D6] text-[11px] font-semibold text-[#12304A] hover:bg-[#EDF3F7] transition-colors"
                    >
                      {isCurrent ? 'Active Account' : 'Switch Account'}
                    </button>

                    {persona.complaintNumber && (
                      <button
                        type="button"
                        onClick={async () => {
                          await switchToPersona(persona.id, true);
                          setIsOpen(false);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1D60A1] hover:underline"
                      >
                        <span>View Tracking</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2.5 border-t border-[#F0F2F3] flex items-center justify-between">
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
              <span className="text-[11px] text-[#5E6B73]">Select persona above to log in</span>
            )}

            <button
              type="button"
              onClick={handleReset}
              disabled={resetting}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-semibold text-[#5E6B73] hover:text-[#12304A] hover:bg-slate-100 transition-colors"
              title="Reset mock database to initial hackathon state"
            >
              <RotateCcw className={`w-3 h-3 ${resetting ? 'animate-spin' : ''}`} />
              <span>{resetting ? 'Resetting...' : 'Reset Mock DB'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
