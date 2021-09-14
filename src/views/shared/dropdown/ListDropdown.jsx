import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ListDropdown = ({
    text, btnColor, defaultItemText, list, onItemSelectHandler, disabled
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div style={{ display: 'flex', columnGap: '10px', alignItems: 'baseline' }}>
            <p>{text}</p>
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
        </div>
    );
}

ListDropdown.defaultProps = {
    text: '',
    btnColor: 'info',
    defaultItemText: 'Select',
    list: [],
    onItemSelectHandler: () => { },
    disabled: false,
}

export default ListDropdown;