import React, { createContext, useState } from 'react';

export const NotificationContext = createContext<any>(null);

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
