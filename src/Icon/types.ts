import { CSSProperties } from "react";

export type SVGProps = {
  isWeb?: boolean;
  name: string;
  size?: number;
  color?: string;
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
};
