import React, { createContext, useState } from 'react';
import { Notification } from './useNotification';

export const NotificationContext = createContext<any>(null);

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = (id: string) => {
        setNotifications(notifications.filter((notification: Notification) => notification.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
