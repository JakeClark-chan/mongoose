/// <reference types="react" />
import ReactModal from 'react-modal';
import { ContentVerticalAlign } from './types';
export interface ModalProps extends Omit<ReactModal.Props, 'isOpen'> {
    closeBtnText?: string;
    contentVerticalAlign?: ContentVerticalAlign;
    iconLeft?: JSX.Element;
    isBodyScrollAllowed?: boolean;
    isMobilePage?: boolean;
    isOpen: boolean;
    isShowCloseBtn?: boolean;
    isTextClose?: boolean;
    onClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
    overlayClassName?: string;
    title?: string;
    transitionDuration?: number;
    withGesture?: boolean;
}
