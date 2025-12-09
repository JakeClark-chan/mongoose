import { FC, ReactNode } from 'react';
export type NoticeContentProps = {
    type: 'inline' | 'section' | 'page';
    className?: string;
    children?: ReactNode;
};
declare const NoticeContent: FC<NoticeContentProps>;
export default NoticeContent;
//# sourceMappingURL=notice-content.d.ts.map