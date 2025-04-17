import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="text-center my-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Página no encontrada</p>
      <Button as={Link} to="/" variant="primary">Volver al Inicio</Button>
    </Container>
  );
};

export default NotFound;
