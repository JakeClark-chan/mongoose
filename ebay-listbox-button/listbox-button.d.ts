import { ComponentProps, FC } from 'react';
import { EbayChangeEventHandler } from '../common/event-utils/types';
export type ChangeEventProps = {
    index: number;
    selected: string[];
    wasClicked: boolean;
};
export type EbayListboxButtonProps = Omit<ComponentProps<'input'>, 'onChange'> & {
    selected?: number;
    borderless?: boolean;
    fluid?: boolean;
    maxHeight?: string;
    prefixId?: string;
    prefixLabel?: string;
    floatingLabel?: string;
    unselectedText?: string;
    onChange?: EbayChangeEventHandler<HTMLButtonElement, ChangeEventProps>;
    onCollapse?: () => void;
    onExpand?: () => void;
};
declare const ListboxButton: FC<EbayListboxButtonProps>;
export default ListboxButton;
//# sourceMappingURL=listbox-button.d.ts.map