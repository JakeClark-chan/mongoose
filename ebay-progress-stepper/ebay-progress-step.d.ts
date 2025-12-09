import { FC, ReactNode } from 'react';
import { StepState } from './types';
export type EbayProgressStepProps = {
    state?: StepState;
    current?: boolean;
    className?: string;
    children?: ReactNode;
};
declare const EbayProgressStep: FC<EbayProgressStepProps>;
export default EbayProgressStep;
//# sourceMappingURL=ebay-progress-step.d.ts.map