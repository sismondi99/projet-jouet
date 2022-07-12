import { Container, Row, Form, Button} from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom';
import {useState} from "react";

import {message} from "antd";
import {login as requestLogin} from "./service";
import useAuth from'../../auth'
function Signin() {
    const {login} = useAuth();

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            try {
                const res = await requestLogin(user);
                const data = res.data;
                const token = data.token;
                const role = data.role;
                login().then(() => {
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role);
                    message.success("Welcome!");
                    if (role === 'buyer') {
                        navigate("/");
                    } else if (role === 'seller') {
                        navigate("/seller");
                    }

                })
            } catch (err) {
                console.log(err);
            }
        }
        setValidated(true);
    };
    return (
        <Container fluid>
            <Row className="d-flex justify-content-center flex-column align-items-center mt-5 w-25 m-auto" >
                <h1 className="text-center mt-5">Sign In</h1>
                <p className="text-end">
                    <span>Not has account?</span>
                    <Link to={"/signup"}>Register</Link>
                </p>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            value={user.email}
                            placeholder="Enter email"
                            onChange={e => setUser({...user, email: e.target.value})}/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a normal email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            value={user.password}
                            placeholder="Password"
                            onChange={e => setUser({...user, password: e.target.value})}/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Signin;