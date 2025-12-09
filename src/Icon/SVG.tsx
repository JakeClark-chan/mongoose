import React, { CSSProperties, useEffect, useState } from "react";

import { assetsAPI } from '../api/assets';

import { SVGProps } from "./types";

import { SvgWeb } from "./styles";

const SVG = ({
  isWeb = false,
  name,
  size,
  color,
  width,
  height,
  style,
}: SVGProps) => {
  const compProps = {
    width: width || size,
    height: height || size,
    fill: color || undefined,
    stroke: color || undefined,
    style: style as CSSProperties,
  };

  const [icon, setIcon] = useState("");

  const fetchIcon = async () => {
    try {
      const data = await assetsAPI.get(`/icons/${name}.svg`);;
      setIcon(data.data);
    } catch (error) {
      console.error("error", JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchIcon();
  }, []); 

  const SVGIcon =
    // @ts-ignore
    icon;

  if (isWeb) {
    return <SvgWeb color={color} dangerouslySetInnerHTML={{ __html: icon }} />
  }

  // @ts-ignore
  return <SVGIcon {...compProps} />;
};

export default SVG;
