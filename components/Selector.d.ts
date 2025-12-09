export interface IOptions {
    value: any;
    label: string;
}
export interface ISelectorProps {
    default: IOptions;
    onValueChanged: (value: any) => any;
    label?: string;
    options: IOptions[];
    style: any;
}
export default function Selector(props: ISelectorProps): import("react/jsx-runtime").JSX.Element;
