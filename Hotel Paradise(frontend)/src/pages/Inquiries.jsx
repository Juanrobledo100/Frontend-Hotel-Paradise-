import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Inquiries = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/consultas', formData); // Ruta correcta
      alert('Tu consulta ha sido enviada.');
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (error) {
      console.error('Error al enviar la consulta:', error);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Envíanos tu consulta</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={3} name="mensaje" value={formData.mensaje} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Enviar</Button>
      </Form>
    </Container>
  );
};

export default Inquiries;
