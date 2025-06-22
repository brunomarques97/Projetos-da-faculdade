import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LoginForm from './LoginForm'; 

const AuthForm = () => {
  return (
    <Container 
      className="d-flex justify-content-center align-items-center" 
      style={{ minHeight: '100vh' }} 
    >
      <Row className="w-100"> 
        <Col xs={12} md={6} lg={4} className="mx-auto"> 
          <Card>
            <Card.Header className="text-center">
              <h3>Login de Usuário</h3> 
            </Card.Header>
            <Card.Body>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;