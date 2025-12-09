import { MessageStatusType } from './types';
export interface MessageProps {
    cancelText?: string;
    confirmText?: string;
    content: any;
    onConfirmClick?: () => void;
    status?: MessageStatusType;
}
