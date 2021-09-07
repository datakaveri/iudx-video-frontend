import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ListDropdown = ({
    btnColor, defaultItemText, list, onItemSelectHandler, disabled
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
            <DropdownToggle caret color={btnColor} disabled={disabled}>
                {defaultItemText}
            </DropdownToggle>
            <DropdownMenu>
                {
                    Array.isArray(list) && list.map((value, i) => (
                        <DropdownItem key={i} onClick={() => onItemSelectHandler(value)}>{value}</DropdownItem>
                    ))
                }
            </DropdownMenu>
        </Dropdown>
    );
}

ListDropdown.defaultProps = {
    btnColor: 'info',
    defaultItemText: 'Select',
    list: [],
    onItemSelectHandler: () => { },
    disabled: false,
}

export default ListDropdown;