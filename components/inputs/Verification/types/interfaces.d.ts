import { MutableRefObject } from 'react';
export interface VerificationProps {
    error?: string;
    fieldsQuantity?: number;
    isUseAutofocus?: boolean;
    onChange: (value: string[], inputsRef?: MutableRefObject<(HTMLInputElement | null)[]>) => void;
    value: string[];
}
