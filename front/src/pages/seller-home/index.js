import {Container, Row, Col, Nav, Button} from "react-bootstrap";
import { Outlet, Link, useLocation } from 'react-router-dom'
import useAuth from "../../auth";

function SellerHome() {
    const {logout} = useAuth();
    const location = useLocation();
    const pathname = location.pathname;


    const handleLogout = () => {
        logout().then(() => {
            localStorage.setItem("token", "");
            window.location.reload();
        })
    }

    return <Container fluid>
        <Row >
            <Col lg={"11"}>
                <h1 className="mt-3">Seller Manage</h1>
            </Col>
            <Col lg={"1"} className="d-flex align-items-center justify-content-end">
                <Button variant="link" className="text-decoration-none" onClick={handleLogout}>Sign Out</Button>
            </Col>
        </Row>
        <hr/>
        <Row>
            <Col lg={"2"} >
                <Nav variant="pills" defaultActiveKey="/home" className="flex-column">
                    <Nav.Item>
                        <Link to={'/seller/goods-manage'}>
                            <Button className="w-100 text-start" variant={pathname === '/seller/goods-manage' ? 'dark' : 'light'}>Goods</Button>
                        </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to={'/seller/orders-manage'}>
                            <Button className="w-100 text-start mt-2" variant={pathname === '/seller/orders-manage' ? 'dark' : 'light'}>Orders</Button>
                        </Link>
                    </Nav.Item>
                </Nav>
            </Col>
            <Col lg={"10"}>
                <Outlet />
            </Col>
        </Row>

    </Container>
}

export default SellerHome;