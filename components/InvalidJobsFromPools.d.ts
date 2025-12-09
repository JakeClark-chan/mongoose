import { IOptions } from './Selector';
export interface Iprops {
    getJobReportUrl: string;
    getActiveJobUrl: string;
    getCancelJobUrl: (job: any) => string | undefined;
    showFilters: boolean;
    title: string;
    showTimeFilter: boolean;
    showLocationFilter: boolean;
    timeFilterOptions: IOptions[];
    locationFilterOptions: IOptions[];
    defaultTimeFilterOption: IOptions;
    defaultlocationFilterOptions: IOptions;
}
export declare function InvalidJobsFromPools(props: Iprops): import("react/jsx-runtime").JSX.Element;
