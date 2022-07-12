import {Button, Container, Row, Table, Modal, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {addComment, getOrders} from "../service";
import {message} from "antd";
import Score from "./score";

function Orders() {

    const [commentModalShow, setCommentModalShow] = useState(false);

    const [activatedGoods, setActivatedGoods] = useState(null);

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getOrders();
                const data = res.data;
                setOrders(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchOrders();
    }, []);

    const [score, setScore] = useState(1);
    const [comment, setComment] = useState('');
    const handleComment = async () => {
        if (!comment.trim()) {
            message.warning("Comment can't be empty!");
            return;
        }
        await addComment(comment, activatedGoods._id, score);
        message.success("Add Comment Successfully!");
        setCommentModalShow(false);
    }

    const renderOrders = () => {
        return orders.map(order => {
            return <tr key={order._id}>
                <td>{new Date(order.createdTime).toLocaleString()}</td>
                <td className="w-50">{order.goods.title}</td>
                <td>{order.goods.price}</td>
                <td>{order.quantity}</td>
                <td>{order.goods.price * order.quantity} $</td>
                <td>{ order.send ? 'Yes' : 'No' }</td>
                <td>
                    <Button variant={"info"} disabled={!order.send} onClick={() => {
                        setCommentModalShow(true);
                        setActivatedGoods(order.goods);
                    }
                    }>
                        <i className="bi bi-chat-square-text-fill text-white me-2"></i>
                        <span className={"text-white"}>Remark</span>
                    </Button>
                </td>
            </tr>
        })
    }

    return (
        <Container>
            <Modal show={commentModalShow}>
                <Modal.Header>
                    <Modal.Title>Comment for goods</Modal.Title>
                    <i className="bi bi-x-square-fill" style={{fontSize: '30px'}} onClick={() => setCommentModalShow(false)}></i>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Enter friendly comment: </Form.Label>
                        <Form.Control as="textarea" value={comment} onChange={e => setComment(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mt-4">
                        <Form.Label>Give it a score: </Form.Label>
                        <Score handleScore={(score) => setScore(score)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleComment}>Submit</Button>
                </Modal.Footer>
            </Modal>
            <Row className="d-flex justify-content-center mt-5">
                <Table striped bordered hover className="w-75">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Goods Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Send</th>
                        <th>Operation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderOrders()}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default Orders;