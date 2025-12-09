export declare function useFetchApi<T>(url?: RequestInfo, init?: RequestInit): {
    response: Response | undefined;
    data: T | undefined;
    run: (newUrl?: RequestInfo, newInit?: RequestInit) => Promise<T | undefined>;
    hasData: boolean;
    isFetching: boolean;
    fetchCount: number;
    error: any;
};
