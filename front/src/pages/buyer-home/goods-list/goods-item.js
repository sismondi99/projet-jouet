import {Button, Card, Col, Row, Modal, Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {useState} from "react";
import {addGoodsToCart} from "../service";
import {message} from 'antd';
function GoodsItem({goods}) {
    const navigate = useNavigate();

    const [addCartModalShow, setAddCartModalShow] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleClickGoods = (e) => {
        navigate(`/goods/${goods._id}`);
    }
    const handleAddGoodsToCart = async () => {
        try {
            await addGoodsToCart(goods._id, quantity);
            message.success('Add Successfully!');
            setAddCartModalShow(false);
        } catch (err) {
            console.log(err);
        }
    }
    return <>
        <Modal show={addCartModalShow} centered>
            <Modal.Header>
                <Modal.Title>Add To Cart</Modal.Title>
                <i className="bi bi-x-square-fill" style={{fontSize: '30px'}} onClick={() => setAddCartModalShow(false)}></i>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Enter quantity:</Form.Label>
                    <Form.Control value={quantity} onChange={e => setQuantity(e.target.value > 0 ? e.target.value : 1)} type="number"/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setAddCartModalShow(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleAddGoodsToCart}>Submit</Button>
            </Modal.Footer>
        </Modal>
        <Card style={{ width: '18rem' }}>
            <Card.Img onClick={handleClickGoods} variant="top" src={goods.images[0]}/>
            <Card.Body>
                <Card.Title onClick={handleClickGoods}>$ {goods.price}</Card.Title>
                <Card.Text onClick={handleClickGoods}>
                    ${goods.title}
                </Card.Text>
                <Row>
                    <Col lg={12} className="d-flex justify-content-end">
                        <Button variant="danger" className="me-2" onClick={() => setAddCartModalShow(true)}>
                            <i className="bi bi-cart-check-fill me-1"></i>
                            Add To Cart
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </>
}

export default GoodsItem;