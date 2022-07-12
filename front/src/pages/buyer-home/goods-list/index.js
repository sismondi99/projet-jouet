import {Container, Row, Form, Button, Col} from "react-bootstrap";
import GoodsItem from "./goods-item";
import {useEffect, useState} from "react";
import {getGoods, searchGoods} from "../service";
import {message} from "antd";

function GoodsList() {
    const [loadGoods, setLoadGoods] = useState(0);
    const [goods, setGoods] = useState([]);
    useEffect(()=> {
        const fetchGoods = async () => {
            try {
                const res = await getGoods();
                const data = res.data;
                setGoods(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchGoods();
    }, [loadGoods]);

    const [query, setQuery] = useState('');
    const handleClickSearch = async () => {
        try {
            let res;
            if (!query) {
                res = await getGoods(query);
            } else {
                res = await searchGoods(query);
            }
            const data = res.data;
            setGoods(data);
        } catch (err) {
            console.log(err);
        }
    }


    const renderGoodsList = () => {
        return goods.map(item => {
           return <div key={item._id} className="me-4">
               <GoodsItem goods={item}/>
           </div>
        });
    }

    return <Container fluid="md">
        <Row className="mt-5">
            <Col lg={"3"}>
                <Form.Group className="input-group">
                    <Form.Control value={query} onChange={e => setQuery(e.target.value)} type={"text"} placeholder={"Enter the keyword"}/>
                    <Button variant={"outline-secondary"} type={"button"} onClick={handleClickSearch}>Search</Button>
                </Form.Group>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col lg={"12"}>
                <h2>Goods List</h2>
            </Col>
        </Row>
        <Row className="mt-2">
            <Col lg={"12"} className="d-flex flex-wrap">
                {renderGoodsList()}
            </Col>
        </Row>
    </Container>
}

export default GoodsList;