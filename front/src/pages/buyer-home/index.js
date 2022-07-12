import {Col, Container, Row, Button} from "react-bootstrap";
import {Link, Outlet, useLocation} from 'react-router-dom';
import navs from './navs';
import useAuth from '../../auth'
function BuyerHome() {
    const {logout} = useAuth();
    const location = useLocation();
    const currentPath = location.pathname;

    const handleLogout = () => {
        logout().then(() => {
            localStorage.setItem("token", "");
            window.location.href = "/";
        })
    }

    const renderNavs = () => {
        return navs.map((nav, index) => {
            return (
                <Link key={nav.name} to={nav.path}>
                    <Button
                        variant={nav.path === currentPath ? 'primary' : 'link'}
                        className="text-decoration-none me-3">
                        {nav.name}
                    </Button>
                </Link>)
        });
    }

    return (
        <Container fluid>
            <Row className="d-flex justify-content-end bg-info">
                <Col lg="4" className="d-flex justify-content-end align-items-center p-3">
                    {renderNavs()}
                </Col>
                <Col lg={"1"} className="d-flex justify-content-center align-items-center">
                    <Button variant={"link"} className="text-decoration-none" onClick={handleLogout}>Sign Out</Button>
                </Col>
            </Row>
            <Row>
                <Outlet />
            </Row>
        </Container>
    )
}

export default BuyerHome;