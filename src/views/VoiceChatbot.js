import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const VoiceChatbot = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]); // Almacenará los mensajes de la conversación
  const [isMinimized, setIsMinimized] = useState(true); // Inicialmente está minimizado

  // Función para manejar el inicio/detención de la escucha
  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening();
    }
    setIsListening(!isListening);
  };

  // Función para manejar la minimización/expansión del chatbot
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    if (transcript) {
      console.log("Texto reconocido:", transcript);

      // Agregar el mensaje del usuario al chat
      setMessages((prevMessages) => [...prevMessages, { user: true, text: transcript }]);

      // Respuestas predefinidas del chatbot
      let response = '';
      if (transcript.toLowerCase().includes('hola')) {
        response = '¡Hola! ¿Cómo puedo ayudarte?';
      } else if (transcript.toLowerCase().includes('adiós')) {
        response = '¡Hasta luego!';
      } else if (transcript.toLowerCase().includes('abrir página')) {
        response = 'Abriendo la página...';
      } else if (transcript.toLowerCase().includes('qué hora es')) {
        const currentTime = new Date().toLocaleTimeString();
        response = `La hora actual es: ${currentTime}`;
      } else {
        response = 'Lo siento, no entendí tu comando.';
      }

      // Agregar la respuesta del chatbot
      setMessages((prevMessages) => [...prevMessages, { user: false, text: response }]);

      resetTranscript(); // Reiniciar la transcripción para el siguiente comando
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Este navegador no soporta el reconocimiento de voz.</p>;
  }

  return (
    <div className={`voice-chatbot-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-box">
        {/* Mostrar los mensajes solo cuando no esté minimizado */}
        {!isMinimized && (
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.user ? 'user-message' : 'bot-message'}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        )}
        <div className="chat-controls">
          <button onClick={toggleMinimize} className="minimize-btn">
            {/* Icono de globo flotante cuando está minimizado */}
            {isMinimized ? (
              <span className="minimized-icon">💬</span> // Icono de chat cuando está minimizado
            ) : (
              'Minimizar'
            )}
          </button>
          <button onClick={toggleListening} className="chatbot-btn">
            {isListening ? "Detener Escuchar" : "Iniciar Escuchar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatbot;
