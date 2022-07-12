import {Col, Container, Row} from "react-bootstrap";

function Comments({comments = []}) {

    const renderScore = (score) => {
        let fullStars = [];
        for (let i = 0; i < score; i ++) {
            fullStars.push(<i className="bi bi-star-fill me-1" key={i} style={{color: 'orange'}}></i>)
        }
        return fullStars;
    }

    const renderComments = () => {
        return comments.map(comment => {
            return <div className="border p-3" key={comment._id}>
                <Row>
                    <Col lg={"2"} className="d-flex align-items-center">
                        <i className="bi bi-person-circle me-2" style={{fontSize: "35px"}}></i>
                        <h4 className="me-2">{comment.commenter.username}</h4>
                    </Col>
                </Row>
                <Row>
                    <p>{comment.content}</p>
                    <h5>
                        {renderScore(comment.score)}
                    </h5>
                    <small style={{color:"gray"}}>Comment at: {new Date(comment.createdTime).toLocaleString()}</small>
                </Row>
            </div>
        })
    }
    return (
        <Container >
            {comments.length > 0 ? renderComments() : 'No Comments Yet'}

        </Container>)
}
export default Comments;