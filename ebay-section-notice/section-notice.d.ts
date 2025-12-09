import { ComponentProps, FC, KeyboardEventHandler, MouseEventHandler } from 'react';
import { Icon } from '../ebay-icon';
export type SectionNoticeStatus = 'general' | 'none' | 'attention' | 'confirmation' | 'information' | 'education';
export type Props = ComponentProps<'section'> & {
    status?: SectionNoticeStatus;
    'aria-label'?: string;
    'aria-roledescription'?: string;
    className?: string;
    a11yDismissText?: string;
    onDismiss?: MouseEventHandler & KeyboardEventHandler;
    educationIcon?: Icon;
    iconClass?: string;
    prominent?: boolean;
};
declare const EbaySectionNotice: FC<Props>;
export default EbaySectionNotice;
//# sourceMappingURL=section-notice.d.ts.map