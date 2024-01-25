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
    position: relative;
    width: 20vw;  // Increase the width
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    color: white;
    background-color: ${props => props.type === 'success' ? 'rgba(0, 128, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'};  // Make the background color more see-through
`;

const CloseButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    color: gray;
    font-size: 1em;
    padding: 4px;
    cursor: pointer;
`;

const Notifications: React.FC = () => {
    const { notifications, removeNotification } = useContext(NotificationContext);

    return (
        <NotificationContainer>
            {notifications.map((notification: Notification) => (
                <StyledNotification key={notification.id} type={notification.type}>
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <CloseButton onClick={() => removeNotification(notification.id)}>X</CloseButton>
                </StyledNotification>
            ))}
        </NotificationContainer>
    );
};

export default Notifications;