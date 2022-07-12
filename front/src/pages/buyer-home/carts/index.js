import {Button,  Container, Row, Table, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getCartGoods, orderCart, removeGoodsFromCart} from "../service";
import {message} from 'antd'

function Carts() {

    const [orderModalShow, setOrderModalShow] = useState(false);
    const [orderForm, setOrderForm] = useState({
        phone: '',
        address: ''
    });

    const [loadCartGoods, setLoadCartGoods] = useState(0);
    const [cartGoods, setCartGoods] = useState([]);
    useEffect(() => {
        const fetchCartGoods = async () => {
            try {
                const res = await getCartGoods();
                const data = res.data;
                setCartGoods(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCartGoods();
    }, [loadCartGoods]);

    const [total, setTotal] = useState(0);
    useEffect(() => {
        let amount = 0;
        cartGoods.forEach(item => {
           if (item.checked) {
               amount += (item.quantity * item.goods.price);
           }
        });
        setTotal(amount.toFixed(2));
    }, [cartGoods]);

    const removeGoods = async (ids) => {
        try {
            await removeGoodsFromCart(ids);
            message.success('Remove successfully!');
            setLoadCartGoods(loadCartGoods + 1);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if (form.checkValidity() === true) {
            await orderCart(cartGoods.filter(item => item.checked), orderForm);
            message.success("Buy successfully!");
            setLoadCartGoods(loadCartGoods + 1);
            setOrderModalShow(false)
        }
    }

    const renderCartGoods = () => {
        return cartGoods.map(item => {
            return <tr key={item._id}>
                <td>
                    <Form.Check type={"radio"} checked={item.checked || false} onClick={e => {
                        setCartGoods(cartGoods.map(goods => {
                            if (goods._id === item._id) {
                                goods.checked = !Boolean(goods.checked);
                            }
                            return goods;
                        }))
                    }
                    }/>
                </td>
                <td className="w-50">{item.goods.title}</td>
                <td>{item.goods.price} $</td>
                <td>{item.quantity}</td>
                <td>{(item.quantity * item.goods.price).toFixed(2)} $</td>
                <td>
                    <Button onClick={() => removeGoods([item._id])} variant={"danger"}><i className="bi bi-trash3-fill"></i></Button>
                </td>
            </tr>
        })
    }

    return (
        <Container>
            <Modal show={orderModalShow}>
                <Modal.Header>
                    <Modal.Title>Make Order</Modal.Title>
                    <i  className="bi bi-x-square-fill"
                        style={{fontSize: '30px'}}
                        onClick={() => setOrderModalShow(false)}
                    ></i>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mt-2">
                            <Form.Label>Your Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                value={orderForm.phone}
                                onChange={e => setOrderForm({...orderForm, phone: e.target.value})}
                                required/>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Your Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={orderForm.address}
                                onChange={e => setOrderForm({...orderForm, address: e.target.value})}
                                required/>
                        </Form.Group>
                        <h5 className="text-end mt-3">Total: {total}</h5>
                        <div className="text-end">
                            <Button variant="danger" type="submit"><i className="bi bi-bag-fill me-2"></i>Order</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Row className="d-flex justify-content-center mt-5">
                <Table striped bordered hover className="w-75">
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>Goods Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Operation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderCartGoods()}
                    <tr>
                        <th colSpan={5} className="text-end">
                            <h5>Total: {total} $</h5>
                        </th>
                        <th>
                            <Button disabled={!cartGoods.some(item => item.checked)} variant="success" onClick={() => {
                                if (cartGoods.some(item => item.checked)) {
                                    setOrderModalShow(true)
                                }
                            }}>Order</Button>
                        </th>
                    </tr>
                    </tbody>
                </Table>
            </Row>

        </Container>
    )
}

export default Carts;