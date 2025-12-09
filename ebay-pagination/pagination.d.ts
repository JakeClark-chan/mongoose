import { ComponentProps, FC } from 'react';
import { PaginationVariant } from './types';
import { EbayEventHandler } from '../common/event-utils/types';
export type PaginationProps = Omit<ComponentProps<'nav'>, 'onSelect'> & {
    id?: string;
    a11yPreviousText?: string;
    a11yNextText?: string;
    a11yCurrentText?: string;
    onPrevious?: EbayEventHandler;
    onNext?: EbayEventHandler;
    onSelect?: EbayEventHandler<{
        value: string;
        index: number;
    }>;
    variant?: PaginationVariant;
    fluid?: boolean;
};
declare const EbayPagination: FC<PaginationProps>;
export default EbayPagination;
//# sourceMappingURL=pagination.d.ts.map