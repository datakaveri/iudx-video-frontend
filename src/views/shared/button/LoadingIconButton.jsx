import React, { useState } from 'react';
import { Button } from 'reactstrap';

const LoadingIconButton = ({ btnText, btnLoadingText, onClickHandler }) => {
    const [loading, setLoading] = useState(false);

    const onClick = () => {
        setLoading(true);
        onClickHandler(() => {
            setLoading(false);
        });
    };
    return (
        <Button color="info" onClick={onClick} disabled={loading}>
            {loading && <i className="fa fa-refresh fa-spin" style={{ marginRight: '5px' }} />}
            {loading && <span>{btnLoadingText}</span>}
            {!loading && <span>{btnText}</span>}
        </Button>
    );
};

export default LoadingIconButton;
