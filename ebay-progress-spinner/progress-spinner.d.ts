import { ComponentProps, FC } from 'react';
export type SpinnerSize = 'default' | 'small' | 'large';
type EbayProgressSpinnerProps = {
    size?: SpinnerSize;
    'aria-label'?: string;
};
type SpanProps = Omit<ComponentProps<'span'>, 'size'>;
declare const EbayProgressSpinner: FC<SpanProps & EbayProgressSpinnerProps>;
export default EbayProgressSpinner;
//# sourceMappingURL=progress-spinner.d.ts.map