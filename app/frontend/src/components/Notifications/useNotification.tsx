import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NotificationContext } from './NotificationProvider';

export type Notification = {
    message: string;
    type: string;
    id: string;
}

export const useNotification = () => {
    const { notifications, setNotifications } = useContext(NotificationContext);

    const addNotification = (message: string, type: string) => {
        const id = uuidv4();

        setNotifications([...notifications, { message, type, id }]);

        setTimeout(() => {
            setNotifications(notifications.filter(
                (notification: Notification) => notification.id !== id
            ));
        }, 2000);
    };

    return addNotification;
};