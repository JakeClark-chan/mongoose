import { ComponentProps, FC, RefCallback } from 'react';
type TabProps = ComponentProps<'div'> & {
    index?: number;
    parentId?: string;
    selected?: boolean;
    focused?: boolean;
    refCallback?: RefCallback<HTMLElement>;
};
declare const Tab: FC<TabProps>;
export default Tab;
//# sourceMappingURL=tab.d.ts.map