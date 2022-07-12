import {Col, Container, Row, Carousel, Button, Modal, Form} from "react-bootstrap";
import Comments from "./comments";
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom'
import {addGoodsToCart, getGoodsDetail} from "../service";
import {message} from "antd";
function GoodsDetail() {
    const params = useParams();
    const [goods, setGoods] = useState(null);
    useEffect(() => {
        const fetchGoodsDetail = async () => {
            try {
                const res = await getGoodsDetail(params.id);
                const data = res.data;
                setGoods(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchGoodsDetail();
    }, []);

    const [quantity, setQuantity] = useState(1);
    const [addCartModalShow, setAddCartModalShow] = useState(false);
    const handleAddGoodsToCart = async () => {
        try {
            await addGoodsToCart(goods._id, quantity);
            message.success('Add Successfully!');
            setAddCartModalShow(false);
        } catch (err) {
            console.log(err);
        }
    }

    const renderCarousel = () => {
        return (
            <Carousel>
                {goods?.images.map((image, index) => {
                    return <Carousel.Item key={index}>
                        <img className="d-block w-100" src={image} alt="First slide"/>

                    </Carousel.Item>
                })}
            </Carousel>
        )
    }

    return (
        <Container>
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
            <Row className="d-flex justify-content-center mt-5">
                <Col lg={"4"}>
                    {renderCarousel()}
                </Col>
                <Col lg={"4"} className="d-flex flex-column">
                    <h1>{goods?.title}</h1>
                    <h3 style={{color: 'red'}}>$ {goods?.price}</h3>
                    <p style={{color: 'gray'}}>
                        {goods?.introduction}
                    </p>
                    <div className="">
                        <Button variant="danger" className="me-2" onClick={() => setAddCartModalShow(true)}>
                            <i className="bi bi-cart-check-fill me-1"></i>
                            Add to Cart
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-2">
                <Col lg={"8"}>
                    <h1>Comments</h1>
                    <hr />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-3 mb-3">
                <Col lg={"8"}>
                    <Comments comments={goods?.comments}/>
                </Col>
            </Row>
        </Container>
    );
}

export default GoodsDetail;