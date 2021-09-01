import React from 'react';
import Notification from 'rc-notification';

import './Notification.scss';

let notification;

Notification.newInstance({ style: { top: 65 } }, (n) => (notification = n));

const showNotification = (color, title, message) => {
    const notificationProps = {
        content: <BasicNotification color={color} title={title} message={message} />,
        closable: true,
        duration: 5,
        style: { top: 0, left: 'calc(100vw - 100%' },
        className: 'right-up'
    };
    notification.notice(notificationProps);
};

const BasicNotification = ({ color, title, message }) => (
    <div className={`notification notification--${color}`}>
        <h5 className="notification__title">{title}</h5>
        <p className="notification__message">{message}</p>
    </div>
);

export { BasicNotification, showNotification };
