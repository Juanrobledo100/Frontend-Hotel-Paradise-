import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import '../App.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verificar si los campos están vacíos
    if (email === '' || password === '') {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Verificar que la URL del servidor sea correcta
      const response = await axios.post('http://localhost:5000/api/usuario/login', {
        correo: email,
        contrasena: password
      });

      // Verificar si el servidor devuelve el token correctamente
      if (response.data.token) {
        // Guardar en localStorage los datos del usuario y el token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
        
        // Redirigir al usuario a la página principal (Home)
        navigate('/');
      } else {
        // Mostrar mensaje de error si no hay token
        setErrorMessage('Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error en caso de problemas con la solicitud
      setErrorMessage('Hubo un problema al iniciar sesión. Intenta de nuevo.');
    }
  };

  return (
    <section className="vh-100" style={{ background: 'linear-gradient(to left, #3931af, #00c6ff)' }}>
      <Container className="py-5 h-100">
        <Row className="d-flex align-items-center justify-content-center h-100">
          <Col md={8} lg={7} xl={6} className="text-center">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid rounded-circle animated-logo"
            />
          </Col>
          <Col md={7} lg={5} xl={5}>
            <h2 className="text-center">Iniciar sesión</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Introduce tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Introduce tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 btn-lg">
                Iniciar sesión
              </Button>
            </Form>
            <p className="text-center mt-3">
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
