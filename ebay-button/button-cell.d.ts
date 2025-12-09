import { ComponentProps, FC } from 'react';
type ButtonType = 'cta' | 'fake' | 'expand' | 'default';
type Props = ComponentProps<'span'> & {
    type?: ButtonType;
};
declare const EbayButtonCell: FC<Props>;
export default EbayButtonCell;
//# sourceMappingURL=button-cell.d.ts.map