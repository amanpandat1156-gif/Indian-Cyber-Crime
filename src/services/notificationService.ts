/**
 * NCRP Notifications Service
 */

import { Notification } from '../types';
import { mockDb } from './mockDb';
import { simulatedApiCall, ApiResponse } from './mockApi';

class NotificationService {
  async getNotifications(userId: string): Promise<ApiResponse<Notification[]>> {
    return simulatedApiCall(() => {
      return mockDb.getNotificationsByUserId(userId);
    }, 200, 400);
  }

  async markAsRead(notificationId: string): Promise<ApiResponse<boolean>> {
    return simulatedApiCall(() => {
      const notifs = mockDb.getNotifications();
      const target = notifs.find((n) => n.id === notificationId);
      if (target) {
        target.read = true;
        mockDb.updateNotification(target);
      }
      return true;
    }, 100, 200);
  }

  async markAllAsRead(userId: string): Promise<ApiResponse<boolean>> {
    return simulatedApiCall(() => {
      const notifs = mockDb.getNotifications();
      notifs.forEach((n) => {
        if (n.userId === userId) {
          n.read = true;
          mockDb.updateNotification(n);
        }
      });
      return true;
    }, 150, 250);
  }
}

export const notificationService = new NotificationService();
