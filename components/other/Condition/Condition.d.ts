import { ReactNode, FC } from 'react';
interface ConditionProps {
    children?: ReactNode;
    match: boolean | number | string;
}
declare const Condition: FC<ConditionProps>;
export default Condition;
