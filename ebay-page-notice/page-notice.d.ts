import { ComponentProps, FC, KeyboardEventHandler, MouseEventHandler } from 'react';
export type PageNoticeStatus = 'general' | 'attention' | 'confirmation' | 'information';
export type Props = ComponentProps<'section'> & {
    status?: PageNoticeStatus;
    'aria-label'?: string;
    a11yDismissText?: string;
    onDismiss?: MouseEventHandler & KeyboardEventHandler;
};
declare const EbayPageNotice: FC<Props>;
export default EbayPageNotice;
//# sourceMappingURL=page-notice.d.ts.map