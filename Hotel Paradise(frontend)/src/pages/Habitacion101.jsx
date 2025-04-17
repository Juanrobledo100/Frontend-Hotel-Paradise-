import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Habitacion101 = () => {
  const { numero } = useParams(); // Obtener el número de habitación de la URL
  const [habitacion, setHabitacion] = useState(null);
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');

  
  useEffect(() => {
    const fetchHabitacion = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/habitaciones/${numero}`);
        if (response.ok) {
          const data = await response.json();
          setHabitacion(data); 
        } else {
          console.error('Habitación no encontrada');
        }
      } catch (error) {
        console.error('Error al obtener los datos de la habitación:', error);
      }
    };

    fetchHabitacion();
  }, [numero]); // Ejecutar solo cuando el número de habitación cambie

  // Si la habitación no está cargada, mostrar un mensaje de carga
  if (!habitacion) {
    return <div>Cargando habitación...</div>;
  }

  // Calcular monto total
  const calcularMontoTotal = () => {
    const dias = Math.ceil((new Date(fechaSalida) - new Date(fechaEntrada)) / (1000 * 60 * 60 * 24));
    return habitacion.precio * dias;
  };

  // Función para manejar la reserva
  const handleReserva = async (e) => {
    e.preventDefault();
    
    const reservaData = {
      habitacion: habitacion._id,
      fechaEntrada: new Date(fechaEntrada),
      fechaSalida: new Date(fechaSalida),
      montoTotal: calcularMontoTotal()
    };

    try {
      const response = await fetch('http://localhost:5000/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaData)
      });

      if (response.ok) {
        // Redirigir a página de mis reservas
        window.location.href = '/mis-reservas';
      }
    } catch (error) {
      console.error('Error al hacer la reserva:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hotel Paradise</h1>

      {/* Descripción del Hotel */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sobre Nosotros</h2>
        <p>
          Hotel Paradise ofrece una experiencia única de hospitalidad con vistas 
          impresionantes y servicios de primera clase. Ubicado en un entorno 
          privilegiado, nuestro hotel combina comodidad moderna con un ambiente 
          acogedor.
        </p>
      </section>

      {/* Servicios Populares */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Servicios</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>🏊 Piscina Infinita</div>
          <div>🍽️ Restaurante Gourmet</div>
          <div>💆 Spa</div>
          <div>🏋️ Gimnasio</div>
          <div>🚗 Estacionamiento</div>
          <div>📶 WiFi Gratis</div>
        </div>
      </section>

      {/* Habitación */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Nuestra Habitación</h2>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Habitación {habitacion.numero} - {habitacion.tipo}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <img 
                src={habitacion.imagen} 
                alt={`Habitación ${habitacion.numero}`} 
                className="w-full h-64 object-cover rounded"
              />
            </div>
            <p>{habitacion.descripcion}</p>
            <div className="mt-2 space-y-2">
              <p><strong>Tipo:</strong> {habitacion.tipo}</p>
              <p><strong>Capacidad:</strong> {habitacion.capacidad} persona(s)</p>
              <p className="font-bold">Precio: ${habitacion.precio}/noche</p>
              <p><strong>Estado:</strong> {habitacion.disponible ? 'Disponible' : 'No Disponible'}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Formulario de Reserva */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Hacer Reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReserva} className="space-y-4">
              <div>
                <Label>Fecha de Entrada</Label>
                <Input 
                  type="date" 
                  value={fechaEntrada}
                  onChange={(e) => setFechaEntrada(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Fecha de Salida</Label>
                <Input 
                  type="date" 
                  value={fechaSalida}
                  onChange={(e) => setFechaSalida(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Habitación Seleccionada</Label>
                <Input 
                  type="text" 
                  value={`Habitación ${habitacion.numero}`}
                  readOnly 
                />
              </div>
              {fechaEntrada && fechaSalida && (
                <div>
                  <Label>Monto Total</Label>
                  <Input 
                    type="text" 
                    value={`$${calcularMontoTotal()}`}
                    readOnly 
                  />
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full"
                disabled={!fechaEntrada || !fechaSalida || !habitacion.disponible}
              >
                <Calendar className="mr-2" /> Reservar Ahora
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Habitacion101;
