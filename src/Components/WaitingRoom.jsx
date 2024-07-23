import React, { useEffect, useState } from "react";

const WaitingRoom = ({ JoinChat, sendMail, messagesFromProps }) => {
  const [username, setUsername] = useState();
  const [groupName, setGroupName] = useState();

  const [usernameMail, setUsernameMail] = useState();
  const [groupNameMail, setGroupNameMail] = useState();
  const [groupMessageMail, setMessageMail] = useState();

  const [messages, setMessages] = useState([]);

  const connectionSubmit = async (e) => {
    e.preventDefault();
    const response = await JoinChat(username, groupName);
    return response;
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    const messageResponse = await sendMail(
      usernameMail,
      groupMessageMail,
      groupNameMail
    );
    // if (messageResponse) {
    //   setMessages((prev) => [...prev, messageResponse]);
    // }
  };
  
  useEffect(() => {
    if (messagesFromProps !== undefined) {
      setMessages(messagesFromProps);
    }
  }, [messagesFromProps]);

  return (
    <>
      <form onSubmit={connectionSubmit}>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        ></input>
        <input
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
          placeholder="Group name"
        ></input>
        <button type="submit">Connect</button>
      </form>

      <form onSubmit={sendMessage}>
        <input
          onChange={(e) => {
            setUsernameMail(e.target.value);
          }}
          placeholder="Username"
        ></input>
        <input
          onChange={(e) => {
            setGroupNameMail(e.target.value);
          }}
          placeholder="Group name"
        ></input>
        <input
          onChange={(e) => {
            setMessageMail(e.target.value);
          }}
          placeholder="Message"
        ></input>
        <button type="submit">Connect</button>
      </form>
      <ul>
        {messages.map((message, index) => {
          return <li key={index}>{message}</li>;
        })}
      </ul>
    </>
  );
};

export default WaitingRoom;
