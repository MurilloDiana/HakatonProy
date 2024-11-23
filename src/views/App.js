// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChatProvider } from "./ChatContext"; // Importar el proveedor
import Integracion from "./Integracion"; // Componente Integracion (tu componente actual)

function App() {
  return (
    <ChatProvider>
      <Router>
        <Integracion />
        {/* Otros componentes que quieras que tengan acceso al contexto */}
      </Router>
    </ChatProvider>
  );
}

export default App;
