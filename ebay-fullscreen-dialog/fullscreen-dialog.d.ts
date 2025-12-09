import { FC } from 'react';
import { DialogBaseProps } from '../ebay-dialog-base';
export interface Props<T = any> extends DialogBaseProps<T> {
    open?: boolean;
    onClose?: () => void;
}
declare const EbayFullscreenDialog: FC<Props>;
export default EbayFullscreenDialog;
//# sourceMappingURL=fullscreen-dialog.d.ts.map