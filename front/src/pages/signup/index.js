import { Container, Row, Form, Button} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { message } from 'antd';
import {useState} from "react";
import {register} from "./service";
function Signup() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer'
    });
    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            try {
                await register(user);
                message.success("Register successfully!");
                navigate("/signin");
            } catch (err) {
                console.log(err);
            }
        }
        setValidated(true);
    };


    return (
        <Container fluid>
            <Row className="d-flex justify-content-center flex-column align-items-center mt-5 w-25 m-auto" >
                <h1 className="text-center mt-5">Sign Up</h1>
                <p className="text-end">
                    <span>Has account?</span>
                    <Link to={"/signin"}>Login</Link>
                </p>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={user.username}
                            placeholder="Enter username"
                            onChange={e => setUser({...user, username: e.target.value})}/>
                        <Form.Control.Feedback type="invalid">
                            Please enter your username.
                        </Form.Control.Feedback>
                    </Form.Group>

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

                    <Form.Group className="mb-3" controlId="formBasicRole">
                        <Form.Label>Role</Form.Label>
                        <div className="d-flex">
                            <Form.Check
                                className="me-4"
                                checked={user.role === 'buyer'}
                                id={"role1"}
                                type="radio"
                                label={"I am Buyer"}
                                onChange={e => setUser({...user, role: 'buyer'})}/>
                            <Form.Check
                                type="radio"
                                checked={user.role === 'seller'}
                                id={"role2"}
                                label={"I am Seller"}
                                onChange={e => setUser({...user, role: 'seller'})}/>
                        </div>

                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}

export default Signup;