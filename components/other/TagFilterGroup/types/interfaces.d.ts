export interface TagFilterGroupProps {
    className?: string;
    hideLabel?: string;
    id: string;
    isExpandedInit?: boolean;
    isOpenedInit?: boolean;
    isSearchVisible?: boolean;
    onSearchChange?: (value: string) => void;
    searchLabel?: string;
    showAllLabel?: string;
    title: string;
    toggleable?: boolean;
}
