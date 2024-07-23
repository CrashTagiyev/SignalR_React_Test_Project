import "./App.css";
import { HubConnectionBuilder } from "@microsoft/signalr";
import WaitingRoom from "./Components/WaitingRoom";
import { useState } from "react";

function App() {
  var [stateconnection, setStateConnection] = useState({});
  const [messageResponse, setMessagesResponse] = useState([]);

  const JoinChat = async (username, groupName) => {
    var connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5067/chathub", {
        withCredentials: true, 
      })
      .withAutomaticReconnect()
      .build();
      
    // connection.on("CreateConnection", (username, message) => {
    //   console.log(username);
    //   console.log(message);
    // });

    connection.on("SendMessage", (username, message, groupname) => {
      console.log(
        username + ":" + message + " to the group named " + groupname
      );
      setMessagesResponse((prev) => [...prev, username + ":" + message ]);
      return `${username}:${message}`;
    });

    try {
      await connection.start();
      setStateConnection(connection);
      await connection.invoke("CreateConnection", { username, groupName });
      console.log(connection);
      console.log("Connection started successfully");
    } catch (error) {
      console.error("Connection failed: ", error);
    }
  };
  const sendMail = async (username, message, groupName) => {
    try {
      var responseMessage = await stateconnection.invoke(
        "SendMessageToChat",
        {username,
        message,
        groupName}
      );
      return responseMessage;
    } catch (error) {
      console.error("Error sending mail: ", error);
    }
  };

  return <WaitingRoom JoinChat={JoinChat} sendMail={sendMail} messagesFromProps={messageResponse} />;
}

export default App;
