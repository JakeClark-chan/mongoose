import { FC, ComponentProps } from 'react';
import { EbayChangeEventHandler } from '../common/event-utils/types';
type Props = Omit<ComponentProps<'input'>, 'onChange'> & {
    onChange?: EbayChangeEventHandler<HTMLInputElement, {
        value: string | number;
        checked: boolean;
    }>;
};
declare const EbaySwitch: FC<Props>;
export default EbaySwitch;
//# sourceMappingURL=ebay-switch.d.ts.map