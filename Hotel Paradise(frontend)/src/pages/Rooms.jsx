import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/habitaciones'); // Ruta correcta
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las habitaciones:', error);
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Nuestras Habitaciones</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Cargando habitaciones...</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {rooms.map(room => (
            <Col key={room.numero}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={room.imagen || 'https://via.placeholder.com/300x200?text=Habitación'} />
                <Card.Body>
                  <Card.Title>Habitación {room.numero} - {room.tipo}</Card.Title>
                  <Card.Text>{room.descripcion}</Card.Text>
                  <Card.Text className="text-success fw-bold">${room.precio} / noche</Card.Text>
                  <Button variant="primary" className="w-100">Reservar</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Rooms;
