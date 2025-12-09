import { FC } from 'react';
import { DialogBaseProps } from '../ebay-dialog-base';
type Mode = 'default' | 'mini';
type Size = 'wide' | 'narrow';
export type Props<T = any> = Omit<DialogBaseProps<T>, 'size'> & {
    open?: boolean;
    mode?: Mode;
    size?: Size;
    onClose?: () => void;
};
declare const EbayLightboxDialog: FC<Props>;
export default EbayLightboxDialog;
//# sourceMappingURL=lightbox-dialog.d.ts.map