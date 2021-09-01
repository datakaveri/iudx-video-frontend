import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

const ActionIconButton = ({ btnText, btnAfterText, onClickHandler, actionType }) => {
    const [action, setAction] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const onClick = () => {
        setAction(true);
        onClickHandler(() => {
            if (isSubscribed) {
                setAction(false);
            }
        });
    };

    const getIcon = () => {
        switch (actionType) {
            case 'loading':
                return 'fa-refresh fa-spin';
            case 'copy':
                return 'fa-check';

            default:
                return '';
        }
    };

    // memory leak fix
    useEffect(() => {
        setIsSubscribed(true);
        return () => setIsSubscribed(false);
    }, []);
    return (
        <Button color="info" onClick={onClick} disabled={action}>
            {action && <i className={`fa ${getIcon()}`} style={{ marginRight: '5px' }} />}
            {action && <span>{btnAfterText}</span>}
            {!action && <span>{btnText}</span>}
        </Button>
    );
};

export default ActionIconButton;
