import React from 'react';
import { useContext } from 'react';
import { NotificationContext } from './NotificationProvider';
import { Notification } from './useNotification';
import styled from 'styled-components';

const NotificationContainer = styled.div`
    position: fixed;
    bottom: 0;
    right: 20px;
    width: 20vw;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    z-index: 9999;
`;

const StyledNotification = styled.div<{ type: string }>`
    width: 20vw;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    color: white;
    background-color: ${props => props.type === 'success' ? 'green' : 'red'};
`;

const Notifications: React.FC = () => {
    const { notifications } = useContext(NotificationContext);

    return (
        <NotificationContainer>
            {notifications.map((notification: Notification) => (
                <StyledNotification key={notification.id} type={notification.type}>
                    {notification.message}
                </StyledNotification>
            ))}
        </NotificationContainer>
    );
};

export default Notifications;