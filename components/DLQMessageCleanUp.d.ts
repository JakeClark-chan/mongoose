export interface Iprops {
    title: string;
    queues: string[];
    controllerBaseUrl: string;
    getDeleteDlqMsgUrl: (rowData: any) => string;
}
export declare function DLQMessageCleanUp(props: Iprops): import("react/jsx-runtime").JSX.Element;
