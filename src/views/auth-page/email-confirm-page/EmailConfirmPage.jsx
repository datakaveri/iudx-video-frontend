import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../shared/nav-bar/NavBar';

const EmailConfirmPage = (props) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const verifyUser = async (code) => {
            try {
                let response = await axios.get('/confirm/' + code);
                setMessage(response.data);
            } catch (error) {
                if (error.response) {
                    setError(true);
                    setMessage(error.response.data);
                }
            }
        };

        if (props.match.path === '/confirm/:confirmationCode') {
            verifyUser(props.match.params.confirmationCode);
        }
    }, [props]);

    return (
        <div>
            <NavBar logout={false} />
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{message}</strong>
                    </h3>
                </header>
                {!error ? <Link to={'/login'}>Click here to Login</Link> : <Link to={'/register'}>Click here to Register</Link>}
            </div>
        </div>
    );
};

export default EmailConfirmPage;
