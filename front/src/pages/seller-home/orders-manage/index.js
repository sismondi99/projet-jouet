import {Button, Container, Row, Col, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getOrdersOfSeller, sendGoods} from "../service";
import {message} from "antd";

function OrdersManage() {
    const [loadOrders, setLoadOrders] = useState(0);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            const res = await getOrdersOfSeller();
            const data = res.data;
            setOrders(data);
        }
        fetchOrders();
    }, [loadOrders]);

    const handleClickSend = async (orderID) => {
        try {
            await sendGoods(orderID);
            message.success("Send Goods Successfully!");
            setLoadOrders(loadOrders + 1);
        } catch (err) {
            console.log(err);
        }
    }

    const renderOrders = () => {
        return orders.map(order => {
            return <tr key={order._id}>
                <td>{new Date(order.createdTime).toLocaleString()}</td>
                <td>{order.goods.title}</td>
                <td>{(order.goods.price * order.quantity).toFixed(2)}</td>
                <td>{order.buyer.username}</td>
                <td>
                    {
                      order.send ?
                          <h5 style={{color: 'green'}}>Have Send</h5> :
                          <Button variant="primary" onClick={() => handleClickSend(order._id)}>Send Now</Button>
                    }
                </td>
            </tr>
        })
    }

    return <Container fluid>
        <Row>
            <h1>Orders</h1>
        </Row>
        <Row className="mt-3">
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Goods Name</th>
                    <th>Pay Amount</th>
                    <th>Customer Name</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {renderOrders()}

                </tbody>
            </Table>
        </Row>
    </Container>
}

export default OrdersManage;