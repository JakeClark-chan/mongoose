import { FC } from 'react';
import { IconProps } from '../Icon';
interface CircleProps extends IconProps {
    checked: boolean;
}
declare const RadioCheck: FC<CircleProps>;
export default RadioCheck;
