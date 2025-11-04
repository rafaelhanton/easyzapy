import io from "socket.io-client"; // Nome mais comum e atualizado
import { isObject } from "lodash";

export function socketConnection(params) {
  // Obtém userId do localStorage de forma mais segura
  const storedUserId = localStorage.getItem("userId");
  
  // Configurações padrão do socket
  const socketOptions = {
    transports: ["websocket", "polling"], // Flashsocket é obsoleto
    reconnection: true, // Habilita reconexão automática
    reconnectionAttempts: 10, // Limite de tentativas de reconexão
    reconnectionDelay: 1000, // Delay inicial entre tentativas (ms)
    timeout: 20000, // Timeout de conexão aumentado
    query: {},
  };

  // Normaliza os parâmetros de query
  socketOptions.query = isObject(params) 
    ? { userId: storedUserId, ...params }
    : { userId: storedUserId || params };

  // Remove valores undefined/null do query
  socketOptions.query = Object.fromEntries(
    Object.entries(socketOptions.query).filter(([_, value]) => value != null)
  );

  try {
    const socket = io(process.env.REACT_APP_BACKEND_URL || "", socketOptions);
    
    // Eventos de log básicos (opcional, pode ser removido)
    socket.on("connect", () => {
      console.log("Socket conectado:", socket.id);
    });
    
    socket.on("connect_error", (error) => {
      console.error("Erro de conexão:", error);
    });

    return socket;
  } catch (error) {
    console.error("Erro ao criar conexão socket:", error);
    throw error;
  }
}

// Exemplo de uso:
// const socket = createSocketConnection({ userId: "123" });
// ou
// const socket = createSocketConnection("123");