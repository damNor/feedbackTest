import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <Form onSubmit={onSubmit}>
        <Form.Group controlId="formModal.selectLocation">
            <Form.Control as="select" custom>
                <option>Location</option>
                <option>Location 1</option>
                <option>Location 2</option>
                <option>Location 3</option>
                <option>Location 4</option>
                <option>Location 5</option>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="formModal.selectDepartment">
            <Form.Control as="select" custom>
                <option>Department</option>
                <option>Department 1</option>
                <option>Department 2</option>
                <option>Department 3</option>
                <option>Department 4</option>
                <option>Department 5</option>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="formModal.selectWard">
            <Form.Control as="select" custom>
                <option>Ward</option>
                <option>Ward 1</option>
                <option>Ward 2</option>
                <option>Ward 3</option>
                <option>Ward 4</option>
                <option>Ward 5</option>
            </Form.Control>
        </Form.Group>

        <Container>
            <Row>
                <Col>
                    <Button style={{background:'#000'}} className='text-center' variant="secondary">Skip</Button>
                </Col>
                <Col>
                    <Button style={{background:'#6c757d'}} className='text-center' variant="primary" type="submit" block>Ok</Button>
                </Col>
            </Row>
        </Container>
        
        
        </Form>
    )   
};
export default LoginForm;