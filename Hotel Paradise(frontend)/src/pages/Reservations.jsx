import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservas'); // Ruta correcta
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Mis Reservas</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Cargando reservas...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Habitación</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map(reserva => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.habitacion}</td>
                  <td>{reserva.fecha}</td>
                  <td>{reserva.estado}</td>
                  <td>
                    <Button variant="danger" size="sm">Cancelar</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">No hay reservas disponibles</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Reservations;
