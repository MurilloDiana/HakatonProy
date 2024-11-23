import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, CardTitle, Input, Row, Col } from "reactstrap";
import { Link } from "react-router-dom"; // Importamos Link para redirigir

function Integracion() {
  const [inputValue, setInputValue] = useState(""); // Estado para el input
  const [savedInputValue, setSavedInputValue] = useState(""); // Estado para el valor guardado en localStorage
  const [showAlert, setShowAlert] = useState(false); // Estado para controlar la visibilidad de la alerta

  // Cargar el valor guardado desde localStorage al montar el componente
  useEffect(() => {
    const storedValue = localStorage.getItem("inputValue");
    if (storedValue) {
      setSavedInputValue(storedValue); // Actualizamos el estado guardado con el valor en localStorage
      setInputValue(storedValue); // Sincronizamos el input con el valor guardado
    }
  }, []);

  // Controlar cambio en el input
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Actualizamos el valor del input localmente
  };

  // Función para guardar el valor cuando se presiona "Aplicar"
  const handleApplyClick = () => {
    setSavedInputValue(inputValue); // Guardamos el valor en el estado persistente
    localStorage.setItem("inputValue", inputValue); // Guardamos el valor en localStorage
    if (inputValue) {
      setShowAlert(true); // Mostramos el card de alerta solo si hay un valor en el input
    } else {
      setShowAlert(false); // Ocultamos el card de alerta si el input está vacío
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          {/* Mostrar Card de alerta solo si hay un valor en el input y se presionó "Aplicar" */}
          {showAlert && (
            <Card className="alert-card">
              <CardBody>
                <h5 className="alert-title">¡Poco Stock!</h5>
                <p>El stock de este producto es limitado. Visita el inventario para más detalles.</p>
                <Link to="/inventario">
                  <Button color="primary">Ver Inventario</Button>
                </Link>
              </CardBody>
            </Card>
          )}

          {/* Card principal para la integración */}
          <Card>
            <CardHeader>
              <CardTitle tag="h3">Integración</CardTitle>
            </CardHeader>
            <CardBody>
              <h4>Integración Pilot</h4>
              <Input
                value={inputValue} // El valor de input se controla con el estado inputValue
                onChange={handleInputChange} // Actualizamos el estado inputValue cuando se cambia el valor
                placeholder="Escribe algo..."
              />
              <Button className="button-submit" onClick={handleApplyClick}>
                Aplicar
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Integracion;
