'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationCenter() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.accessToken) {
      fetchNotifications();
      fetchUnreadCount();
      const interval = setInterval(() => {
        fetchUnreadCount();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const fetchNotifications = async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    if (!session?.accessToken) return;
    try {
      const response = await axios.get(`${API_URL}/notifications/unread/count`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      setUnreadCount(response.data.count || 0);
    } catch (error) {
      console.error('Failed to fetch unread count:', error);
    }
  };

  const markAsRead = async (id: number) => {
    if (!session?.accessToken) return;
    try {
      await axios.post(
        `${API_URL}/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
        }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!session?.accessToken) return;
    try {
      await axios.post(
        `${API_URL}/notifications/read-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
        }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  if (!session) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-96 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl z-50 max-h-[500px] overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-teal-400 hover:text-teal-300"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="overflow-y-auto flex-1">
              {loading ? (
                <div className="p-8 text-center text-neutral-400">Loading...</div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-neutral-400">No notifications</div>
              ) : (
                <div className="divide-y divide-white/10">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-teal-500/10' : ''
                      }`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-teal-400 rounded-full mt-2"></div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-white text-sm mb-1">
                            {notification.title}
                          </div>
                          <div className="text-xs text-neutral-400">
                            {notification.message}
                          </div>
                          <div className="text-xs text-neutral-500 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

