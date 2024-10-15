import { appLocalStorage } from "/src/utils/localstorage.js";
import toast from "react-hot-toast";

let socket = null;

// var SocketResponse = {
//   EntityId,
//   TanentCode,
//   TypeId,
//   Data,
// };

const WS = function () {
  const userInfo = appLocalStorage.get("UserInfo");

  if (!userInfo) {
    console.error(
      "User is not logged in. Unable to establish WebSocket connection."
    );
    return;
  }

  const userObject = JSON.parse(userInfo);
  const accessToken = userObject.accessToken;

  // Open WebSocket connection with the access token
  socket = new WebSocket(
    `wss://localhost:44333/task?access_token=${accessToken}`
  );

  socket.addEventListener("open", (event) => {
    console.log("Connected to the WebSocket server");
    // Send a message to the server
    socket.send("Hello, Server!");
  });

  // Listen for messages from the server
  socket.addEventListener("message", (event) => {
    var data = null;
    switch (JSON.parse(event.data).typeId) {
      case 3: {
        data = JSON.parse(event.data).data;
        toast.success(
          `Notification system\n${data.title}\n${data.description}`
        );
        break;
      }
      default: {
        data = JSON.parse(event.data);
        toast.success(`New message from Server: ${data}`);
        break;
      }
    }
  });

  // Handle connection close
  socket.addEventListener("close", () => {
    console.log("Disconnected from the WebSocket server");
  });

  // Handle errors
  socket.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
  });
};

function Close() {
  if (socket) {
    socket.close();
    console.log("Disconnected from the WebSocket server");
    socket = null;
  } else {
    console.log("No active WebSocket connection to close.");
  }
}

export { WS, Close };
