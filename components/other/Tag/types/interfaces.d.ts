export interface TagProps {
    className?: string;
    id: string;
    isActive: boolean;
    label?: string;
    onChange?: () => void;
    onDeleteClick?: (id: string) => void;
    optionWithCount?: {
        count: string;
        title: string;
    };
    text?: string;
    typeOfCloseBtn?: 'bold' | 'light' | 'fill' | 'color';
    value?: string;
    withCloseBtn?: boolean;
}
