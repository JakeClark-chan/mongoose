/* eslint-disable @typescript-eslint/no-explicit-any */

import { RouteLocationRaw } from 'vue-router';
import { UploadedFile } from './UploadedFile';
import { Notification as AppNotification } from './Notification';

export type Locales = { [locale: string]: string };

export enum Method {
  post = 'post',
  patch = 'patch',
}

export enum DataFormat {
  json = 'json',
  formData = 'formData',
}

export interface Breadcrumb {
  icon?: string;
  to: RouteLocationRaw;
  label: string;
}

export interface DataTableQuery extends Record<string, any> {
  page?: number;
  sort?: string;
  search?: string;
  filter?: Record<string, any>;
}

export type OptionValue = string | number | null;

export type Option = Record<string, any>;

export type NormalizedOption = {
  option: Option;
  value: OptionValue;
  label: string;
};

export type MediaLibraryPayload = {
  to_remove: string[];
  to_add: UploadedFile[];
};

export interface PaginationMetadata {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
}

export interface CollectionItem {
  [key: string]: any;
}

export type Collection = CollectionItem[];

export interface ResourceCollection {
  meta: PaginationMetadata;
  data: Collection;
}

export interface PaginatedCollection extends PaginationMetadata {
  data: Collection;
}

export interface MenuItemInterface {
  label?: string;
  icon?: string;
  action?: () => Promise<void> | void;
  to?: RouteLocationRaw;
  href?: string;
  line?: boolean;
  count?: number;
  color?: 'dark' | 'light' | 'danger' | 'success' | 'warning';
}

export interface ActionItem {
  label: string;
  href?: string;
  to?: RouteLocationRaw;
  action?: () => Promise<void> | void;
  icon?: string;
  count?: number;
  meta?: Record<string, any>;
  actions?: ActionItem[];
}

export interface ActionSection {
  title: string;
  actions: ActionItem[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any>;

export interface BaseTableColumn {
  id: string;
  label: string;
  field: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: undefined | Record<string, any>;
  newKey: number;
  numeric: boolean;
  position: 'left' | 'right';
  searchable: boolean;
  sortable: boolean;
  visible: boolean;
  clickable: boolean;
  toggle: boolean;
  optional: boolean;
  width: number;
  style: {
    width: undefined | number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thAttrs: (column: BaseTableColumn) => Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tdAttrs: (row: Row, column: BaseTableColumn) => Record<string, any>;
}

/**
 * System alert
 */

export interface SystemAlertOptions {
  color?: 'info' | 'success' | 'danger' | 'warning';
  message: string;
  to?: RouteLocationRaw;
  action?: () => void;
  closable?: boolean;
}

export interface SystemAlert {
  id: number;
  color: 'info' | 'success' | 'danger' | 'warning';
  message: string;
  to?: RouteLocationRaw;
  action?: () => void;
  closable: boolean;
}

/**
 * Dialog
 */

export interface DialogOptions {
  color?: 'info' | 'success' | 'danger' | 'warning';
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  closeOnOutsideClick?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface Dialog {
  id: number;
  color: 'info' | 'success' | 'danger' | 'warning';
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  closeOnOutsideClick: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Notification
 */

export interface NotificationOptions {
  title: string;
  text: string;
  color?: 'info' | 'success' | 'danger' | 'warning';
  duration?: number;
}

export interface Notification {
  id: number;
  title: string;
  text: string;
  color: 'info' | 'success' | 'danger' | 'warning';
  duration: number;
}

/**
 * App Notification
 */

export interface NotificationsConfig {
  items: AppNotification[];
  footerLabel?: string;
  footerTo?: RouteLocationRaw;
}

export interface SelectConfigurationOption {
  value: OptionValue;
  label: string;
  [key: string]: any;
}

export interface SelectConfiguration {
  option?: SelectConfigurationOption;
  options: SelectConfigurationOption[];
  onChange?: (option: SelectConfigurationOption | null) => void;
}
