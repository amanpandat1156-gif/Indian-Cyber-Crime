import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCheck, AlertCircle, FileText, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Notification } from '../../types';
import { notificationService } from '../../services/notificationService';

export const NotificationDrawer: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }
    const loadNotifs = async () => {
      const res = await notificationService.getNotifications(user.id);
      if (res.success && res.data) {
        setNotifications(res.data);
      }
    };
    loadNotifs();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = async () => {
    if (!user) return;
    await notificationService.markAllAsRead(user.id);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkSingleRead = async (id: string) => {
    await notificationService.markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-1.5 rounded-md text-[#4A5560] hover:text-[#12304A] hover:bg-[#F3F6F8] transition-colors focus-visible:outline-none"
        aria-label="Open notifications"
      >
        <Bell className="w-4.5 h-4.5 stroke-[2]" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#B33A3A] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-28px)] sm:w-96 max-h-[80vh] bg-white rounded-[10px] border border-[#DDE2E4] shadow-2xl z-50 overflow-hidden animate-in fade-in duration-150">
          {/* Header */}
          <div className="p-3.5 bg-[#F8F7F3] border-b border-[#DDE2E4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#12304A] uppercase tracking-wider">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.2 bg-[#B33A3A] text-white text-[10px] font-bold rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] text-[#12304A] hover:underline font-medium flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[#F0F2F3]">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#5E6B73]">
                No notifications for this account yet.
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3.5 text-xs transition-colors hover:bg-[#F9FAFB] flex items-start justify-between gap-3 ${
                    !notif.read ? 'bg-[#EDF3F7]/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">
                      {notif.type === 'ACTION_REQUIRED' ? (
                        <AlertCircle className="w-4 h-4 text-[#B7791F]" />
                      ) : notif.type === 'EVIDENCE_CONFIRMED' ? (
                        <Check className="w-4 h-4 text-[#237A57]" />
                      ) : (
                        <FileText className="w-4 h-4 text-[#12304A]" />
                      )}
                    </div>

                    <div>
                      <div className="font-semibold text-[#1C252C] leading-snug">
                        {notif.title}
                      </div>
                      <p className="mt-0.5 text-[#5E6B73] leading-relaxed">
                        {notif.message}
                      </p>

                      {notif.complaintNumber && (
                        <div className="mt-1.5">
                          <Link
                            to={`/track?number=${notif.complaintNumber}`}
                            onClick={() => {
                              handleMarkSingleRead(notif.id);
                              setIsOpen(false);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#12304A] hover:underline"
                          >
                            <span>View Case Timeline</span>
                            <span className="font-mono text-[10px]">({notif.complaintNumber}) &rarr;</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  {!notif.read && (
                    <button
                      type="button"
                      onClick={() => handleMarkSingleRead(notif.id)}
                      className="p-1 text-[#5E6B73] hover:text-[#12304A]"
                      title="Mark as read"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#1D60A1] inline-block"></span>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
