import {Button, Container, Row, Col, Table, Modal, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getGoodsOfSeller} from "../service";
import {addGoods, removeGoods} from "./service";
import {message} from 'antd'

function GoodsManage() {
    const [loadGoods, setLoadGoods] = useState(0);
    const [goods, setGoods] = useState([]);
    useEffect(() => {
        const fetchGoods = async () => {
            try {
                const res = await getGoodsOfSeller();
                const data = res.data;
                setGoods(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchGoods();
    }, [loadGoods]);


    const [newGoods, setNewGoods] = useState({
        title: '',
        price: '',
        introduction: '',
        images: []
    })
    const [addGoodsModalShow, setAddGoodsModalShow] = useState(false);
    const handleAddGoodsSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            e.stopPropagation();
            try {
                let formData = {
                    title: newGoods.title,
                    price: newGoods.price,
                    introduction: newGoods.introduction
                }
                let imageNames = [];
                for (let i = 0; i < newGoods.images.length ; i++) {
                    const imageName = 'image' + (i + 1);
                    formData[imageName] = newGoods.images[i];
                    imageNames.push(imageName);
                }
                formData.imageNames = imageNames;

                await addGoods(formData);
                message.success("Create goods successfully!");
                setAddGoodsModalShow(false);
                setLoadGoods(loadGoods + 1);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleRemoveGoods = async (goodsID) => {
        try {
            await removeGoods(goodsID);
            message.success("Remove Goods successfully!");
            setLoadGoods(loadGoods + 1);
        } catch (err) {
            console.log(err);
        }
    }

    const renderGoods = () => {
        return goods.map((item, index) => {
            return <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.sales}</td>
                <td className="w-50">{item.introduction}</td>
                <td>
                    <Button onClick={() => handleRemoveGoods(item._id)} variant={"danger"}><i className="bi bi-trash-fill"></i></Button>
                </td>
            </tr>
        })
    }


    return <Container fluid>
        <Modal show={addGoodsModalShow} centered>
            <Modal.Header className="d-flex justify-content-between">
                <Modal.Title>Create Goods</Modal.Title>
                <i onClick={() => setAddGoodsModalShow(false)} className="bi bi-x-square-fill" style={{fontSize: '30px'}}></i>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddGoodsSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Goods Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={newGoods.title}
                            onChange={e => setNewGoods({...newGoods, title: e.target.value})}
                            required
                            placeholder="Enter goods title"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Goods Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={newGoods.price}
                            onChange={e => setNewGoods({...newGoods, price: e.target.value})}
                            required
                            placeholder="Enter goods price"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Goods Introduction</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={newGoods.introduction}
                            onChange={e => setNewGoods({...newGoods, introduction: e.target.value})}
                            required
                            placeholder="Enter goods introduction"/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Goods Images</Form.Label>
                        <Form.Control
                            type="file"
                            multiple
                            onChange={e => setNewGoods({...newGoods, images: e.target.files})}
                            required
                            placeholder="Enter goods introduction"/>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" onClick={() => setAddGoodsModalShow(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            <i className="bi bi-cloud-arrow-up-fill me-2"></i>
                            Create
                        </Button>
                    </div>

                </Form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>


        <Row>
            <Col lg={"2"}>
                <Button variant={"success"} onClick={() => setAddGoodsModalShow(true)}>Create</Button>
            </Col>
        </Row>
        <Row className="mt-3">
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th>Introduction</th>
                    <th>Operation</th>
                </tr>
                </thead>
                <tbody>
                    {renderGoods()}
                </tbody>
            </Table>
        </Row>
    </Container>
}

export default GoodsManage;