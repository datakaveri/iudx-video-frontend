import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import environment from 'environment';
import FormContainer from '../../shared/form-container/FormContainer';
import { connect } from 'react-redux';
import NavBar from '../../shared/nav-bar/NavBar';
import axios from 'axios';

const RegisterScreen = (props) => {
    // const { dispatch } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setVariant('danger');
            setMessage('Passwords do not match');
        } else {
            //dispatch(AuthAction.registerUser({ name, email, password }));
            const data = {
                name,
                email,
                password,
                role,
            };
            const headers = {
                'Content-Type': 'application/json',
            };
            try {
                let response = await axios.post(`${environment.api.server}/api/auth/signup`, data, { headers });
                setVariant('success');
                setMessage(response.data);
            } catch (error) {
                if (error.response) {
                    setVariant('danger');
                    setMessage(error.response.data);
                }
            }
        }
    };

    return (
        <div>
            <NavBar logout={false} />
            <FormContainer>
                <h1>Create Account</h1>
                {message && <Alert variant={variant}>{message}</Alert>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="lms-admin">LMS Admin</option>
                            <option value="provider">Provider</option>
                            <option value="consumer">Consumer</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Register
                    </Button>
                </Form>

                <Row className="py-3">
                    <Col>
                        Have an Account? <Link to={'/login'}>Login</Link>
                    </Col>
                </Row>
            </FormContainer>
        </div>
    );
};

export default connect()(RegisterScreen);
