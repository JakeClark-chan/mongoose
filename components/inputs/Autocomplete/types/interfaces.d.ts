import { InputHTMLAttributes, FC, ReactNode } from 'react';
import { FieldSize } from '../../Field/types';
export interface AutocompleteProps {
    adviceMsg?: string;
    autoFocus?: boolean;
    className?: string;
    errorMsg?: string;
    fieldSize?: FieldSize;
    getSuggestionValue?: (suggestion: SelectOption | any) => any;
    icon?: ReactNode;
    inputProps: InputHTMLAttributes<HTMLInputElement>;
    isRequired?: boolean;
    label?: string;
    onSuggestionSelected: (event: any, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }: {
        suggestion: any;
        suggestionValue: any;
        suggestionIndex: any;
        sectionIndex: any;
        method: any;
    }) => void | Promise<void>;
    onSuggestionsClearRequested: () => void | Promise<void>;
    onSuggestionsFetchRequested: (reason: any) => void | Promise<void>;
    renderSuggestion?: FC<SelectOption | any>;
    suggestions: SelectOption[] | any[];
}
export interface SelectOption {
    label: string;
    value: any;
}
