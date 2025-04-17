import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import hilton from '../assets/hilton.jpg';
import instalaciones from '../assets/fff.jpg';
import habitacion from '../assets/habitacion.jpg';
import logo from '../assets/logo.jpg';
import axios from 'axios';
import { 
  Navbar, 
  Nav, 
  Container, 
  Button, 
  Carousel, 
  Card, 
  Row, 
  Col, 
  Modal, 
  Spinner, 
  Image
} from 'react-bootstrap';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // Inicializamos el hook useNavigate

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setIsLoggedIn(true);
      setUserName(userData.name);
    }
    // Obtener habitaciones
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/habitacion');
        setRooms(response.data);
      } catch (error) {
        console.error('Error al cargar las habitaciones:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleLogout = () => {
    // Eliminar los datos del usuario del localStorage
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
  };

  const handleReservation = (roomNumber) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      // Redirige a la página de detalle de la habitación
      navigate(`/habitacion${roomNumber}`);
    }
  };

  const imagenes = [
    { src: hilton, titulo: "Bienvenido a Hotel Paradise", descripcion: "Disfruta de nuestras lujosas instalaciones y servicios premium." },
    { src: habitacion, titulo: "Habitaciones de Lujo", descripcion: "Contamos con habitaciones confortables diseñadas para tu descanso." },
    { src: instalaciones, titulo: "Servicios Exclusivos", descripcion: "Ofrecemos servicios personalizados para hacer de tu estancia una experiencia inolvidable." },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar style={{ background: "#001449" }} expand="lg" sticky="top" className="shadow-sm">
        <Container>
          <div className="me-auto d-flex align-items-center">
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
              <img
                className="rounded-circle"
                src={logo}
                alt="Hotel Paradise Logo"
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <span className="text-white fw-bold">Hotel Paradise</span>
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav>
              <Nav.Link as={Link} to="/rooms" className="text-white">Habitaciones</Nav.Link>
              <Nav.Link as={Link} to="/reservations" className="text-white">Reservas</Nav.Link>
              <Nav.Link as={Link} to="/inquiries" className="text-white">Consultas</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div className="ms-auto d-flex">
            {!isLoggedIn ? (
              <>
                <Button as={Link} to="/login" variant="outline-primary" className="me-2">
                  Iniciar Sesión
                </Button>
                <Button as={Link} to="/register" variant="primary">
                  Registrarse
                </Button>
              </>
            ) : (
              <>
                <span className="text-white d-flex align-items-center me-2">
                  <i className="bi bi-person-circle me-2" style={{ fontSize: '1.5rem' }}></i>
                  Bienvenido {userName}
                </span>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            )}
          </div>
        </Container>
      </Navbar>

      {/* Carrusel */}
      <Carousel indicators={false} controls={true} className="vw-100" style={{ height: "70vh" }}>
        {imagenes.map((img, index) => (
          <Carousel.Item key={index} style={{ height: "70vh" }}>
            <img
              className="d-block w-100"
              src={img.src}
              alt={img.titulo}
              style={{ objectFit: "cover", height: "70vh" }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
              <h3>{img.titulo}</h3>
              <p>{img.descripcion}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Sección de Habitaciones */}
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
                  <Card.Img variant="top" src={room.imagen || 'https://via.placeholder.com/300x200?text=Habitación'}
                  style={{height: "200px", objectFit: "cover" }} />
                  <Card.Body>
                    <Card.Title>Habitación {room.numero} - {room.tipo}</Card.Title>
                    <Card.Text>{room.descripcion}</Card.Text>
                    <Card.Text className="text-success fw-bold">${room.precio} / noche</Card.Text>
                    <Button variant="primary" className="w-100" onClick={() => handleReservation(room.numero)}>Reservar</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Modal de Login */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión requerido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Debes iniciar sesión o registrarte para realizar una reserva.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Cerrar
          </Button>
          <Button variant="success" as={Link} to="/register">
            Registrarse
          </Button>
          <Button variant="primary" as={Link} to="/login">
            Iniciar Sesión
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className="text-white py-4 mt-5" style={{ background: "#001449" }}>
        <Container>
          <Row className="mb-4">
            <Col md={4} className="mb-3 mb-md-0">
              <h5>Hotel Paradise</h5>
              <p className="text-ligth">Tu destino perfecto para descansar y disfrutar.</p>
              <img src={logo} alt="Logo Hotel Paradise" className="img-fluid rounded-circle" style={{ maxWidth: '200px', marginTop: '10px' }} />
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <h5>Contacto</h5>
              <p className="text-ligth">Email: info@hotelparadise.com</p>
              <p className="text-ligth">Teléfono: +123 456 7890</p>
              <p className="text-ligth">
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-white">
                  <i className="bi bi-whatsapp" style={{ fontSize: '20px' }}></i> WhatsApp
                </a>
              </p>
            </Col>
            <Col md={4}>
              <h5>Enlaces Rápidos</h5>
              <ul className="list-unstyled">
                <li><Link className="text-ligth" to="/about">Acerca de</Link></li>
                <li><Link className="text-ligth" to="/terms">Términos y Condiciones</Link></li>
                <li><Link className="text-ligth" to="/privacy">Política de Privacidad</Link></li>
                <li><Link className="text-ligth" to="/contact">Contacto</Link></li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <p className="text-ligth mb-0">© 2025 Hotel Paradise. Todos los derechos reservados.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Home;
