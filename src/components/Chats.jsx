import ScroollToBottom from "react-scroll-to-bottom";

const Chats = ({ chats }) => {
  // console.log(chats);
  return (
    <>
      {chats && (
        <ScroollToBottom className={"msj"}>
          {chats.map((chat) => (
            <div className={chat.flag ? "chatSideEnd" : ""} key={chat.id}>
              <div className={chat.flag ? "chatss" : "chatss2"} key={chat.id}>
                <h1 className="userName">{chat.user}</h1>
                <h1 className="userMessage">{chat.message}</h1>
                <h1 className="userTime">{chat.time}</h1>
              </div>
            </div>
          ))}
        </ScroollToBottom>
      )}
    </>
  );
};

export default Chats;
