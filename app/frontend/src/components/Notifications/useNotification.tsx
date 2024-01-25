import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NotificationContext } from './NotificationProvider';

export type Notification = {
    title: string;
    message: string;
    type: string;
    id: string;
}

export const useNotification = () => {
    const { setNotifications } = useContext(NotificationContext);

    const addNotification = (title: string, message: string, type: string) => {
        const id = uuidv4();

        setNotifications((prevNotifications: Notification[])  => [...prevNotifications, { title, message, type, id }]);

        setTimeout(() => {
            setNotifications((prevNotifications: Notification[]) => prevNotifications.filter(
                (notification: Notification) => notification.id !== id
            ));
        }, 3000);
    };

    return addNotification;
};