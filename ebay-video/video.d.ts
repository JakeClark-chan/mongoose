import { ComponentProps, FC, MouseEvent } from 'react';
import { Player, VideoAction, VideoPlayView } from './types';
import { EbayEventHandler } from '../common/event-utils/types';
export type PlayEventProps = {
    player: Player;
};
export type VolumeChangeProps = {
    volume: number;
    muted: boolean;
};
export type EbayVideoProps = Omit<ComponentProps<'video'>, 'onPlay' | 'onVolumeChange'> & {
    width?: number;
    height?: number;
    thumbnail?: string;
    action?: VideoAction;
    volume?: number;
    muted?: boolean;
    volumeSlider?: boolean;
    hideReportButton?: boolean;
    playView?: VideoPlayView;
    cdnUrl?: string;
    cssUrl?: string;
    cdnVersion?: string;
    a11yLoadText: string;
    a11yPlayText: string;
    errorText: string;
    reportText?: string;
    onLoadError?: (err: Error) => void;
    onPlay?: EbayEventHandler<HTMLVideoElement, PlayEventProps>;
    onVolumeChange?: EbayEventHandler<HTMLVideoElement, VolumeChangeProps>;
    onReport?: (event?: MouseEvent<HTMLButtonElement>) => void;
};
declare const EbayVideo: FC<EbayVideoProps>;
export default EbayVideo;
//# sourceMappingURL=video.d.ts.map