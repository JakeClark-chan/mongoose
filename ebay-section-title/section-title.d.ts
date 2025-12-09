import { FC, HTMLProps, ReactNode } from 'react';
export type EbaySectionTitleProps = Omit<HTMLProps<HTMLDivElement>, 'title'> & {
    href?: string;
    ctaText?: ReactNode;
};
declare const EbaySectionTitle: FC<EbaySectionTitleProps>;
export default EbaySectionTitle;
//# sourceMappingURL=section-title.d.ts.map