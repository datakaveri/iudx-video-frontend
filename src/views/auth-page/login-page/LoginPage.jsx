import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../../shared/form-container/FormContainer';
import { connect } from 'react-redux';
import NavBar from '../../shared/nav-bar/NavBar';
import axios from 'axios';

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.authReducer.token,
    };
};

const Login = (props) => {
    const { history } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        //dispatch(AuthAction.loginUser({ email, password, withCredentials: true }));
        const data = {
            email,
            password,
            withCredentials: true,
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            await axios.post('/login', data, { headers });
            history.push('/');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data);
            }
        }
    };

    return (
        <div>
            <NavBar logout={false} />
            <FormContainer>
                <h1>IUDX Admin Login</h1>
                {message && <Alert variant="danger">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Sign In
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New User? <Link to={'/register'}>Register</Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    );
};

export default connect(mapStateToProps)(Login);
