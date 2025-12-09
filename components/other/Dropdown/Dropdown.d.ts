import { FC } from 'react';
import Button from './Button';
import Menu, { MenuItem } from './Menu';
import { DropdownProps } from './types';
import './Dropdown.scss';
interface DropdownInterface extends FC<DropdownProps> {
    Button: typeof Button;
    Item: typeof MenuItem;
    Menu: typeof Menu;
}
declare const Dropdown: DropdownInterface;
export default Dropdown;
