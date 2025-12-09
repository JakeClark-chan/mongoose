import { ChipSize } from '../../Chips/types/interfaces';
import { Size } from './types';
export interface TabProps {
    centerOnSelectedTab?: boolean;
    chipsSize?: ChipSize;
    className?: string;
    description?: string;
    id: string;
    isActive?: boolean;
    isChips?: boolean;
    isDisabled?: boolean;
    isMerged?: boolean;
    isOutline?: boolean;
    onClick?: (id: string, evt: any) => void;
    size?: Size;
    title: string;
}
export interface TabsProps {
    centerOnSelectedTab?: boolean;
    chipsSize?: ChipSize;
    className?: string;
    fullControlChange?: boolean;
    gradientShrink?: number;
    isChips?: boolean;
    isDestructive?: boolean;
    isGradientNeeded?: boolean;
    isMerged?: boolean;
    isOutline?: boolean;
    isUseSubtitle?: boolean;
    onChange?: (id: string, evt: any) => any;
    selectedTabId?: string;
    viewportWidth?: number;
}
