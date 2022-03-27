import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useLocation } from "react-router-dom";
import Chats from "./Chats";
import beep from "../assets/sound/beep2.mp3";
import Peoples from "./Peoples";

let socket;

const RoomChat = ({ location1 }) => {
  const [txtMsj, setTxtMsj] = useState("");
  const location = useLocation();

  const [chats, setChats] = useState([]);
  const [stateServer, setStateServer] = useState("red");
  const [peopleConected, setPeopleConected] = useState("");

  useEffect(() => {
    // socket = socketIOClient("http://localhost:4000/");
    // socket = socketIOClient("http://192.168.100.77:4000/");
    // socket = socketIOClient("http://192.168.10.7:4000/");https://chatsockethn.herokuapp.com/
    socket = socketIOClient("https://chatsockethn.herokuapp.com/");

    // joined
    socket.emit(
      "joined",
      {
        user: location.state || "morgan",
      },
      (data) => {
        setStateServer("rgb(100, 255, 61)");
        setPeopleConected(data);
      }
    );

    socket.on("joindAnotherUser", (data) => {
      // console.log("users: ", data);
      setPeopleConected(data);
    });

    socket.on("disconnect", () => {
      setStateServer("red");
    });

    socket.on("messageFromServerToClients", ({ message }) => {
      let audio = new Audio(beep);
      audio.play();
      setChats((prevChats) => [...prevChats, message]);
    });

    socket.on("userLeft", (data) => {
      setPeopleConected(data);
    });

    return function cleanup() {
      socket.emit("oneleft", {});
      socket.off();
    };
  }, [location.state]);

  // SEND MESSAGE
  const handleMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessageToServer", {
      id: new Date().getTime(),
      message: txtMsj,
      user: location.state || "Morgan",
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      flag: false,
    });
    setTxtMsj("");
    setChats((prevChats) => [
      ...prevChats,
      {
        id: new Date().getTime(),
        message: txtMsj,
        user: location.state || "Morgan",
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        flag: true,
      },
    ]);
  };

  return (
    <div className="conatinerRoom">
      <h1 className="roomChatTitle">ROOM CHAT</h1>

      <div className="divStatusRoomServer">
        <h1 className="roomStatus">STATUS SERVER:</h1>
        <div
          className="divStatusServer"
          style={{ backgroundColor: stateServer }}
        ></div>
      </div>
      <h1 className="nameChater">{`Bienvindo: ${
        location.state || "Morgan"
      }`}</h1>
      <div className="divChatsPeoples">
        <div className="section1">
          <div id="divChats" className="divChats">
            <Chats chats={chats} />
          </div>
          <div className="divSendMessage">
            <input
              className="txtSendMessage"
              type=""
              required
              value={txtMsj}
              onChange={(e) => setTxtMsj(e.target.value)}
            />
            <button className="btnSendMessage" onClick={handleMessage}>
              send
            </button>
          </div>
        </div>
        <div className="section2">
          {peopleConected && <Peoples peoples={peopleConected} />}
        </div>
      </div>
    </div>
  );
};

export default RoomChat;
