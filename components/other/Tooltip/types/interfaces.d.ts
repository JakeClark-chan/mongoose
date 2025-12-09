import type { TooltipProps as TooltipPropsBase } from 'react-tooltip';
import { TooltipTheme, OverlayType, TooltipEventType } from './types';
export declare enum TooltipStateEnum {
    DARK = "dark",
    LIGHT = "light"
}
export interface TooltipProps extends TooltipPropsBase {
    eventType?: TooltipEventType;
    isTooltip?: boolean;
    overlay?: OverlayType;
    theme?: TooltipTheme;
}
