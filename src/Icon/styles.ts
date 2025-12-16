import styled from "styled-components";

interface SvgWebProps {
  color: string | undefined;
};

export const SvgWeb = styled.div<SvgWebProps>`
  display: flex;
  align-items: center;

  ${(props: SvgWebProps) => !!props.color && `
    svg path {
      fill: ${props.color};
    }
  `}
`;