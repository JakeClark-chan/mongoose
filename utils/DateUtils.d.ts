import { Column } from "@material-table/core";
export declare function dateToISOWithReducedPrecision(date: Date): string;
export declare function createDateColumn<RowData extends object>(label: string, dateAccess: string, defaultSort?: ('asc' | 'desc')): Column<RowData>;
export declare function dateStringToLocaleString(dateString: string): string;
