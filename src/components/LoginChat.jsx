import { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginChat = () => {
  const [txtNombre, setTxtNombre] = useState("");
  const history = useHistory();

  const handleNombre = () => {
    // console.log("yay");
    if (txtNombre == "") {
      return console.log("no puede estar vacio el nombre");
      // alert("no puede estar vacio el nombre");
    }
    // console.log(txtNombre);

    history.push({
      pathname: "/roomChat",
      state: txtNombre,
    });
  };
  return (
    <div className="divLoginChatConatiner">
      <div className="divLogin">
        <h1 className="loginTitle">Login Chat</h1>
        <div className="divFormNombreLogins">
          <label className="lblNombre" htmlFor="">
            Nombre
          </label>
          <input
            className="txtNombre"
            type="text"
            required
            value={txtNombre}
            onChange={(e) => setTxtNombre(e.target.value)}
          />
        </div>
        <button className="bntLoginChat" onClick={handleNombre}>
          ENTRAR
        </button>
      </div>
    </div>
  );
};

export default LoginChat;
