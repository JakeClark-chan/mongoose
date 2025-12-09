import { ComponentProps, FC } from 'react';
import { EbayKeyboardEventHandler, EbayMouseEventHandler } from '../common/event-utils/types';
type SpanProps = Omit<ComponentProps<'div'>, 'onKeyDown' | 'onSelect'>;
type Props = SpanProps & {
    itemMatchesUrl?: boolean;
    onKeyDown?: EbayKeyboardEventHandler<HTMLElement, {
        index: number;
    }>;
    onSelect?: EbayMouseEventHandler<HTMLAnchorElement, {
        index: number;
    }>;
};
declare const EbayFakeMenu: FC<Props>;
export default EbayFakeMenu;
//# sourceMappingURL=menu.d.ts.map