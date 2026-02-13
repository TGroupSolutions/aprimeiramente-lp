import { useEffect, useState, useCallback } from 'react';

export interface Notification {
  id: string;
  type: 'lead' | 'email' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simular notificações em tempo real
  // Em produção, isso seria conectado a WebSocket ou Server-Sent Events
  useEffect(() => {
    // Recuperar notificações do localStorage
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed);
        const unread = parsed.filter((n: Notification) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Erro ao recuperar notificações:', error);
      }
    }
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);

    // Salvar no localStorage
    const allNotifications = [newNotification, ...notifications];
    localStorage.setItem('notifications', JSON.stringify(allNotifications));

    return newNotification;
  }, [notifications]);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('notifications');
  }, []);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    clearNotifications,
  };
}
