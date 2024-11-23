// src/context/ChatContext.js
import React, { createContext, useState, useEffect } from "react";

// Crear el contexto
const ChatContext = createContext();

// Crear el proveedor del contexto
const ChatProvider = ({ children }) => {
  // Obtener el valor del chat desde localStorage o poner false por defecto
  const [showChat, setShowChat] = useState(localStorage.getItem("showChat") === "true");

  // Guardar el estado del chat en localStorage para persistir
  useEffect(() => {
    localStorage.setItem("showChat", showChat ? "true" : "false");
  }, [showChat]);

  return (
    <ChatContext.Provider value={{ showChat, setShowChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };
