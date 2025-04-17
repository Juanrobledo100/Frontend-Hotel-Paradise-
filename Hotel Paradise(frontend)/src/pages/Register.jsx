import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; // Asegúrate de que los componentes estén importados correctamente
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.jpg'
import '../App.css'; 

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validación de campos
    if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
      setErrorMessage('Por favor, completa todos los campos.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
    } else {
      try {
        // Realizamos la solicitud POST con todos los datos requeridos
        const response = await axios.post('http://localhost:5000/api/usuario/registro', {
          nombre: firstName,
          apellido: lastName,
          correo: email,
          contrasena: password
        });

        // Si el registro es exitoso, redirige a la página de login
        if (response.data.message === "Usuario registrado con éxito") {
          navigate('/login');
        } else {
          setErrorMessage('Hubo un problema al registrarte. Intenta de nuevo.');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Hubo un problema al registrarte. Intenta de nuevo.');
      }
    }
  };

  return (
    <Container fluid className="register">
      <Row className="d-flex align-items-center">
        {/* Columna izquierda con la imagen y el texto */}
        <Col md={6} className="register-left text-center">
          <img src={logo} className='rounded-circle' alt="Logo" />
          <p>Bienvenido a nuestra plataforma. Regístrate para comenzar.</p>
        </Col>

        {/* Columna derecha con el formulario de registro */}
        <Col md={6} className="register-right">
          <h2 className="register-heading">Registrarse</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <Form className="register-form" onSubmit={handleRegister}>
            {/* Campo para el nombre */}
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            {/* Campo para el apellido */}
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            {/* Campo para el correo electrónico */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Introduce tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {/* Campo para la contraseña */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {/* Campo para confirmar la contraseña */}
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {/* Botón para enviar el formulario */}
            <Button variant="primary" type="submit" className="btnRegister">
              Registrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
