import React from 'react';
import { ToastOptions } from 'react-toastify';
import { MessageStatusType, MessageProps } from './types';
import './Notification.scss';
export declare const notify: (text: string, status: MessageStatusType, buttons?: Pick<MessageProps, "confirmText" | "onConfirmClick" | "cancelText"> | undefined, options?: ToastOptions) => void;
export declare const NotificationContainer: React.FC<import("react-toastify").ToastContainerProps>;
